const CACHE_NAME = "birdwatch-pwa-v2";
const ARCHIVOS_A_CACHEAR = [
    "./",
    "./index.html",
    "./styles.css",
    "./especies.js",
    "./app.js",
    "./icon-birdwatch.jpg",
    "./manifest.json"
];

// Instalar y guardar archivos en caché
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ARCHIVOS_A_CACHEAR);
        })
    );
    self.skipWaiting();
});

// Limpiar versiones viejas de caché si actualizas el código
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Responder desde caché cuando no hay internet
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((respuestaCache) => {
            return respuestaCache || fetch(event.request);
        })
    );
});