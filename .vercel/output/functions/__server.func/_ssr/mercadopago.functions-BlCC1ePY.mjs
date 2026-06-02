import { y as createLucideIcon } from "./router-BWVHQLZp.mjs";
import { c as createSsrRpc } from "./createSsrRpc-OYTRBK8B.mjs";
import { l as createServerFn } from "./index.mjs";
import { o as objectType, s as stringType, a as arrayType, n as numberType } from "./types-D0vF8QzC.mjs";
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
const CartItemSchema = objectType({
  slug: stringType(),
  name: stringType(),
  price: numberType(),
  qty: numberType(),
  image: stringType().optional(),
  size: stringType().optional(),
  color: stringType().optional()
});
const AddressSchema = objectType({
  full_name: stringType(),
  phone: stringType(),
  address: stringType(),
  city: stringType(),
  department: stringType(),
  postal_code: stringType().optional()
});
const CreatePreferenceInput = objectType({
  items: arrayType(CartItemSchema),
  address: AddressSchema,
  email: stringType().email(),
  accessToken: stringType().optional()
  // JWT del usuario autenticado (opcional)
});
const createMPPreference = createServerFn({
  method: "POST"
}).inputValidator(CreatePreferenceInput).handler(createSsrRpc("48abe60d10af1c4b63432e6b3c1444fc22bb23a2122340216f236e7cb93baf74"));
const getOrderStatus = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  orderId: stringType()
})).handler(createSsrRpc("9a2b3fe0ff87ae35bef9460fb93350905804f8167a152d318d7a59e276f7fbcf"));
export {
  LoaderCircle as L,
  createMPPreference as c,
  getOrderStatus as g
};
