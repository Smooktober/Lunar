// Importing the necessary service worker scripts
importScripts('./dip/dip.worker.js');
importScripts('./uv/uv.sw.js');

// Creating new service worker instances
const uvServiceWorker = new UVServiceWorker();
const dipServiceWorker = new DIPServiceWorker('./dip/dip.worker.js');

// Listening for fetch events
self.addEventListener('fetch', evt => {
  if (evt.request.url.startsWith(location.origin + '/d/')) {
    evt.respondWith(dipServiceWorker.fetch(evt));
  }
  if (evt.request.url.startsWith(location.origin + '/u/')) {
    evt.respondWith(uvServiceWorker.fetch(evt));
  }
});