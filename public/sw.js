// Bump CACHE_NAME em cada release para os clientes atualizarem.
const CACHE_NAME = "ze-static-v2";
const RUNTIME_CACHE = "ze-pages-v1";

const STATIC_ASSETS = [
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME && k !== RUNTIME_CACHE).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Só GET same-origin; /api e restantes métodos passam direto para a rede.
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  // Assets em cache: serve o que foi precarregado.
  if (STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(caches.match(request).then((hit) => hit || fetch(request)));
    return;
  }

  // Navegações de documento: rede primeiro; offline serve a página visitada
  // ou /offline.html. O put fica em waitUntil para o SW não morrer a meio.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (res.ok && (res.headers.get("content-type") || "").includes("text/html")) {
            const clone = res.clone();
            event.waitUntil(
              caches.open(RUNTIME_CACHE).then((c) => c.put(request, clone)),
            );
          }
          return res;
        })
        .catch(() =>
          caches.match(request).then((hit) => hit || caches.match("/offline.html")),
        ),
    );
    return;
  }

  // Navegações cliente (Link do Next) pedem dados RSC, não o documento —
  // aproveitamos para guardar o HTML completo dessa rota em background,
  // senão um reload offline de uma página "visitada" caía no /offline.html.
  if (url.searchParams.has("_rsc") || request.headers.get("RSC") === "1") {
    event.waitUntil(
      fetch(url.pathname)
        .then((res) => {
          if (res.ok && (res.headers.get("content-type") || "").includes("text/html")) {
            const doc = new Request(url.pathname);
            return caches.open(RUNTIME_CACHE).then((c) => c.put(doc, res));
          }
        })
        .catch(() => {}),
    );
  }
});
