const CACHE_NAME = 'darklinca-v1';
const urlsToCache = [
    '/',
    '/style.css',
    '/script.js',
    '/images/puño_dis.jpeg',
    '/images/puño_banner.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});</content>
<parameter name="filePath">c:\Users\user\Desktop\web-defensa\public\sw.js