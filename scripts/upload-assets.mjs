import crypto from "crypto";
import fs from "fs";

const CLOUD = "dtoosryre";
const API_KEY = "899217647967881";
const API_SECRET = "mhc0lw8GuAt9GUPEh1_ovJ5h-cA";

const files = [
  "p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg",
  "look1.jpg", "look2.jpg", "look3.jpg",
  "hero.jpg", "cat-hombre.jpg", "cat-acc.jpg", "cat-mujer.jpg",
];

function sign(params) {
  const sorted = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&");
  return crypto.createHash("sha1").update(sorted + API_SECRET).digest("hex");
}

const results = {};

for (const file of files) {
  const name = file.replace(/\.jpg$/, "");
  const publicId = `aiahn/seed/${name}`;
  const timestamp = Math.round(Date.now() / 1000);
  const params = { overwrite: "true", public_id: publicId, timestamp };
  const signature = sign(params);

  const buffer = fs.readFileSync(`src/assets/${file}`);
  const form = new FormData();
  form.append("file", new Blob([buffer]), file);
  form.append("api_key", API_KEY);
  form.append("timestamp", String(timestamp));
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  if (data.public_id) {
    results[name] = data.public_id;
    console.log(`✓ ${file} → ${data.public_id}`);
  } else {
    console.error(`✗ ${file}:`, JSON.stringify(data));
  }
}

console.log("\n--- RESULTADO ---");
console.log(JSON.stringify(results, null, 2));
