// // Reacts to POST /hello-world
// export async function onRequestPost(request) {
//   // ...
//   return new Response(`Hello world`)
// }

addEventListener('fetch', (event) => {
  event.respondWith(new Response('Hello world'))
})
