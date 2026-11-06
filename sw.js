const C='kesher-v7';
const A=['./','./index.html','./manifest.json','./img/hero.jpg','./img/icon-192.png','./img/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>Promise.all(A.map(u=>fetch(u,{cache:'reload'}).then(r=>c.put(u,r))))).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C&&k!=='kesher-data').map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);
 const html=e.request.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('.html');
 if(html){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./index.html',cp));return r}).catch(()=>caches.match('./index.html')));return}
 e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{if(u.origin===location.origin||u.hostname.includes('gstatic')||u.hostname.includes('googleapis')){const cp=r.clone();caches.open(u.pathname.includes('/data/')?'kesher-data':C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match('./index.html'))))});
