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
   event.respondWith(
      caches.match(event.request).then((respond) => {
         return (
            respond ||
            fetch(event.request).catch(() => {
               return caches.match("/offline")
            })
         )
      })
   )
})
