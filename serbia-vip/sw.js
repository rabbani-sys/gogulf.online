const CACHE='serbia-gateway-v3.1';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(clients.claim());});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok && new URL(e.request.url).origin===location.origin){const c=caches.open(CACHE);c.then(x=>x.put(e.request,r.clone()));}return r;}).catch(()=>caches.match(e.request)));
});
