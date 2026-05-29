export const BRAND = {
  name: "AIAHN",
  store: "AIAHN STORE",
  legal: "AIAHN Store S.A.S.",
  tagline: "Hecho por amor. Vestido con actitud. Medellín, Colombia.",
  domain: "aiahn.co",
  url: "https://aiahn.co",
  city: "Medellín",
  country: "Colombia",
  cityFull: "Medellín, Colombia",
  cityLegal: "Medellín, Antioquia",
  year: "2026",
  copyright: "© 2026 AIAHN Store S.A.S — Todos los derechos reservados",
  madeIn: "Made with love in Medellín",
  manufacture: "Fabricado en Medellín, Colombia",
} as const;

export const EMAIL = {
  general: "hola@aiahn.co",
  returns: "cambios@aiahn.co",
  data: "datos@aiahn.co",
  press: "prensa@aiahn.co",
  pqrs: "pqrs@aiahn.co",
  legal: "legal@aiahn.co",
} as const;

export const SOCIAL = {
  instagram: { handle: "@aiahn.co",  url: "https://instagram.com/aiahn.co" },
  tiktok:    { handle: "@aiahn.co",  url: "https://tiktok.com/@aiahn.co"   },
  youtube:   { handle: "@aiahn",     url: "https://youtube.com/@aiahn"      },
  whatsapp:  { display: "+57 314 630 9301", url: "https://wa.me/573146309301" },
} as const;

export const DROP = {
  current: "01",
  name: "Essentials",
  season: "SS26",
  label: "Drop 01 — AIAHN Essentials SS26",
  short: "Drop 01",
} as const;

export const pageTitle = (title: string) => `${title} — ${BRAND.store}`;
