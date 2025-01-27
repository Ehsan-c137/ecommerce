self.addEventListener("push", function (event) {
   if (event.data) {
      const data = event.data.json()
      const options = {
         body: data.body,
         icon: data.icon || "/android-chrome-512x512.png",
         badge: "/android-chrome-512x512.png",
         vibrate: [100, 50, 100],
         data: {
            dateOfArrival: Date.now(),
            primaryKey: "2",
         },
      }
      event.waitUntil(self.registration.showNotification(data.title, options))
   }
})

self.addEventListener("notificationclick", function (event) {
   console.log("Notification click received.")
   event.notification.close()
   event.waitUntil(clients.openWindow("<https://your-website.com>"))
})

self.addEventListener("fetch", (event) => {
   const request = event.request

   if (
      request.destination === "image" ||
      request.destination === "style" ||
      request.destination === "script"
   ) {
      event.respondWith(
         caches
            .match(request)
            .then((response) => response || fetch(request))
            .catch(() => {
               if (request.destination === "image") {
                  return caches.match("/android-chrome-512x512.png")
               }
               return caches.match("/offline")
            })
      )
      return
   }

   event.respondWith(
      fetch(request).catch(() => {
         return caches.match(request) || caches.match("/offline")
      })
   )
})
