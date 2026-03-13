self.addEventListener('install', event => {
  console.log('SW installed');
});

self.addEventListener('fetch', event => {
  // אפשר להוסיף קאשינג כאן
});
