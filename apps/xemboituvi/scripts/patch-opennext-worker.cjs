const fs = require("fs");
const path = require("path");

const handlerPath = path.join(
  __dirname,
  "..",
  ".open-next",
  "server-functions",
  "default",
  "handler.mjs",
);

if (!fs.existsSync(handlerPath)) {
  console.warn(`Handler file not found at ${handlerPath}, skipping patch.`);
  process.exit(0);
}

// Match the core logic of the dynamic require shim to make it extremely robust
const dynamicRequireRegex = /if\s*\(\s*typeof\s+require\s*<\s*["']u["']\s*\)\s*return\s+require\.apply\(\s*this\s*,\s*arguments\s*\)\s*;?\s*throw\s+(?:new\s+)?Error\(\s*["']Dynamic require of ["']\s*\+\s*x\s*\+\s*["'] is not supported["']\s*\)/;

const patchedRequire =
  'if(String(x).endsWith("/.next/server/middleware-manifest.json"))return{version:3,middleware:{},functions:{},sortedMiddleware:[]};if(typeof require<"u")return require.apply(this,arguments);throw Error(\'Dynamic require of "\'+x+\'" is not supported\')';

const getMiddlewareManifestRegex = /getMiddlewareManifest\s*\(\s*\)\s*\{\s*return\s+this\.minimalMode\s*\?\s*null\s*:\s*(?:require|__require)\s*\(\s*this\.middlewareManifestPath\s*\);?\s*\}/;

const patchedMiddlewareManifest =
  "getMiddlewareManifest(){return this.minimalMode?null:{version:3,middleware:{},functions:{},sortedMiddleware:[]}}";

let source = fs.readFileSync(handlerPath, "utf8");
let modified = false;

if (!source.includes(patchedRequire)) {
  if (dynamicRequireRegex.test(source)) {
    source = source.replace(dynamicRequireRegex, patchedRequire);
    modified = true;
    console.log("Patched dynamic require shim in handler.mjs");
  } else {
    console.warn("OpenNext dynamic require shim was not found in handler.mjs, skipping dynamic require patch.");
  }
}

if (!source.includes(patchedMiddlewareManifest)) {
  if (getMiddlewareManifestRegex.test(source)) {
    source = source.replace(getMiddlewareManifestRegex, patchedMiddlewareManifest);
    modified = true;
    console.log("Patched middleware manifest require in handler.mjs");
  } else {
    console.warn("Next middleware manifest loader was not found in handler.mjs, skipping manifest patch.");
  }
}

if (modified) {
  fs.writeFileSync(handlerPath, source);
  console.log("Successfully patched OpenNext server bundle.");
} else {
  console.log("No patching required or handler was already patched.");
}
