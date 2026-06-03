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

// Match the core logic of the dynamic require shim to make it extremely robust
const dynamicRequireRegex = /if\s*\(\s*typeof\s+require\s*<\s*["']u["']\s*\)\s*return\s+require\.apply\(\s*this\s*,\s*arguments\s*\)\s*;?\s*throw\s+(?:new\s+)?Error\(\s*["']Dynamic require of ["']\s*\+\s*x\s*\+\s*["'] is not supported["']\s*\)/;

const patchedRequire =
  'if(String(x).endsWith("/.next/server/middleware-manifest.json"))return{version:3,middleware:{},functions:{},sortedMiddleware:[]};if(typeof require<"u")return require.apply(this,arguments);throw Error(\'Dynamic require of "\'+x+\'" is not supported\')';

const getMiddlewareManifestRegex = /getMiddlewareManifest\s*\(\s*\)\s*\{\s*return\s+this\.minimalMode\s*\?\s*null\s*:\s*(?:require|__require)\s*\(\s*this\.middlewareManifestPath\s*\);?\s*\}/;

const patchedMiddlewareManifest =
  "getMiddlewareManifest(){return this.minimalMode?null:{version:3,middleware:{},functions:{},sortedMiddleware:[]}}";

let source = fs.readFileSync(handlerPath, "utf8");

if (!source.includes(patchedRequire)) {
  if (!dynamicRequireRegex.test(source)) {
    throw new Error("OpenNext dynamic require shim was not found.");
  }

  source = source.replace(dynamicRequireRegex, patchedRequire);
}

if (!source.includes(patchedMiddlewareManifest)) {
  if (!getMiddlewareManifestRegex.test(source)) {
    const index = source.indexOf("getMiddlewareManifest");
    if (index >= 0) {
      console.warn("Found getMiddlewareManifest but it did not match regex. Content:", source.substring(index, index + 200));
    }
    throw new Error("Next middleware manifest loader was not found.");
  }

  source = source.replace(getMiddlewareManifestRegex, patchedMiddlewareManifest);
}

fs.writeFileSync(handlerPath, source);

console.log("Patched OpenNext middleware manifest require.");
