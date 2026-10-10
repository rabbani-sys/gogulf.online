const CACHE_NAME='rabbani-career-shell-v2';
const SHELL=['./digital_proposal_exploring_signature_hub_complete_pdf.html','./manifest.webmanifest','./pwa-icon.svg'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;event.respondWith(fetch(req).then(response=>{if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy));}return response;}).catch(()=>caches.match(req).then(cached=>cached||caches.match('./digital_proposal_exploring_signature_hub_complete_pdf.html'))));});
