import { T as TSS_SERVER_FUNCTION, l as createServerFn } from "./index.mjs";
import { c as createClient } from "./index-0g9BxVXQ.mjs";
import require$$1 from "crypto";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "async_hooks";
import "stream";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getCloudinarySignature_createServerFn_handler = createServerRpc({
  id: "130b829988ea2c8180bcef695dfd31d73ff7f9d3bfe8bbda342969f6d540f822",
  name: "getCloudinarySignature",
  filename: "src/lib/cloudinary-sign.ts"
}, (opts) => getCloudinarySignature.__executeServer(opts));
const getCloudinarySignature = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(getCloudinarySignature_createServerFn_handler, async ({
  data
}) => {
  const url = "https://fqsprmctzfukebplodlb.supabase.co";
  const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxc3BybWN0emZ1a2VicGxvZGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwODQwNjcsImV4cCI6MjA5NTY2MDA2N30.PS9ny7ihTX0PqXM4p7H92vFeUU_TBEsmalHGMcKrOuw";
  const supabase = createClient(url, key, {
    global: {
      headers: {
        Authorization: `Bearer ${data.accessToken}`
      }
    }
  });
  const {
    data: userData,
    error: userErr
  } = await supabase.auth.getUser(data.accessToken);
  if (userErr || !userData.user) {
    throw new Error(`JWT inválido: ${userErr?.message ?? "sin usuario"}`);
  }
  const {
    data: profile,
    error
  } = await supabase.from("profiles").select("role").eq("id", userData.user.id).single();
  if (error) {
    throw new Error(`Error leyendo perfil: ${error.message}`);
  }
  if (profile?.role !== "admin") {
    throw new Error(`Tu rol es "${profile?.role}" — necesitas admin`);
  }
  const timestamp = Math.round(Date.now() / 1e3);
  const folder = "aiahn";
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = require$$1.createHash("sha1").update(paramsToSign + process.env.CLOUDINARY_API_SECRET).digest("hex");
  return {
    signature,
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY,
    cloud_name: "dtoosryre",
    folder
  };
});
export {
  getCloudinarySignature_createServerFn_handler
};
