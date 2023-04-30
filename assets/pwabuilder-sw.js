// Instalação do Service Worker
// Define o nome da cache
var CACHE_NAME = 'my-pwa-cache';

// Lista dos arquivos do PWA para serem armazenados em cache
var urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/assets/AppIcons/playstore.png'
];

// Instalação do Service Worker
self.addEventListener('install', function(event) {
  // Armazena em cache os arquivos do PWA
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache do PWA criada com sucesso!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições de rede
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Tenta buscar a requisição na cache
    caches.match(event.request)
      .then(function(response) {
        // Se a requisição existe na cache, retorna a resposta da cache
        if (response) {
          return response;
        }
        // Senão, realiza a requisição normalmente e armazena a resposta em cache para futuras requisições
        return fetch(event.request).then(
          function(response) {
            // Verifica se a resposta é válida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clona a resposta
            var responseToCache = response.clone();
            // Armazena a resposta em cache
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
});
