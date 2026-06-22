const CACHE_NAME = "timeflow-v5";
const ASSETS = [
  "/timeflow/",
  "/timeflow/index.html",
  "/timeflow/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  // Never intercept Anthropic API calls
  if (new URL(e.request.url).hostname === "api.anthropic.com") {
    e.respondWith(fetch(e.request));
    return;
  }
  // Never intercept Google Fonts
  if (new URL(e.request.url).hostname === "fonts.googleapis.com" ||
      new URL(e.request.url).hostname === "fonts.gstatic.com") {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(r => {
        if (r.ok && e.request.method === "GET") {
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, r.clone()));
        }
        return r;
      });
    }).catch(() => {
      if (e.request.mode === "navigate") {
        return caches.match("/timeflow/index.html");
      }
    })
  );
});
