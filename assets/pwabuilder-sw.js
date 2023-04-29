// Instalação do Service Worker
self.addEventListener('install', function(event) {
  console.log('Service worker instalado com sucesso!');
});

// Ativação do Service Worker
self.addEventListener('activate', function(event) {
  console.log('Service worker ativado com sucesso!');
});

// Evento Fetch
self.addEventListener('fetch', function(event) {
  console.log('Requisição fetch interceptada pelo service worker!');
});
