# Testing Lazy Loading Implementation

## Objective
Verify that images load progressively (lazy loading) instead of all at once when scrolling through recipe pages.

## Test Scenario

### Prerequisites
- PWA is running (either dev server or production build)
- Browser with DevTools support (Chrome, Firefox, Edge, Safari)

### Test Steps

#### Test 1: Homepage Hero Section
1. Open PWA in browser
2. Open DevTools (F12)
3. Go to Network tab
4. Filter by "Img" or type `img` in filter box
5. Clear network log (trash icon)
6. Reload the page
7. **Expected**: Hero section images load, but recipe images from sections below don't load yet

#### Test 2: Makanan Page Scroll Test
1. Navigate to "Makanan" page
2. Clear network log in DevTools
3. Observe initial network requests
4. **Expected**: Only 3-6 recipe images load initially (the visible ones)
5. Scroll down slowly
6. **Expected**: Watch network tab - new image requests appear as you scroll
7. **Expected**: Images load approximately 50px before they become visible

#### Test 3: Minuman Page Scroll Test
1. Navigate to "Minuman" page
2. Clear network log
3. Scroll slowly from top to bottom
4. **Expected**: Images load progressively, not all at once
5. **Expected**: Smooth transitions as images load with blur effect

#### Test 4: Recipe Detail Page
1. Click on any recipe card
2. Clear network log
3. Observe the recipe detail hero image
4. **Expected**: Hero image loads with smooth transition
5. Go back and click another recipe
6. **Expected**: New recipe image loads progressively

## What to Look For

### ✅ Success Indicators
- Images load in batches as you scroll
- Network tab shows staggered requests (timestamps spread out)
- Smooth blur-to-sharp transition when images load
- Lower initial page load time
- Only visible images load on initial page render

### ❌ Failure Indicators  
- All images load at once on page load
- Network tab shows all image requests at the same timestamp
- No progressive loading during scroll
- All images load even for content below the fold

## Visual Test

### Before Lazy Loading
```
Network Timeline:
|███████████████████| All images load immediately
0s                  5s

Result: Slow initial load, wasted bandwidth
```

### After Lazy Loading
```
Network Timeline:
|██|  |█| |██|  |█| Progressive loading
0s  1s 2s 3s  4s 5s

Result: Fast initial load, efficient bandwidth usage
```

## Performance Metrics

### Measure with Lighthouse
1. Open DevTools → Lighthouse tab
2. Select "Performance" category
3. Click "Analyze page load"
4. Compare metrics:
   - **Largest Contentful Paint (LCP)**: Should be lower
   - **Speed Index**: Should improve
   - **Total Blocking Time**: Should be reduced

## Network Throttling Test

### Test on Slow Connection
1. DevTools → Network tab
2. Change throttling from "No throttling" to "Slow 3G"
3. Reload page
4. **Expected**: Initial visible images load, others wait until scroll

This simulates mobile users on slow connections and demonstrates the benefit of lazy loading.

## Browser Console Test

### Check IntersectionObserver
1. Open browser console
2. Type: `window.IntersectionObserver`
3. **Expected**: Should show the constructor function
4. This confirms the browser supports lazy loading

## Automated Test (Optional)

### Using Browser Console
```javascript
// Count total images
const totalImages = document.querySelectorAll('img').length;
console.log('Total images:', totalImages);

// Count loaded images
const loadedImages = Array.from(document.querySelectorAll('img'))
  .filter(img => img.complete && img.naturalHeight !== 0).length;
console.log('Loaded images:', loadedImages);

console.log('Percentage loaded:', (loadedImages / totalImages * 100).toFixed(1) + '%');
```

**Expected Result**: 
- On initial load: ~20-40% of images loaded (only visible ones)
- After scrolling to bottom: 100% of images loaded

## Mobile Testing

### Test on Mobile Device
1. Deploy PWA to production or use network sharing
2. Open on mobile device
3. Use mobile browser DevTools (Chrome Remote Debugging)
4. Observe lazy loading on actual mobile network
5. **Expected**: Even better performance improvement on mobile

## Summary

Lazy loading is working correctly when:
1. ✅ Images load progressively during scroll
2. ✅ Network requests are staggered
3. ✅ Initial page load is faster
4. ✅ Smooth blur-to-clear transitions
5. ✅ Only visible images load initially

## Troubleshooting

### If lazy loading doesn't work:
- Check browser supports IntersectionObserver
- Verify LazyImage component is imported correctly
- Check console for JavaScript errors
- Ensure images have proper src attributes
