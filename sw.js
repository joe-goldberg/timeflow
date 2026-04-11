const CACHE_NAME = "timeflow-v4";
const ASSETS = ["/", "/index.html", "/manifest.json",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap",
  "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (new URL(e.request.url).hostname === "api.anthropic.com") { e.respondWith(fetch(e.request)); return; }
  e.respondWith(caches.match(e.request).then(c => c || fetch(e.request).then(r => { if (r.ok && e.request.method === "GET") { caches.open(CACHE_NAME).then(cache => cache.put(e.request, r.clone())); } return r; })).catch(() => e.request.mode === "navigate" ? caches.match("/index.html") : undefined));
});
