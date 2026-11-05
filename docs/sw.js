/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "402b66900e731ca748771b6fc5e7a068"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "index.html",
    "revision": "a2ce9d5531921b73e3c94614347243f2"
  }, {
    "url": "favicon.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "images/real-child-waving.png",
    "revision": "40f75802e0faedbdbafb75f63151208e"
  }, {
    "url": "images/product-09.webp",
    "revision": "d590b077f631beab2ba6ddb004dc9df9"
  }, {
    "url": "images/product-08.webp",
    "revision": "6040c4899bab1e7e813a993e7608964f"
  }, {
    "url": "images/product-07.webp",
    "revision": "a075f2b53eec035da6625b9bc0d75c4e"
  }, {
    "url": "images/product-06.webp",
    "revision": "7bb59ac6ba736c0f8edd991713c50f97"
  }, {
    "url": "images/product-05.webp",
    "revision": "48b4c2a817022b89df46b7cdbb15631b"
  }, {
    "url": "images/product-04.webp",
    "revision": "5a11212a178a341a87ae3a633a9e36c5"
  }, {
    "url": "images/product-03.webp",
    "revision": "a309f46c1e6bba1969f30d12a6778d46"
  }, {
    "url": "images/product-02.webp",
    "revision": "03dc2d1384b064c8537edfae9e3d058e"
  }, {
    "url": "images/product-01.webp",
    "revision": "7bee6fe86fa640b465591af4c20d24d1"
  }, {
    "url": "images/mascot.png",
    "revision": "9168d34d8172b04977bede1245ba02e3"
  }, {
    "url": "images/logo.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "images/logo-green.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "images/hero-poster.webp",
    "revision": "f8e3fa6fe7ef065fc4dee55a265dcbcc"
  }, {
    "url": "images/embroidery-base.webp",
    "revision": "54e816308975a450e3a8d9bbfe436fe5"
  }, {
    "url": "images/banner-whitefriday.webp",
    "revision": "2f9af9219df7c607ff94bff2d9799194"
  }, {
    "url": "assets/logo-B25F3AmR.png",
    "revision": null
  }, {
    "url": "assets/index-Tony7xbj.js",
    "revision": null
  }, {
    "url": "assets/index-DF1CGW15.css",
    "revision": null
  }, {
    "url": "assets/hero-poster-D6VJgeb_.webp",
    "revision": null
  }, {
    "url": "assets/aistudio/image_df5f6672.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_474640c0.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "favicon.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "pwa-192x192.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "pwa-512x512.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "images/banner-whitefriday.webp",
    "revision": "2f9af9219df7c607ff94bff2d9799194"
  }, {
    "url": "images/embroidery-base.webp",
    "revision": "54e816308975a450e3a8d9bbfe436fe5"
  }, {
    "url": "images/hero-poster.webp",
    "revision": "f8e3fa6fe7ef065fc4dee55a265dcbcc"
  }, {
    "url": "images/logo-green.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "images/logo.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "images/mascot.jpg",
    "revision": "9168d34d8172b04977bede1245ba02e3"
  }, {
    "url": "images/mascot.png",
    "revision": "9168d34d8172b04977bede1245ba02e3"
  }, {
    "url": "images/og-image.jpg",
    "revision": "23e28f338b3387f36b264ac65176ba8a"
  }, {
    "url": "images/product-01.webp",
    "revision": "7bee6fe86fa640b465591af4c20d24d1"
  }, {
    "url": "images/product-02.webp",
    "revision": "03dc2d1384b064c8537edfae9e3d058e"
  }, {
    "url": "images/product-03.webp",
    "revision": "a309f46c1e6bba1969f30d12a6778d46"
  }, {
    "url": "images/product-04.webp",
    "revision": "5a11212a178a341a87ae3a633a9e36c5"
  }, {
    "url": "images/product-05.webp",
    "revision": "48b4c2a817022b89df46b7cdbb15631b"
  }, {
    "url": "images/product-06.webp",
    "revision": "7bb59ac6ba736c0f8edd991713c50f97"
  }, {
    "url": "images/product-07.webp",
    "revision": "a075f2b53eec035da6625b9bc0d75c4e"
  }, {
    "url": "images/product-08.webp",
    "revision": "6040c4899bab1e7e813a993e7608964f"
  }, {
    "url": "images/product-09.webp",
    "revision": "d590b077f631beab2ba6ddb004dc9df9"
  }, {
    "url": "images/real-child-waving.jpg",
    "revision": "40f75802e0faedbdbafb75f63151208e"
  }, {
    "url": "images/real-child-waving.png",
    "revision": "40f75802e0faedbdbafb75f63151208e"
  }, {
    "url": "videos/hero-video.mp4",
    "revision": "a889f961a265a183328e414dd8583bb1"
  }, {
    "url": "manifest.webmanifest",
    "revision": "bc82d9a703cb52f9f6d00294e4dc311b"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
