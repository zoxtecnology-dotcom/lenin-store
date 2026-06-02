import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import look1 from "@/assets/look1.jpg";
import look2 from "@/assets/look2.jpg";
import look3 from "@/assets/look3.jpg";

export interface ProductColor {
  name: string;
  swatch: string;
}

export interface ConjuntoData {
  topName: string;
  bottomName: string;
  topPrice: number;
  bottomPrice: number;
  topPieceType: string;
  bottomPieceType: string;
  topImages: string[];
  bottomImages: string[];
  fullImages: string[];
}

export interface ProductVariant {
  color_name: string;
  size: string;
  piece: string | null;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;       // precio original (tachado), si hay descuento
  front: string;
  back: string;
  images: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isOnSale?: boolean;            // calculado: compareAtPrice > price
  drop: string;
  category: string;
  shortDescription: string;
  description: string;
  details: string;
  colors: ProductColor[];
  sizes: string[];               // todas las tallas del producto
  variants: ProductVariant[];    // stock por color+talla (para deshabilitar agotados)
  stock?: number;                // stock total (suma de variantes)
  type?: "standard" | "conjunto";
  conjunto?: ConjuntoData;
}

export const products: Product[] = [
  {
    slug: "camiseta-box-distressed",
    name: "Camiseta / Box Distressed",
    price: 120000,
    front: p3,
    back: p4,
    images: [p3, p4, p1, p2],
    drop: "Drop 01 — Essentials",
    category: "Camisetas",
    isNew: true,
    isBestSeller: true,
    isOnSale: true,
    tag: "-30%",
    shortDescription: "Box-fit en algodón pesado 280gsm con desgaste manual. Caída recta y mangas anchas.",
    description: "Tejido grueso con tratamiento sand-wash y desgaste en bajos. Una pieza con memoria propia desde el primer uso.",
    details: "100% algodón peinado\nPeso: 280 gsm\nCorte: Box fit\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Hueso Lavado", swatch: "#e8e0d0" },
      { name: "Negro Carbón", swatch: "#1a1a1a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 3,
  },
  {
    slug: "camiseta-essentials",
    name: "Camiseta / Essentials",
    price: 95000,
    front: p4,
    back: p3,
    images: [p4, p3, p2, p1],
    drop: "Drop 01 — Essentials",
    category: "Camisetas",
    shortDescription: "Básico oversize en algodón 220gsm. Logo bordado en pecho. El punto de partida.",
    description: "La camiseta que necesitabas sin saber que la necesitabas. Algodón pesado, corte amplio, durabilidad real.",
    details: "100% algodón ring-spun\nPeso: 220 gsm\nCorte: Oversize\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro Carbón", swatch: "#1a1a1a" },
      { name: "Grafito", swatch: "#3a3a3a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "buso-oversize-negro",
    name: "Hoodie Oversize / Negro",
    price: 189000,
    front: p1,
    back: p2,
    images: [p1, p2, p3, p4],
    drop: "Drop 01 — Essentials",
    category: "Busos",
    isNew: true,
    isBestSeller: true,
    shortDescription: "Box-fit en algodón pesado 380gsm con acabado brushed interior. Capucha estructurada.",
    description: "Tejido grueso con tratamiento sand-wash y desgaste en costuras. Corte oversize real, no aspiracional.",
    details: "80% algodón / 20% poliéster\nPeso: 380 gsm\nCorte: Oversize\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro Carbón", swatch: "#1a1a1a" },
      { name: "Hueso Lavado", swatch: "#e8e0d0" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "buso-acid",
    name: "Hoodie / Acid Drop",
    price: 199000,
    front: p2,
    back: p1,
    images: [p2, p1, p4, p3],
    drop: "Drop 01 — Essentials",
    category: "Busos",
    shortDescription: "Hoodie en algodón 360gsm con detalle acid-wash en mangas. Pieza de edición limitada.",
    description: "Mismo cuerpo que el hoodie negro, diferente tratamiento. El acid-wash es irrepetible — cada pieza es única.",
    details: "80% algodón / 20% poliéster\nPeso: 360 gsm\nCorte: Oversize\nLavado a máquina fría\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Acid Black", swatch: "#2a2a2a" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 2,
  },
  {
    slug: "conjunto-angoscia",
    name: "Conjunto / Angoscia",
    price: 280000,
    front: look1,
    back: look2,
    images: [look1, look2, look3, p1],
    drop: "Drop 01 — Essentials",
    category: "Conjuntos",
    isNew: true,
    shortDescription: "Buso + pantalón en french terry 320gsm. El look completo. Mejor precio al comprar el conjunto.",
    description: "Dos piezas pensadas para usarse juntas. El french terry da cuerpo sin perder comodidad. Cómpralo completo y ahorra.",
    details: "80% algodón / 20% poliéster\nPeso: 320 gsm\nCorte: Relaxed\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro Carbón", swatch: "#1a1a1a" },
      { name: "Grafito Oscuro", swatch: "#2e2e2e" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 4,
    type: "conjunto",
    conjunto: {
      topName: "Buso Angoscia",
      bottomName: "Pantalón Angoscia",
      topPrice: 160000,
      bottomPrice: 140000,
      topImages: [p1, p2],
      bottomImages: [p2, p3],
      fullImages: [look1, look2, look3],
    },
  },
  {
    slug: "pantaloneta-cargo",
    name: "Pantaloneta / Cargo",
    price: 115000,
    front: p4,
    back: p3,
    images: [p4, p3, p2, p1],
    drop: "Drop 01 — Essentials",
    category: "Pantalonetas",
    shortDescription: "Pantaloneta cargo en ripstop 200gsm. Bolsillos funcionales, cintura elástica con cordón.",
    description: "Hecha para la calle, aguanta el uso diario. Ripstop ligero, bolsillos cargo laterales y elástico ajustable.",
    details: "100% poliéster ripstop\nPeso: 200 gsm\nCorte: Baggy cargo\nLavado a máquina 40°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro", swatch: "#0a0a0a" },
      { name: "Olive", swatch: "#4a4a30" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "pantalon-wide",
    name: "Pantalón / Wide Leg",
    price: 145000,
    front: p2,
    back: p1,
    images: [p2, p1, p4, p3],
    drop: "Drop 01 — Essentials",
    category: "Pantalones",
    shortDescription: "Wide leg en gabardina 260gsm. Caída perfecta, bolsillos profundos, bajo sin dobladillo.",
    description: "El pantalón que funciona con todo. Corte ancho real, tela con cuerpo, bajo crudo sin dobladillo.",
    details: "65% poliéster / 35% viscosa\nPeso: 260 gsm\nCorte: Wide leg\nLavado a máquina 30°C\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro", swatch: "#0a0a0a" },
      { name: "Charcoal", swatch: "#363636" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  },
  {
    slug: "gorra-snapback",
    name: "Gorra / Snapback AIAHN",
    price: 75000,
    front: p4,
    back: p3,
    images: [p4, p3, p1, p2],
    drop: "Drop 01 — Essentials",
    category: "Gorras",
    isBestSeller: true,
    shortDescription: "Snapback 6 paneles en twill 100% algodón. Logo bordado en relieve. Talla única.",
    description: "Seis paneles, frente estructurado, cierre snapback ajustable. Logo AIAHN bordado en 3D.",
    details: "100% algodón twill\nEstructura: 6 paneles\nCierre: Snapback\nLavado a mano\nFabricado en Medellín, Colombia",
    colors: [
      { name: "Negro", swatch: "#0a0a0a" },
      { name: "Hueso", swatch: "#e8e0d0" },
    ],
    sizes: ["Única"],
  },
];

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}

export function fmtCOP(amount: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(amount);
}
