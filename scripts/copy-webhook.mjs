// scripts/copy-webhook.mjs
// Copia la función del webhook a .vercel/output/functions

import { mkdir, writeFile, cp } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function main() {
  const funcDir = join(root, '.vercel', 'output', 'functions', 'api', 'mp', 'webhook.func');
  
  // Crear directorio
  await mkdir(funcDir, { recursive: true });
  
  // Crear .vc-config.json
  await writeFile(
    join(funcDir, '.vc-config.json'),
    JSON.stringify({
      runtime: 'nodejs20.x',
      handler: 'index.mjs',
      launcherType: 'Nodejs'
    }, null, 2)
  );
  
  // Crear el handler
  const handlerCode = `
import { createClient } from '@supabase/supabase-js';
import { createHmac } from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const xSignature = req.headers['x-signature'];
  const xRequestId = req.headers['x-request-id'];
  const body = req.body;
  
  console.log('Webhook recibido:', JSON.stringify(body));

  // Verificar firma
  const webhookSecret = process.env.MP_WEBHOOK_SECRET;
  if (webhookSecret && xSignature && xRequestId) {
    const parts = xSignature.split(',');
    let ts = '', hash = '';
    for (const part of parts) {
      const [key, value] = part.split('=');
      if (key === 'ts') ts = value;
      if (key === 'v1') hash = value;
    }
    const dataId = body?.data?.id;
    const manifest = \`id:\${dataId};request-id:\${xRequestId};ts:\${ts};\`;
    const computedHash = createHmac('sha256', webhookSecret).update(manifest).digest('hex');
    if (computedHash !== hash) {
      console.error('Firma inválida');
      return res.status(401).json({ error: 'Invalid signature' });
    }
    console.log('✅ Firma verificada');
  }

  if (body?.type !== 'payment' || !body?.data?.id) {
    return res.status(200).json({ received: true, processed: false });
  }

  const mpAccessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!mpAccessToken) {
    return res.status(500).json({ error: 'Config error' });
  }

  try {
    const mpRes = await fetch(\`https://api.mercadopago.com/v1/payments/\${body.data.id}\`, {
      headers: { Authorization: \`Bearer \${mpAccessToken}\` }
    });
    
    if (!mpRes.ok) {
      return res.status(200).json({ error: 'MP API error' });
    }
    
    const paymentInfo = await mpRes.json();
    
    if (!paymentInfo.external_reference) {
      return res.status(200).json({ received: true, processed: false });
    }
    
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );
    
    const statusMap = {
      approved: 'paid',
      pending: 'pending',
      in_process: 'pending',
      rejected: 'failed',
      cancelled: 'cancelled',
      refunded: 'refunded'
    };
    
    const orderStatus = statusMap[paymentInfo.status] || 'pending';
    
    await supabase
      .from('orders')
      .update({
        status: orderStatus,
        payment_ref: String(paymentInfo.id),
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentInfo.external_reference);
    
    console.log(\`✅ Orden \${paymentInfo.external_reference} → \${orderStatus}\`);
    return res.status(200).json({ received: true, processed: true, status: orderStatus });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(200).json({ error: 'Processing error' });
  }
}
`;

  await writeFile(join(funcDir, 'index.mjs'), handlerCode);
  
  // Copiar node_modules necesarios
  const nodeModulesDir = join(funcDir, 'node_modules');
  await mkdir(nodeModulesDir, { recursive: true });
  
  // Copiar @supabase/supabase-js
  const supabaseSrc = join(root, 'node_modules', '@supabase');
  if (existsSync(supabaseSrc)) {
    await cp(supabaseSrc, join(nodeModulesDir, '@supabase'), { recursive: true });
  }
  
  // Actualizar config.json para agregar la ruta
  const configPath = join(root, '.vercel', 'output', 'config.json');
  const config = JSON.parse(await import('fs').then(fs => fs.promises.readFile(configPath, 'utf-8')));
  
  // Agregar ruta para el webhook antes del catch-all
  const webhookRoute = { src: '/api/mp/webhook', dest: '/api/mp/webhook' };
  const filesystemIdx = config.routes.findIndex(r => r.handle === 'filesystem');
  if (filesystemIdx !== -1 && !config.routes.some(r => r.src === '/api/mp/webhook')) {
    config.routes.splice(filesystemIdx, 0, webhookRoute);
  }
  
  await writeFile(configPath, JSON.stringify(config, null, 2));
  
  console.log('✅ Webhook function created at .vercel/output/functions/api/mp/webhook.func');
}

main().catch(console.error);
