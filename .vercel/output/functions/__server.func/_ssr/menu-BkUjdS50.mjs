import { a9 as useRouter } from "./index.mjs";
import { y as createLucideIcon } from "./router-BWVHQLZp.mjs";
function useRouterState(opts) {
  const contextRouter = useRouter();
  const router = contextRouter;
  {
    const state = router.stores.__store.get();
    return state;
  }
}
const __iconNode = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode);
export {
  Menu as M,
  useRouterState as u
};
