import catHombre from "@/assets/cat-hombre.jpg";
import catAcc from "@/assets/cat-acc.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import look2 from "@/assets/look2.jpg";
import hero from "@/assets/hero.jpg";

export interface Collection {
  handle: string;
  name: string;
  subtitle: string;
  image: string;
  /** empty string = show all new-arrival products */
  category: string;
  isNewArrivals?: boolean;
  isBestSellers?: boolean;
  isHotSale?: boolean;
  isAll?: boolean;
}

export const collections: Collection[] = [
  {
    handle: "hombre",
    name: "Hombre",
    subtitle: "Toda la colección masculina. Un solo lugar.",
    image: catHombre,
    category: "",
    isAll: true,
  },
  {
    handle: "nuevo",
    name: "Nuevo",
    subtitle: "Lo que acaba de llegar. Primero en saberlo.",
    image: hero,
    category: "",
    isNewArrivals: true,
  },
  {
    handle: "mas-vendidos",
    name: "Más Vendidos",
    subtitle: "Los que todo el mundo elige. Por algo será.",
    image: catHombre,
    category: "",
    isBestSellers: true,
  },
  {
    handle: "hot-sale",
    name: "Hot Sale",
    subtitle: "Tiempo limitado. Precios que no vuelven.",
    image: catAcc,
    category: "",
    isHotSale: true,
  },
  {
    handle: "camisetas",
    name: "Camisetas",
    subtitle: "El básico que no existe en otro lugar.",
    image: p3,
    category: "Camisetas",
  },
  {
    handle: "busos",
    name: "Chaqueta / Busos",
    subtitle: "Peso, estructura y actitud en cada costura.",
    image: p1,
    category: "Busos",
  },
  {
    handle: "conjuntos",
    name: "Conjuntos",
    subtitle: "Top y bottom. Una sola historia.",
    image: look2,
    category: "Conjuntos",
  },
  {
    handle: "pantalonetas",
    name: "Pantalonetas",
    subtitle: "Para la calle. Para el calor. Para siempre.",
    image: p4,
    category: "Pantalonetas",
  },
  {
    handle: "pantalones",
    name: "Pantalones",
    subtitle: "Corte colombiano. Caída perfecta.",
    image: p2,
    category: "Pantalones",
  },
  {
    handle: "gorras",
    name: "Gorras",
    subtitle: "Cabezas con identidad. Edición limitada.",
    image: catAcc,
    category: "Gorras",
  },
];

export const megaCategories = [
  { handle: "camisetas", name: "Camisetas", image: p3 },
  { handle: "busos", name: "Chaqueta / Busos", image: p1 },
  { handle: "conjuntos", name: "Conjuntos", image: look2 },
  { handle: "pantalonetas", name: "Pantalonetas", image: p4 },
  { handle: "pantalones", name: "Pantalones", image: p2 },
  { handle: "gorras", name: "Gorras", image: catAcc },
];

export function getCollection(handle: string) {
  return collections.find((c) => c.handle === handle) ?? null;
}
