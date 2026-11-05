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
define(['./workbox-a24bf94b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "b88fc0d66e4148b8515a9a95948e153a"
  }, {
    "url": "pwa-512x512.png",
    "revision": "17b884fc05f54d79adf01ec49ba5b621"
  }, {
    "url": "pwa-192x192.png",
    "revision": "79f8fc9f1f9d2b4e70104ffef6f2d326"
  }, {
    "url": "index.html",
    "revision": "7ef8bbb42432ecec87a8fc176e8d9a39"
  }, {
    "url": "favicon.png",
    "revision": "cdeaa83b4ea6463a4d0041d5ea8ad5b9"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "8cbdc931bb8c22fc2f4a37691a63bc18"
  }, {
    "url": "images/real-child-waving.png",
    "revision": "1b8fcb9aac307d569e00f4c53f511b95"
  }, {
    "url": "images/product-09.webp",
    "revision": "0b9b8f21696f6f87a867401f10d5aea0"
  }, {
    "url": "images/product-08.webp",
    "revision": "a72bf346ca6bed6255e63ce79dccd73d"
  }, {
    "url": "images/product-07.webp",
    "revision": "131961b6e9acc8000158d97e583647b2"
  }, {
    "url": "images/product-06.webp",
    "revision": "986f422c2a3d69a1fef0d7acb0f5fca9"
  }, {
    "url": "images/product-05.webp",
    "revision": "ba298e93a4c88f4443d16f0f8e9c7c8e"
  }, {
    "url": "images/product-04.webp",
    "revision": "1ef027a7b4d7fe152d0baeda02b0d78c"
  }, {
    "url": "images/product-03.webp",
    "revision": "28e95eb5db676a4ca28ce87097985b74"
  }, {
    "url": "images/product-02.webp",
    "revision": "c66f8c8420d10d4021f8febe7f1ad118"
  }, {
    "url": "images/product-01.webp",
    "revision": "deece240160664b0ba7eff553d32108b"
  }, {
    "url": "images/mascot.png",
    "revision": "c12f74c099f4a3c03a8b9e6e49079c1a"
  }, {
    "url": "images/logo.png",
    "revision": "aee2fe8c9119934c2f78b71fa0ec1d01"
  }, {
    "url": "images/logo-green.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "images/hero-poster.webp",
    "revision": "2fe2669e8cb97f2600863fe468eb60fd"
  }, {
    "url": "images/embroidery-base.webp",
    "revision": "7623cfaa07a96835316a01aef310ee92"
  }, {
    "url": "images/banner-whitefriday.webp",
    "revision": "04547119427a1351f58cc7e3936bf458"
  }, {
    "url": "assets/style2.css",
    "revision": null
  }, {
    "url": "assets/style.css",
    "revision": null
  }, {
    "url": "assets/main2.js",
    "revision": null
  }, {
    "url": "assets/main.js",
    "revision": null
  }, {
    "url": "assets/logo.png",
    "revision": null
  }, {
    "url": "assets/index.js",
    "revision": null
  }, {
    "url": "assets/aistudio/image_fa77b444.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_f763dffa.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_df5f6672.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_b6e0c1f7.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_a4bf3ce7.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_9543a9fd.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_8b29661c.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_747db87d.png",
    "revision": null
  }, {
    "url": "assets/aistudio/image_474640c0.png",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "8cbdc931bb8c22fc2f4a37691a63bc18"
  }, {
    "url": "favicon.png",
    "revision": "cdeaa83b4ea6463a4d0041d5ea8ad5b9"
  }, {
    "url": "pwa-192x192.png",
    "revision": "79f8fc9f1f9d2b4e70104ffef6f2d326"
  }, {
    "url": "pwa-512x512.png",
    "revision": "17b884fc05f54d79adf01ec49ba5b621"
  }, {
    "url": "images/banner-whitefriday.webp",
    "revision": "04547119427a1351f58cc7e3936bf458"
  }, {
    "url": "images/embroidery-base.webp",
    "revision": "7623cfaa07a96835316a01aef310ee92"
  }, {
    "url": "images/hero-poster.webp",
    "revision": "2fe2669e8cb97f2600863fe468eb60fd"
  }, {
    "url": "images/logo-green.png",
    "revision": "d409ec98a3b63508e19fb49d96c8bbe6"
  }, {
    "url": "images/logo.png",
    "revision": "aee2fe8c9119934c2f78b71fa0ec1d01"
  }, {
    "url": "images/mascot.jpg",
    "revision": "2cd0c40362bf551d72c49bcfe241737c"
  }, {
    "url": "images/mascot.png",
    "revision": "c12f74c099f4a3c03a8b9e6e49079c1a"
  }, {
    "url": "images/og-image.jpg",
    "revision": "d7a11461901a53f7f901293cd03a8f13"
  }, {
    "url": "images/product-01.webp",
    "revision": "deece240160664b0ba7eff553d32108b"
  }, {
    "url": "images/product-02.webp",
    "revision": "c66f8c8420d10d4021f8febe7f1ad118"
  }, {
    "url": "images/product-03.webp",
    "revision": "28e95eb5db676a4ca28ce87097985b74"
  }, {
    "url": "images/product-04.webp",
    "revision": "1ef027a7b4d7fe152d0baeda02b0d78c"
  }, {
    "url": "images/product-05.webp",
    "revision": "ba298e93a4c88f4443d16f0f8e9c7c8e"
  }, {
    "url": "images/product-06.webp",
    "revision": "986f422c2a3d69a1fef0d7acb0f5fca9"
  }, {
    "url": "images/product-07.webp",
    "revision": "131961b6e9acc8000158d97e583647b2"
  }, {
    "url": "images/product-08.webp",
    "revision": "a72bf346ca6bed6255e63ce79dccd73d"
  }, {
    "url": "images/product-09.webp",
    "revision": "0b9b8f21696f6f87a867401f10d5aea0"
  }, {
    "url": "images/real-child-waving.jpg",
    "revision": "40f75802e0faedbdbafb75f63151208e"
  }, {
    "url": "images/real-child-waving.png",
    "revision": "1b8fcb9aac307d569e00f4c53f511b95"
  }, {
    "url": "videos/hero-video.mp4",
    "revision": "3710e045c6a0cef3f7b0da901e451654"
  }, {
    "url": "manifest.webmanifest",
    "revision": "bc34b81f08d5532e5e7e8000561e36e6"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(({
    request
  }) => request.mode === "navigate", new workbox.NetworkFirst({
    "cacheName": "html-pages-cache",
    "networkTimeoutSeconds": 2,
    plugins: []
  }), 'GET');
  workbox.registerRoute(({
    request
  }) => request.destination === "script" || request.destination === "style", new workbox.NetworkFirst({
    "cacheName": "code-bundles-cache",
    "networkTimeoutSeconds": 2,
    plugins: []
  }), 'GET');

}));
