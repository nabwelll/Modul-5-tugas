# Query Caching Implementation

## Overview
This application implements query caching for recipe data from the API using Workbox service worker with runtime caching strategies.

## Caching Strategy

### 1. Recipe API Cache
- **Pattern**: `/^https:\/\/.*\/api\/v1\/recipes.*/i`
- **Strategy**: CacheFirst
- **Cache Name**: `recipe-api-cache`
- **Configuration**:
  - Max Entries: 50
  - Max Age: 7 days (604800 seconds)
  - Cacheable Responses: Status codes 0, 200

This caches all GET requests to recipe API endpoints. On the first request, data is fetched from the network and stored in cache. Subsequent requests are served directly from the cache (showing "disk cache" in browser DevTools), significantly improving performance and reducing server load.

### 2. Recipe Images Cache
- **Pattern**: `/\.(jpg|jpeg|png|gif|webp|svg)$/i`
- **Strategy**: CacheFirst
- **Cache Name**: `recipe-images-cache`
- **Configuration**:
  - Max Entries: 100
  - Max Age: 30 days (2592000 seconds)
  - Cacheable Responses: Status codes 0, 200

This caches all recipe images. Images are stored for up to 30 days, reducing bandwidth usage and improving page load times.

## How to Verify

### In Browser DevTools (Network Tab)
1. Open the application in a browser
2. Open DevTools (F12) and go to the Network tab
3. Load a page with recipes
4. On first load, you'll see network requests
5. Refresh the page
6. You should see "(disk cache)" or "(from ServiceWorker)" in the Size column for cached requests

### In Browser DevTools (Application Tab)
1. Open DevTools (F12) and go to the Application tab
2. Under "Cache" → "Cache Storage"
3. You should see:
   - `recipe-api-cache` - containing API responses
   - `recipe-images-cache` - containing image files

## Benefits
- **Faster Load Times**: Cached data is served instantly from disk
- **Reduced Server Load**: Less requests to the API server
- **Offline Capability**: Previously loaded recipes can be viewed offline
- **Bandwidth Savings**: Images and data are only downloaded once

## Implementation Details
The caching is configured in `vite.config.js` under the `workbox.runtimeCaching` section and is automatically compiled into the service worker (`dist/sw.js`) during the build process.
