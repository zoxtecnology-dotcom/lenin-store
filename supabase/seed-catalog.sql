-- ═══════════════════════════════════════════════════════════════
-- SEED CATÁLOGO — AIAHN Store
-- Migra todo lo que estaba quemado en products.ts, packs.ts,
-- collections.ts y drops a la base de datos.
-- Imágenes ya subidas a Cloudinary bajo aiahn/seed/*
-- ═══════════════════════════════════════════════════════════════

-- Limpiar catálogo previo (por si se corre de nuevo)
delete from pack_items;
delete from packs;
delete from product_variants;
delete from product_colors;
delete from product_images;
delete from products;
delete from drop_images;
delete from drops;

-- ─── DROP 01 ───────────────────────────────────────────────────
insert into drops (id, slug, name, label, season, release_date, editorial_quote, editorial_body, published, position) values
  ('d0000000-0000-0000-0000-000000000001', '01', 'Drop 01', 'Essentials', 'SS26', '2026-01-01',
   'El primer capítulo. Básicos que no lo son.',
   'Drop 01 nace de una pregunta simple: ¿qué ponerse cuando nada te convence? Ocho piezas pensadas para durar más que la temporada. Algodón pesado, cortes amplios, desgaste manual. Hecho en Medellín con la misma atención que le pondrías a algo para tu hijo.',
   true, 0);

insert into drop_images (drop_id, cloudinary_id, position) values
  ('d0000000-0000-0000-0000-000000000001', 'aiahn/seed/look2', 0),
  ('d0000000-0000-0000-0000-000000000001', 'aiahn/seed/look1', 1),
  ('d0000000-0000-0000-0000-000000000001', 'aiahn/seed/look3', 2);

-- ─── PRODUCTOS ─────────────────────────────────────────────────
insert into products (id, slug, name, price, tag, is_new, is_best_seller, is_on_sale, drop_id, category, short_desc, description, details, type, top_name, bottom_name, top_price, bottom_price, published, position) values
  ('a0000000-0000-0000-0000-000000000001', 'camiseta-box-distressed', 'Camiseta / Box Distressed', 120000, '-30%', true, true, true,
   'd0000000-0000-0000-0000-000000000001', 'Camisetas',
   'Box-fit en algodón pesado 280gsm con desgaste manual. Caída recta y mangas anchas.',
   'Tejido grueso con tratamiento sand-wash y desgaste en bajos. Una pieza con memoria propia desde el primer uso.',
   E'100% algodón peinado\nPeso: 280 gsm\nCorte: Box fit\nLavado a máquina 30°C\nFabricado en Medellín, Colombia',
   'standard', null, null, null, null, true, 0),

  ('a0000000-0000-0000-0000-000000000002', 'camiseta-essentials', 'Camiseta / Essentials', 95000, null, false, false, false,
   'd0000000-0000-0000-0000-000000000001', 'Camisetas',
   'Básico oversize en algodón 220gsm. Logo bordado en pecho. El punto de partida.',
   'La camiseta que necesitabas sin saber que la necesitabas. Algodón pesado, corte amplio, durabilidad real.',
   E'100% algodón ring-spun\nPeso: 220 gsm\nCorte: Oversize\nLavado a máquina 30°C\nFabricado en Medellín, Colombia',
   'standard', null, null, null, null, true, 1),

  ('a0000000-0000-0000-0000-000000000003', 'buso-oversize-negro', 'Hoodie Oversize / Negro', 189000, null, true, true, false,
   'd0000000-0000-0000-0000-000000000001', 'Busos',
   'Box-fit en algodón pesado 380gsm con acabado brushed interior. Capucha estructurada.',
   'Tejido grueso con tratamiento sand-wash y desgaste en costuras. Corte oversize real, no aspiracional.',
   E'80% algodón / 20% poliéster\nPeso: 380 gsm\nCorte: Oversize\nLavado a máquina 30°C\nFabricado en Medellín, Colombia',
   'standard', null, null, null, null, true, 2),

  ('a0000000-0000-0000-0000-000000000004', 'buso-acid', 'Hoodie / Acid Drop', 199000, null, false, false, false,
   'd0000000-0000-0000-0000-000000000001', 'Busos',
   'Hoodie en algodón 360gsm con detalle acid-wash en mangas. Pieza de edición limitada.',
   'Mismo cuerpo que el hoodie negro, diferente tratamiento. El acid-wash es irrepetible — cada pieza es única.',
   E'80% algodón / 20% poliéster\nPeso: 360 gsm\nCorte: Oversize\nLavado a máquina fría\nFabricado en Medellín, Colombia',
   'standard', null, null, null, null, true, 3),

  ('a0000000-0000-0000-0000-000000000005', 'conjunto-angoscia', 'Conjunto / Angoscia', 280000, null, true, false, false,
   'd0000000-0000-0000-0000-000000000001', 'Conjuntos',
   'Buso + pantalón en french terry 320gsm. El look completo. Mejor precio al comprar el conjunto.',
   'Dos piezas pensadas para usarse juntas. El french terry da cuerpo sin perder comodidad. Cómpralo completo y ahorra.',
   E'80% algodón / 20% poliéster\nPeso: 320 gsm\nCorte: Relaxed\nLavado a máquina 30°C\nFabricado en Medellín, Colombia',
   'conjunto', 'Buso Angoscia', 'Pantalón Angoscia', 160000, 140000, true, 4),

  ('a0000000-0000-0000-0000-000000000006', 'pantaloneta-cargo', 'Pantaloneta / Cargo', 115000, null, false, false, false,
   'd0000000-0000-0000-0000-000000000001', 'Pantalonetas',
   'Pantaloneta cargo en ripstop 200gsm. Bolsillos funcionales, cintura elástica con cordón.',
   'Hecha para la calle, aguanta el uso diario. Ripstop ligero, bolsillos cargo laterales y elástico ajustable.',
   E'100% poliéster ripstop\nPeso: 200 gsm\nCorte: Baggy cargo\nLavado a máquina 40°C\nFabricado en Medellín, Colombia',
   'standard', null, null, null, null, true, 5),

  ('a0000000-0000-0000-0000-000000000007', 'pantalon-wide', 'Pantalón / Wide Leg', 145000, null, false, false, false,
   'd0000000-0000-0000-0000-000000000001', 'Pantalones',
   'Wide leg en gabardina 260gsm. Caída perfecta, bolsillos profundos, bajo sin dobladillo.',
   'El pantalón que funciona con todo. Corte ancho real, tela con cuerpo, bajo crudo sin dobladillo.',
   E'65% poliéster / 35% viscosa\nPeso: 260 gsm\nCorte: Wide leg\nLavado a máquina 30°C\nFabricado en Medellín, Colombia',
   'standard', null, null, null, null, true, 6),

  ('a0000000-0000-0000-0000-000000000008', 'gorra-snapback', 'Gorra / Snapback AIAHN', 75000, null, false, true, false,
   'd0000000-0000-0000-0000-000000000001', 'Gorras',
   'Snapback 6 paneles en twill 100% algodón. Logo bordado en relieve. Talla única.',
   'Seis paneles, frente estructurado, cierre snapback ajustable. Logo AIAHN bordado en 3D.',
   E'100% algodón twill\nEstructura: 6 paneles\nCierre: Snapback\nLavado a mano\nFabricado en Medellín, Colombia',
   'standard', null, null, null, null, true, 7);

-- ─── IMÁGENES DE PRODUCTO ──────────────────────────────────────
-- role: front (pos 0), back (pos 1), gallery (resto)
insert into product_images (product_id, cloudinary_id, role, position) values
  -- Camiseta Box Distressed: [p3,p4,p1,p2]
  ('a0000000-0000-0000-0000-000000000001', 'aiahn/seed/p3', 'front', 0),
  ('a0000000-0000-0000-0000-000000000001', 'aiahn/seed/p4', 'back', 1),
  ('a0000000-0000-0000-0000-000000000001', 'aiahn/seed/p1', 'gallery', 2),
  ('a0000000-0000-0000-0000-000000000001', 'aiahn/seed/p2', 'gallery', 3),
  -- Camiseta Essentials: [p4,p3,p2,p1]
  ('a0000000-0000-0000-0000-000000000002', 'aiahn/seed/p4', 'front', 0),
  ('a0000000-0000-0000-0000-000000000002', 'aiahn/seed/p3', 'back', 1),
  ('a0000000-0000-0000-0000-000000000002', 'aiahn/seed/p2', 'gallery', 2),
  ('a0000000-0000-0000-0000-000000000002', 'aiahn/seed/p1', 'gallery', 3),
  -- Hoodie Oversize Negro: [p1,p2,p3,p4]
  ('a0000000-0000-0000-0000-000000000003', 'aiahn/seed/p1', 'front', 0),
  ('a0000000-0000-0000-0000-000000000003', 'aiahn/seed/p2', 'back', 1),
  ('a0000000-0000-0000-0000-000000000003', 'aiahn/seed/p3', 'gallery', 2),
  ('a0000000-0000-0000-0000-000000000003', 'aiahn/seed/p4', 'gallery', 3),
  -- Hoodie Acid: [p2,p1,p4,p3]
  ('a0000000-0000-0000-0000-000000000004', 'aiahn/seed/p2', 'front', 0),
  ('a0000000-0000-0000-0000-000000000004', 'aiahn/seed/p1', 'back', 1),
  ('a0000000-0000-0000-0000-000000000004', 'aiahn/seed/p4', 'gallery', 2),
  ('a0000000-0000-0000-0000-000000000004', 'aiahn/seed/p3', 'gallery', 3),
  -- Conjunto Angoscia: [look1,look2,look3,p1] + top/bottom/full
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/look1', 'front', 0),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/look2', 'back', 1),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/look3', 'gallery', 2),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/p1', 'gallery', 3),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/p1', 'top', 4),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/p2', 'top', 5),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/p2', 'bottom', 6),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/p3', 'bottom', 7),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/look1', 'full', 8),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/look2', 'full', 9),
  ('a0000000-0000-0000-0000-000000000005', 'aiahn/seed/look3', 'full', 10),
  -- Pantaloneta Cargo: [p4,p3,p2,p1]
  ('a0000000-0000-0000-0000-000000000006', 'aiahn/seed/p4', 'front', 0),
  ('a0000000-0000-0000-0000-000000000006', 'aiahn/seed/p3', 'back', 1),
  ('a0000000-0000-0000-0000-000000000006', 'aiahn/seed/p2', 'gallery', 2),
  ('a0000000-0000-0000-0000-000000000006', 'aiahn/seed/p1', 'gallery', 3),
  -- Pantalón Wide: [p2,p1,p4,p3]
  ('a0000000-0000-0000-0000-000000000007', 'aiahn/seed/p2', 'front', 0),
  ('a0000000-0000-0000-0000-000000000007', 'aiahn/seed/p1', 'back', 1),
  ('a0000000-0000-0000-0000-000000000007', 'aiahn/seed/p4', 'gallery', 2),
  ('a0000000-0000-0000-0000-000000000007', 'aiahn/seed/p3', 'gallery', 3),
  -- Gorra Snapback: [p4,p3,p1,p2]
  ('a0000000-0000-0000-0000-000000000008', 'aiahn/seed/p4', 'front', 0),
  ('a0000000-0000-0000-0000-000000000008', 'aiahn/seed/p3', 'back', 1),
  ('a0000000-0000-0000-0000-000000000008', 'aiahn/seed/p1', 'gallery', 2),
  ('a0000000-0000-0000-0000-000000000008', 'aiahn/seed/p2', 'gallery', 3);

-- ─── COLORES ───────────────────────────────────────────────────
insert into product_colors (product_id, name, swatch, position) values
  ('a0000000-0000-0000-0000-000000000001', 'Hueso Lavado', '#e8e0d0', 0),
  ('a0000000-0000-0000-0000-000000000001', 'Negro Carbón', '#1a1a1a', 1),
  ('a0000000-0000-0000-0000-000000000002', 'Negro Carbón', '#1a1a1a', 0),
  ('a0000000-0000-0000-0000-000000000002', 'Grafito', '#3a3a3a', 1),
  ('a0000000-0000-0000-0000-000000000003', 'Negro Carbón', '#1a1a1a', 0),
  ('a0000000-0000-0000-0000-000000000003', 'Hueso Lavado', '#e8e0d0', 1),
  ('a0000000-0000-0000-0000-000000000004', 'Acid Black', '#2a2a2a', 0),
  ('a0000000-0000-0000-0000-000000000005', 'Negro Carbón', '#1a1a1a', 0),
  ('a0000000-0000-0000-0000-000000000005', 'Grafito Oscuro', '#2e2e2e', 1),
  ('a0000000-0000-0000-0000-000000000006', 'Negro', '#0a0a0a', 0),
  ('a0000000-0000-0000-0000-000000000006', 'Olive', '#4a4a30', 1),
  ('a0000000-0000-0000-0000-000000000007', 'Negro', '#0a0a0a', 0),
  ('a0000000-0000-0000-0000-000000000007', 'Charcoal', '#363636', 1),
  ('a0000000-0000-0000-0000-000000000008', 'Negro', '#0a0a0a', 0),
  ('a0000000-0000-0000-0000-000000000008', 'Hueso', '#e8e0d0', 1);

-- ─── VARIANTES (stock por color + talla) ───────────────────────
-- Productos estándar talla XS–XXL (box, essentials, hoodie negro, cargo, wide)
insert into product_variants (product_id, color_name, size, piece, stock, sku, active)
select pc.product_id, pc.name, s.size, null, 8,
  upper(p.slug) || '-' || upper(left(pc.name, 3)) || '-' || s.size, true
from product_colors pc
join products p on p.id = pc.product_id
cross join (values ('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL')) as s(size)
where p.slug in ('camiseta-box-distressed', 'camiseta-essentials', 'buso-oversize-negro', 'pantaloneta-cargo', 'pantalon-wide');

-- Hoodie Acid: XS–XL (sin XXL), stock bajo (edición limitada)
insert into product_variants (product_id, color_name, size, piece, stock, sku, active)
select pc.product_id, pc.name, s.size, null, 2,
  'ACID-' || s.size, true
from product_colors pc
join products p on p.id = pc.product_id
cross join (values ('XS'), ('S'), ('M'), ('L'), ('XL')) as s(size)
where p.slug = 'buso-acid';

-- Gorra Snapback: talla única
insert into product_variants (product_id, color_name, size, piece, stock, sku, active)
select pc.product_id, pc.name, 'Única', null, 10,
  'GORRA-' || upper(left(pc.name, 3)), true
from product_colors pc
join products p on p.id = pc.product_id
where p.slug = 'gorra-snapback';

-- Conjunto Angoscia: XS–XXL × {top, bottom}
insert into product_variants (product_id, color_name, size, piece, stock, sku, active)
select pc.product_id, pc.name, s.size, pieces.piece, 4,
  'ANGOS-' || upper(left(pc.name, 3)) || '-' || s.size || '-' || upper(pieces.piece), true
from product_colors pc
join products p on p.id = pc.product_id
cross join (values ('XS'), ('S'), ('M'), ('L'), ('XL'), ('XXL')) as s(size)
cross join (values ('top'), ('bottom')) as pieces(piece)
where p.slug = 'conjunto-angoscia';

-- ─── COLECCIONES (actualizar imágenes — ya existen las filas) ──
update collections set cloudinary_id = 'aiahn/seed/cat-hombre', subtitle = 'Toda la colección masculina. Un solo lugar.' where handle = 'hombre';
update collections set cloudinary_id = 'aiahn/seed/hero',       subtitle = 'Lo que acaba de llegar. Primero en saberlo.'   where handle = 'nuevo';
update collections set cloudinary_id = 'aiahn/seed/cat-hombre', subtitle = 'Los que todo el mundo elige. Por algo será.'   where handle = 'mas-vendidos';
update collections set cloudinary_id = 'aiahn/seed/cat-acc',    subtitle = 'Tiempo limitado. Precios que no vuelven.'      where handle = 'hot-sale';
update collections set cloudinary_id = 'aiahn/seed/p3',         subtitle = 'El básico que no existe en otro lugar.'        where handle = 'camisetas';
update collections set cloudinary_id = 'aiahn/seed/p1',         subtitle = 'Peso, estructura y actitud en cada costura.'   where handle = 'busos';
update collections set cloudinary_id = 'aiahn/seed/look2',      subtitle = 'Top y bottom. Una sola historia.'             where handle = 'conjuntos';
update collections set cloudinary_id = 'aiahn/seed/p4',         subtitle = 'Para la calle. Para el calor. Para siempre.'   where handle = 'pantalonetas';
update collections set cloudinary_id = 'aiahn/seed/p2',         subtitle = 'Corte colombiano. Caída perfecta.'            where handle = 'pantalones';
update collections set cloudinary_id = 'aiahn/seed/cat-acc',    subtitle = 'Cabezas con identidad. Edición limitada.'      where handle = 'gorras';

-- ─── PACKS ─────────────────────────────────────────────────────
insert into packs (id, slug, name, tag, discount, description, published, position) values
  ('c0000000-0000-0000-0000-000000000001', 'esencial', 'Pack Esencial', 'Más popular', 10,
   'El punto de partida. Camiseta oversize + gorra snapback. El look base de AIAHN.', true, 0),
  ('c0000000-0000-0000-0000-000000000002', 'callejero', 'Pack Callejero', 'Ahorro real', 12,
   'Hoodie oversize + pantaloneta cargo. Hecho para la calle, aguanta el día completo.', true, 1),
  ('c0000000-0000-0000-0000-000000000003', 'completo', 'Pack Completo', 'Mejor precio', 15,
   'El outfit completo. Hoodie + pantalón wide leg + gorra. Tres piezas, un solo look.', true, 2),
  ('c0000000-0000-0000-0000-000000000004', 'distressed', 'Pack Distressed', 'Edición limitada', 10,
   'Las dos piezas con tratamiento especial. Box distressed + hoodie acid drop. No se repiten.', true, 3);

insert into pack_items (pack_id, product_id, position) values
  -- Esencial: camiseta-essentials + gorra-snapback
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000002', 0),
  ('c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000008', 1),
  -- Callejero: buso-oversize-negro + pantaloneta-cargo
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000003', 0),
  ('c0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000006', 1),
  -- Completo: buso-oversize-negro + pantalon-wide + gorra-snapback
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000003', 0),
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000007', 1),
  ('c0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000008', 2),
  -- Distressed: camiseta-box-distressed + buso-acid
  ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000001', 0),
  ('c0000000-0000-0000-0000-000000000004', 'a0000000-0000-0000-0000-000000000004', 1);

-- ─── Listo ─────────────────────────────────────────────────────
-- Verificar:
-- select count(*) from products;        -- 8
-- select count(*) from product_variants; -- ~80
-- select count(*) from packs;            -- 4
