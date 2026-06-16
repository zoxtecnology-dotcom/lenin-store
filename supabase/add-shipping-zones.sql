-- ═══════════════════════════════════════════════════════════════
-- TARIFAS DE ENVÍO POR ZONA (Colombia)
-- Ejecutar en Supabase → SQL Editor
-- ═══════════════════════════════════════════════════════════════
-- Z1 (principales): Antioquia, Bogotá, Cundinamarca, Valle, Atlántico,
--                   Santander, Risaralda, Caldas, Quindío
-- Z3 (remotas):     Amazonas, Guainía, Guaviare, Vaupés, Vichada, Chocó,
--                   San Andrés, Putumayo, La Guajira
-- Z2 (resto del país): todos los demás
-- El envío es GRATIS cuando el subtotal supera free_shipping_threshold.

INSERT INTO site_settings (key, value, label) VALUES
  ('shipping_zona1', '12000', 'Envío Zona 1 — Principales (COP)'),
  ('shipping_zona2', '18000', 'Envío Zona 2 — Resto del país (COP)'),
  ('shipping_zona3', '30000', 'Envío Zona 3 — Remotas (COP)')
ON CONFLICT (key) DO NOTHING;
