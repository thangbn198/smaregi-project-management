(() => {
  // <define:__PRECACHE__>
  var define_PRECACHE_default = ["/smaregi-project-management/assets/alert-DqMxNjMw.js", "/smaregi-project-management/assets/arrow-left-CnOiX874.js", "/smaregi-project-management/assets/auth-errors-CIZFPf91.js", "/smaregi-project-management/assets/board-page-DXaGMGYD.js", "/smaregi-project-management/assets/checkbox-BsqKiUmV.js", "/smaregi-project-management/assets/date-picker-B2nSCLFL.js", "/smaregi-project-management/assets/empty-state-BRGJ9w-7.js", "/smaregi-project-management/assets/eye-BB9Kb5Vu.js", "/smaregi-project-management/assets/firebase-DPHAAbza.js", "/smaregi-project-management/assets/firebase-WlQlc4lN.js", "/smaregi-project-management/assets/firebase-auth-adapter-CxXGzCAN.js", "/smaregi-project-management/assets/firebase-config-Ch6mRaQ0.js", "/smaregi-project-management/assets/forgot-password-page-BmrjSRFJ.js", "/smaregi-project-management/assets/form-Dsde8XNK.js", "/smaregi-project-management/assets/index-BfWKMK17.css", "/smaregi-project-management/assets/index-DTBv_MMi.js", "/smaregi-project-management/assets/input-C-Ca0jtV.js", "/smaregi-project-management/assets/login-page-BhAhiT0s.js", "/smaregi-project-management/assets/messages-zSHgq0A6.js", "/smaregi-project-management/assets/milestone-status-BCA-4l1N.js", "/smaregi-project-management/assets/parseISO-Bp2C4XAk.js", "/smaregi-project-management/assets/project-settings-page-DELwn40t.js", "/smaregi-project-management/assets/projects-page-BbMsb3i2.js", "/smaregi-project-management/assets/react-vendor-BNmTiJ-I.js", "/smaregi-project-management/assets/rolldown-runtime-hePW80VL.js", "/smaregi-project-management/assets/schedule-page-hDPgixRs.js", "/smaregi-project-management/assets/schemas-5dDwraAW.js", "/smaregi-project-management/assets/schemas-DHlX_xfA.js", "/smaregi-project-management/assets/table-8Z8tdxg_.js", "/smaregi-project-management/assets/use-debounced-value-BCcjv3xn.js", "/smaregi-project-management/assets/use-task-drawer-C0JKAgNJ.js", "/smaregi-project-management/favicon.svg", "/smaregi-project-management/icons.svg", "/smaregi-project-management/icons/apple-touch-icon.png", "/smaregi-project-management/icons/icon-192.png", "/smaregi-project-management/icons/icon-512.png", "/smaregi-project-management/icons/icon-maskable-512.png", "/smaregi-project-management/index.html", "/smaregi-project-management/manifest.webmanifest"];

  // src/shared/pwa/cache-rules.ts
  var NEVER_CACHE_HOSTS = [
    "firestore.googleapis.com",
    "identitytoolkit.googleapis.com",
    "securetoken.googleapis.com",
    "firebasestorage.googleapis.com",
    "firebaseinstallations.googleapis.com",
    "www.googleapis.com"
  ];
  var HASHED_ASSET = /-[A-Za-z0-9_-]{8,}\.[a-z0-9]+$/;
  function cacheStrategyFor(request, appOrigin) {
    if (request.method !== "GET") return "passthrough";
    let url;
    try {
      url = new URL(request.url);
    } catch {
      return "passthrough";
    }
    if (NEVER_CACHE_HOSTS.includes(url.hostname)) return "passthrough";
    if (url.origin !== appOrigin) return "passthrough";
    if (request.isNavigation) return "network-first";
    if (HASHED_ASSET.test(url.pathname)) return "cache-first";
    return "stale-while-revalidate";
  }
  function isObsoleteCache(cacheName, currentCacheName) {
    return cacheName.startsWith("smaregi-pm-") && cacheName !== currentCacheName;
  }

  // src/shared/pwa/sw-source.ts
  var PRECACHE = define_PRECACHE_default;
  var CACHE_NAME = "smaregi-pm-87875084de79";
  var SHELL = "/smaregi-project-management/index.html";
  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        await Promise.all(
          PRECACHE.map(
            (url) => cache.add(new Request(url, { cache: "reload" })).catch(() => void 0)
          )
        );
      })
    );
  });
  self.addEventListener("activate", (event) => {
    event.waitUntil(
      (async () => {
        const names = await caches.keys();
        await Promise.all(
          names.filter((name) => isObsoleteCache(name, CACHE_NAME)).map((name) => caches.delete(name))
        );
        await self.clients.claim();
      })()
    );
  });
  self.addEventListener("message", (event) => {
    if (event.data?.type === "SKIP_WAITING") {
      void self.skipWaiting();
    }
  });
  self.addEventListener("fetch", (event) => {
    const request = event.request;
    const strategy = cacheStrategyFor(
      { method: request.method, url: request.url, isNavigation: request.mode === "navigate" },
      self.location.origin
    );
    if (strategy === "passthrough") return;
    if (strategy === "network-first") {
      event.respondWith(networkFirst(request));
      return;
    }
    if (strategy === "cache-first") {
      event.respondWith(cacheFirst(request));
      return;
    }
    event.respondWith(staleWhileRevalidate(request));
  });
  function isCacheable(response) {
    return response.status === 200 && response.type === "basic";
  }
  async function networkFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    try {
      const response = await fetch(request);
      if (isCacheable(response)) void cache.put(request, response.clone());
      return response;
    } catch {
      const cached = await cache.match(request) ?? await cache.match(SHELL);
      if (cached) return cached;
      throw new Error("offline v\xE0 ch\u01B0a c\xF3 b\u1EA3n cache c\u1EE7a trang n\xE0y");
    }
  }
  async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (isCacheable(response)) void cache.put(request, response.clone());
    return response;
  }
  async function staleWhileRevalidate(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    const network = fetch(request).then((response2) => {
      if (isCacheable(response2)) void cache.put(request, response2.clone());
      return response2;
    }).catch(() => void 0);
    if (cached) return cached;
    const response = await network;
    if (response) return response;
    throw new Error("offline v\xE0 ch\u01B0a c\xF3 b\u1EA3n cache c\u1EE7a t\xE0i nguy\xEAn n\xE0y");
  }
})();
