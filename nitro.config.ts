export default {
  preset: "vercel",
  // Incluir tslib en el bundle para evitar ERR_MODULE_NOT_FOUND en Vercel
  externals: [],
  noExternals: ["tslib", "react-remove-scroll"],
};
