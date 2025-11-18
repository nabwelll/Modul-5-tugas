# Cache Verification Guide

This guide shows you how to verify that the query caching is working correctly.

## Prerequisites
1. Build the application: `npm run build`
2. Serve the application: `npm run preview` or deploy to a server
3. Open the application in a browser (Chrome, Firefox, or Edge recommended)

## Step 1: Open Browser DevTools

Press `F12` or right-click anywhere on the page and select "Inspect" to open DevTools.

## Step 2: Check Network Tab (Disk Cache Indicator)

### First Load:
1. Go to the **Network** tab in DevTools
2. Ensure "Disable cache" is **NOT** checked
3. Refresh the page (F5)
4. Look at the requests to the API and images
5. You should see normal file sizes (e.g., "2.5 KB", "150 KB")

### Second Load (Cache Active):
1. Refresh the page again (F5)
2. Look at the **Size** column in the Network tab
3. You should now see:
   - **(disk cache)** - for cached responses
   - Or **(from ServiceWorker)** - for responses served by the service worker
   - Or **(from memory cache)** - for in-memory cached responses

**Example:**
```
Name                        Status    Type          Size           Time
/api/v1/recipes?limit=3     200       xhr           (disk cache)   8ms
recipe-image.jpg            200       img           (disk cache)   5ms
```

## Step 3: Check Cache Storage

1. Go to the **Application** tab in DevTools
2. In the left sidebar, expand **Cache Storage**
3. You should see two caches:
   - `recipe-api-cache` - Contains API responses
   - `recipe-images-cache` - Contains image files
4. Click on each cache to see its contents

### What to Look For:
- **recipe-api-cache**: Should contain URLs like `https://modlima.fuadfakhruz.id/api/v1/recipes...`
- **recipe-images-cache**: Should contain image URLs with extensions `.jpg`, `.png`, `.webp`, etc.

## Step 4: Test Offline Capability (Optional)

1. In the **Network** tab, check the **Offline** checkbox
2. Refresh the page
3. If you've previously loaded recipes, they should still appear (served from cache)
4. Uncheck **Offline** when done testing

## Troubleshooting

### Cache Not Working?
- Ensure you're accessing via HTTPS or localhost (service workers require secure context)
- Make sure "Disable cache" is NOT checked in DevTools
- Clear browser cache and reload to start fresh
- Check the Console tab for any service worker errors

### Service Worker Not Registered?
1. Go to **Application** → **Service Workers**
2. Check if the service worker is registered and activated
3. You should see `sw.js` with status "activated and running"

### Cache Not Showing in Application Tab?
- Wait a few seconds after the first page load
- Refresh the page once or twice to trigger caching
- Navigate to different pages to generate more cache entries

## Expected Results

After successful implementation:
- ✅ First page load: Normal network requests
- ✅ Second page load: "(disk cache)" or "(from ServiceWorker)" in Size column
- ✅ Cache Storage shows `recipe-api-cache` and `recipe-images-cache`
- ✅ Faster page load times on subsequent visits
- ✅ Recipes accessible even when offline (if previously loaded)

## Performance Impact

You should notice:
- **Load Time**: 50-90% faster on subsequent loads
- **Data Transfer**: Near zero for cached resources
- **Server Requests**: Reduced by 70-100% for cached content

## Notes

- Cache is automatically cleared after expiration (7 days for API, 30 days for images)
- Cache entries are limited (50 for API, 100 for images)
- Clearing browser data will also clear the cache
- Service worker updates automatically when the application is updated
