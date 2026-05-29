import { products } from "@/lib/products";

export interface PackItem {
  product: (typeof products)[number];
}

export interface Pack {
  id: string;
  name: string;
  tag: string;
  discount: number;
  items: PackItem[];
  description: string;
}

const find = (slug: string) => products.find((p) => p.slug === slug)!;

export const PACKS: Pack[] = [
  {
    id: "esencial",
    name: "Pack Esencial",
    tag: "Más popular",
    discount: 10,
    items: [{ product: find("camiseta-essentials") }, { product: find("gorra-snapback") }],
    description: "El punto de partida. Camiseta oversize + gorra snapback. El look base de AIAHN.",
  },
  {
    id: "callejero",
    name: "Pack Callejero",
    tag: "Ahorro real",
    discount: 12,
    items: [{ product: find("buso-oversize-negro") }, { product: find("pantaloneta-cargo") }],
    description: "Hoodie oversize + pantaloneta cargo. Hecho para la calle, aguanta el día completo.",
  },
  {
    id: "completo",
    name: "Pack Completo",
    tag: "Mejor precio",
    discount: 15,
    items: [{ product: find("buso-oversize-negro") }, { product: find("pantalon-wide") }, { product: find("gorra-snapback") }],
    description: "El outfit completo. Hoodie + pantalón wide leg + gorra. Tres piezas, un solo look.",
  },
  {
    id: "distressed",
    name: "Pack Distressed",
    tag: "Edición limitada",
    discount: 10,
    items: [{ product: find("camiseta-box-distressed") }, { product: find("buso-acid") }],
    description: "Las dos piezas con tratamiento especial. Box distressed + hoodie acid drop. No se repiten.",
  },
];

export function getPackById(id: string) {
  return PACKS.find((p) => p.id === id);
}
