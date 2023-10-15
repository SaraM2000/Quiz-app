"use strict";

const dynamicCacheName = "dynamic";

const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", (e) => {
  console.log("install!!");
});

self.addEventListener("activate", (e) => {
  console.log("activate!!");
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== dynamicCacheName)
          .map((key) => {
            caches.delete(key);
          })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return (
        response ||
        fetch(e.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            limitCacheSize(dynamicCacheName, 20);
            cache.put(e.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
