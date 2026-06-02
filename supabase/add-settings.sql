-- ═══════════════════════════════════════════════════════════════
-- NUEVOS SETTINGS Y TABLAS — Ejecutar en Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ═══════════════════════════════════════════════════════════════
-- 1. TABLA COLORS (para admin/colores)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS colors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  swatch TEXT NOT NULL DEFAULT '#1a1a1a',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE colors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "colors_public_read" ON colors;
CREATE POLICY "colors_public_read" ON colors FOR SELECT USING (true);

DROP POLICY IF EXISTS "colors_admin_all" ON colors;
CREATE POLICY "colors_admin_all" ON colors FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- Colores iniciales
INSERT INTO colors (name, swatch) VALUES
  ('Negro', '#1a1a1a'),
  ('Blanco', '#f5f5f5'),
  ('Gris', '#6b7280'),
  ('Crema', '#f5f0e6'),
  ('Azul Marino', '#1e3a5f'),
  ('Verde Olivo', '#556b2f'),
  ('Marrón', '#8b4513'),
  ('Beige', '#d4b896')
ON CONFLICT DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 2. TABLA PROFILES (para auth y admin/clientes)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_own_read" ON profiles;
CREATE POLICY "profiles_own_read" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_admin_read" ON profiles;
CREATE POLICY "profiles_admin_read" ON profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

DROP POLICY IF EXISTS "profiles_own_update" ON profiles;
CREATE POLICY "profiles_own_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger para crear perfil automáticamente al registrar usuario
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- ═══════════════════════════════════════════════════════════════
-- 3. TABLA ORDERS (para admin/clientes estadísticas)
-- ═══════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending',
  total INTEGER DEFAULT 0,
  items JSONB DEFAULT '[]',
  shipping_address JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "orders_own_read" ON orders;
CREATE POLICY "orders_own_read" ON orders FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "orders_admin_all" ON orders;
CREATE POLICY "orders_admin_all" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);

-- ═══════════════════════════════════════════════════════════════
-- 4. LIMPIAR SETTINGS OBSOLETOS
-- ═══════════════════════════════════════════════════════════════
DELETE FROM site_settings WHERE key IN (
  'store_open', 
  'announcement_active', 
  'cloudinary_cloud_name',
  'instagram',
  'dispatch_days',
  'dias_despacho',
  'site_title',
  'site_description'
);

-- Contacto y redes sociales
INSERT INTO site_settings (key, value, label) VALUES
  ('whatsapp_number', '3146309301', 'WhatsApp (10 dígitos)')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, label) VALUES
  ('instagram_url', 'https://instagram.com/aiahn.co', 'Instagram URL')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, label) VALUES
  ('email_contacto', 'hola@aiahn.co', 'Email de contacto')
ON CONFLICT (key) DO NOTHING;

-- Envíos
INSERT INTO site_settings (key, value, label) VALUES
  ('shipping_cost', '15000', 'Costo de envío base (COP)')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, label) VALUES
  ('shipping_time', '3-5 días hábiles', 'Tiempo estimado de envío')
ON CONFLICT (key) DO NOTHING;

-- Contraentrega
INSERT INTO site_settings (key, value, label) VALUES
  ('cod_enabled', 'true', 'Contraentrega habilitada')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, label) VALUES
  ('cod_cities', 'Medellín|Envigado|Sabaneta|Itagüí|Bello', 'Ciudades con contraentrega (separadas por |)')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, label) VALUES
  ('cod_extra_fee', '5000', 'Recargo por contraentrega (COP)')
ON CONFLICT (key) DO NOTHING;

-- Información de la tienda
INSERT INTO site_settings (key, value, label) VALUES
  ('store_address', 'Medellín, Colombia', 'Dirección de la tienda')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, label) VALUES
  ('store_hours', 'Lun-Vie 9am-6pm', 'Horario de atención')
ON CONFLICT (key) DO NOTHING;

-- Política de devoluciones
INSERT INTO site_settings (key, value, label) VALUES
  ('returns_days', '30', 'Días para devoluciones')
ON CONFLICT (key) DO NOTHING;

-- Redes sociales adicionales
INSERT INTO site_settings (key, value, label) VALUES
  ('tiktok_url', '', 'TikTok URL')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, label) VALUES
  ('facebook_url', '', 'Facebook URL')
ON CONFLICT (key) DO NOTHING;

INSERT INTO site_settings (key, value, label) VALUES
  ('youtube_url', '', 'YouTube URL')
ON CONFLICT (key) DO NOTHING;

-- Mínimos
INSERT INTO site_settings (key, value, label) VALUES
  ('min_order_amount', '50000', 'Pedido mínimo (COP)')
ON CONFLICT (key) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════
-- 5. VERIFICACIÓN
-- ═══════════════════════════════════════════════════════════════

-- Ver settings
SELECT '📋 SITE_SETTINGS' AS tabla, COUNT(*) AS registros FROM site_settings
UNION ALL
SELECT '🎨 COLORS', COUNT(*) FROM colors
UNION ALL
SELECT '👤 PROFILES', COUNT(*) FROM profiles
UNION ALL
SELECT '📦 ORDERS', COUNT(*) FROM orders;
