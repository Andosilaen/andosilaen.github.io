/* Service worker: offline support for the CV site.
   Bump VERSION whenever cached files change so clients pick up the update. */
var VERSION = "v1";
var CACHE = "cv-" + VERSION;
var CORE = [
  "./",
  "index.html",
  "css/style.css",
  "js/main.js",
  "manifest.webmanifest",
  "img/bg-network.svg",
  "img/icons/icon-192.png",
  "img/icons/icon-512.png",
  "img/icons/favicon-32.png",
  "img/icons/apple-touch-icon.png",
  "prototypes/dopay.html",
  "prototypes/nexwave.html",
  "prototypes/wiratama.html",
  "prototypes/tigaputra.html"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf("cv-") === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function put(req, res) {
  if (res && res.ok && res.type === "basic") { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
  return res;
}

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  /* Pages: network first so updates show up, cache when offline */
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(function (res) { return put(req, res); }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (r) { return r || caches.match("index.html"); });
    }));
    return;
  }
  /* Assets: serve from cache, refresh in the background */
  e.respondWith(caches.match(req).then(function (hit) {
    var net = fetch(req).then(function (res) { return put(req, res); }).catch(function () { return hit; });
    return hit || net;
  }));
});
