-- ═══════════════════════════════════════════════════════════════
-- SIZE GUIDES — Sistema de guías de tallas configurables (simplificado)
-- ═══════════════════════════════════════════════════════════════

-- Una sola tabla con JSONB para las medidas
create table if not exists size_measurements (
  id uuid primary key default gen_random_uuid(),
  guide_type text not null,            -- 'torso', 'pantalon', 'pantaloneta'
  guide_label text not null,           -- 'Torso', 'Pantalones', 'Pantalonetas'
  size text not null,                  -- 'S', 'M', 'L', etc.
  measurements jsonb not null,         -- {"pecho": "96-100", "hombros": "43", ...}
  how_to_measure jsonb,                -- {"pecho": "Mide alrededor...", ...}
  fit_note text,                       -- Nota de fit (solo en la primera fila de cada tipo)
  position int default 0,
  unique(guide_type, size)
);

-- ═══════════════════════════════════════════════════════════════
-- SEED DATA — Datos iniciales
-- ═══════════════════════════════════════════════════════════════

-- TORSO (camisetas, busos, hoodies)
insert into size_measurements (guide_type, guide_label, size, measurements, how_to_measure, fit_note, position) values
  ('torso', 'Torso', 'S', 
   '{"pecho": "96–100", "hombros": "43", "largo": "70", "manga": "20"}',
   '{"pecho": "Mide alrededor de la parte más ancha del pecho, pasando por las axilas.", "hombros": "Mide de extremo a extremo por la espalda, de una costura de hombro a la otra.", "largo": "Desde la costura del hombro hasta el dobladillo inferior.", "manga": "Desde la costura del hombro hasta el final de la manga."}',
   'La talla M de AIAHN equivale a un L / L-XL en corte regular. Si prefieres un fit ceñido, baja una talla.', 0),
  ('torso', 'Torso', 'M', '{"pecho": "100–104", "hombros": "45", "largo": "72", "manga": "20.8"}', null, null, 1),
  ('torso', 'Torso', 'L', '{"pecho": "104–110", "hombros": "47", "largo": "74", "manga": "21.6"}', null, null, 2),
  ('torso', 'Torso', 'XL', '{"pecho": "110–116", "hombros": "49", "largo": "76", "manga": "22.4"}', null, null, 3),
  ('torso', 'Torso', 'XXL', '{"pecho": "116–122", "hombros": "51", "largo": "78", "manga": "23.2"}', null, null, 4);

-- PANTALONES
insert into size_measurements (guide_type, guide_label, size, measurements, how_to_measure, fit_note, position) values
  ('pantalon', 'Pantalones', 'S',
   '{"cintura": "72–76", "cadera": "92–96", "tiro": "28", "largo": "100"}',
   '{"cintura": "Mide alrededor de la parte donde normalmente usas el pantalón, sin apretar.", "cadera": "Mide alrededor de la parte más ancha de las caderas y los glúteos.", "tiro": "Desde la entrepierna hasta la cintura, por el frente.", "largo": "Desde la cintura hasta el bajo de la pierna."}',
   'Corte relajado. Si prefieres fit slim, baja una talla.', 0),
  ('pantalon', 'Pantalones', 'M', '{"cintura": "76–82", "cadera": "96–102", "tiro": "29", "largo": "102"}', null, null, 1),
  ('pantalon', 'Pantalones', 'L', '{"cintura": "82–88", "cadera": "102–108", "tiro": "30", "largo": "104"}', null, null, 2),
  ('pantalon', 'Pantalones', 'XL', '{"cintura": "88–94", "cadera": "108–114", "tiro": "31", "largo": "106"}', null, null, 3),
  ('pantalon', 'Pantalones', 'XXL', '{"cintura": "94–100", "cadera": "114–120", "tiro": "32", "largo": "108"}', null, null, 4);

-- PANTALONETAS
insert into size_measurements (guide_type, guide_label, size, measurements, how_to_measure, fit_note, position) values
  ('pantaloneta', 'Pantalonetas', 'S',
   '{"cintura": "72–76", "cadera": "92–96", "tiro": "28", "largo": "42"}',
   '{"cintura": "Mide alrededor de la parte donde normalmente usas el pantalón, sin apretar.", "cadera": "Mide alrededor de la parte más ancha de las caderas y los glúteos.", "tiro": "Desde la entrepierna hasta la cintura, por el frente.", "largo": "Desde la cintura hasta el bajo de la pierna."}',
   'Largo por encima de la rodilla. Corte relajado.', 0),
  ('pantaloneta', 'Pantalonetas', 'M', '{"cintura": "76–82", "cadera": "96–102", "tiro": "29", "largo": "44"}', null, null, 1),
  ('pantaloneta', 'Pantalonetas', 'L', '{"cintura": "82–88", "cadera": "102–108", "tiro": "30", "largo": "46"}', null, null, 2),
  ('pantaloneta', 'Pantalonetas', 'XL', '{"cintura": "88–94", "cadera": "108–114", "tiro": "31", "largo": "48"}', null, null, 3),
  ('pantaloneta', 'Pantalonetas', 'XXL', '{"cintura": "94–100", "cadera": "114–120", "tiro": "32", "largo": "50"}', null, null, 4);

-- RLS Policy (lectura pública)
alter table size_measurements enable row level security;
create policy "Public read size_measurements" on size_measurements for select using (true);
create policy "Auth write size_measurements" on size_measurements for all using (auth.role() = 'authenticated');
