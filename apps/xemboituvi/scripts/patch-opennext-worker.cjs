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

const dynamicRequire =
  "function(x){if(typeof require<\"u\")return require.apply(this,arguments);throw Error('Dynamic require of \"'+x+'\" is not supported')}";
const patchedRequire =
  "function(x){if(String(x).endsWith(\"/.next/server/middleware-manifest.json\"))return{version:3,middleware:{},functions:{},sortedMiddleware:[]};if(typeof require<\"u\")return require.apply(this,arguments);throw Error('Dynamic require of \"'+x+'\" is not supported')}";
const dynamicMiddlewareManifest =
  "getMiddlewareManifest(){return this.minimalMode?null:require(this.middlewareManifestPath)}";
const patchedMiddlewareManifest =
  "getMiddlewareManifest(){return this.minimalMode?null:{version:3,middleware:{},functions:{},sortedMiddleware:[]}}";

let source = fs.readFileSync(handlerPath, "utf8");

if (!source.includes(patchedRequire)) {
  if (!source.includes(dynamicRequire)) {
    throw new Error("OpenNext dynamic require shim was not found.");
  }

  source = source.replace(dynamicRequire, patchedRequire);
}

if (!source.includes(patchedMiddlewareManifest)) {
  if (!source.includes(dynamicMiddlewareManifest)) {
    throw new Error("Next middleware manifest loader was not found.");
  }

  source = source.replace(dynamicMiddlewareManifest, patchedMiddlewareManifest);
}

fs.writeFileSync(handlerPath, source);

console.log("Patched OpenNext middleware manifest require.");
