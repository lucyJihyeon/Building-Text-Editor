//importing necassary modules
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst, StaleWhileRevalidate } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

//makes an array of URLs to precache
precacheAndRoute(self.__WB_MANIFEST);

//Create a new instance of CacheFirst that serves responses from the cache first.
//if the reponse is not found in the cache, it fetches it from the network and then caches the response for the future use
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    //resonses with status codes '0'(network error) and '200'(successful response) should be cached
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    //sets the expiration time of 30 days
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

//manage caching strategies for specific URLs ('/index.html', '/')
//pre-caches the URLs to make sure they are available in the cache before they are requested by the user
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

//registers a route handler that applies the 'pageCache' to navigation requests 
registerRoute(({ request }) => request.mode === "navigate", pageCache);

//set up asset cache 
registerRoute(
  //filter requests for specific types of assets
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    // Name of the cache storage.
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], 
      }),
    ],
  })
);

// Register the offlineFallback strategy for handling offline navigation
offlineFallback({
  pageFallback: '/index.html', 
});