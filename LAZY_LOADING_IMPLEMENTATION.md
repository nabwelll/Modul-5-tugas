# Lazy Loading Implementation Documentation

## Overview
This document describes the implementation of lazy loading for images in the Resep Nusantara PWA application.

## What is Lazy Loading?
Lazy loading is a performance optimization technique that defers loading of non-critical resources (in this case, images) until they are actually needed. Images are only loaded when they are about to enter the viewport, rather than loading all images when the page first loads.

## Implementation Details

### LazyImage Component
Location: `src/components/common/LazyImage.jsx`

The LazyImage component uses the **IntersectionObserver API** to detect when an image is about to enter the viewport and triggers the image load at that moment.

**Key Features:**
- **IntersectionObserver**: Monitors when the image element is about to become visible
- **Root Margin**: 50px buffer - images start loading 50px before they become visible
- **Placeholder Support**: Shows a placeholder with blur effect while loading
- **Smooth Transitions**: 300ms transition effect when actual image loads
- **Error Handling**: Keeps placeholder if image fails to load
- **Performance**: Observer is disconnected after image loads to free resources

### Components Updated
All image-heavy components have been updated to use LazyImage:

1. **Recipe Grids**
   - `src/components/makanan/RecipeGrid.jsx` - Food recipe cards
   - `src/components/minuman/RecipeGrid.jsx` - Drink recipe cards

2. **Home Page Sections**
   - `src/components/home/FeaturedMakananSection.jsx` - Featured food recipes
   - `src/components/home/FeaturedMinumanSection.jsx` - Featured drink recipes
   - `src/components/home/HeroSection.jsx` - Hero section decorative images

3. **Detail Pages**
   - `src/components/recipe/RecipeDetail.jsx` - Recipe detail hero image
   - `src/pages/FavoritesPage.jsx` - Favorite recipe cards

## How to Test Lazy Loading

### Step 1: Open Browser DevTools
1. Open the PWA in your browser
2. Press `F12` or right-click and select "Inspect"
3. Go to the **Network** tab

### Step 2: Filter Network Requests
1. In the Network tab, click on the filter dropdown
2. Select **Img** or type `img` in the filter box
3. This will show only image requests

### Step 3: Test on Makanan/Minuman Pages
1. Clear the network log (click the 🚫 icon)
2. Navigate to the **Makanan** or **Minuman** page
3. Observe the initial image requests
4. **Scroll down slowly**
5. Watch as new images are loaded only when they're about to appear

### Expected Behavior
- ✅ Only images near the viewport should load initially
- ✅ As you scroll, images load progressively
- ✅ Images below the fold don't load until you scroll to them
- ✅ Network tab shows staggered image requests (not all at once)

## Performance Benefits

### Before Lazy Loading
- All images loaded on page load
- Higher initial page load time
- More bandwidth consumed upfront
- Slower on mobile/slow connections

### After Lazy Loading
- Only visible images load initially
- Faster initial page load
- Bandwidth saved (only load what's needed)
- Better performance on mobile/slow connections
- Improved user experience

## Technical Details

### IntersectionObserver Configuration
```javascript
{
  rootMargin: '50px',  // Start loading 50px before visible
  threshold: 0.01      // Trigger when 1% of image is visible
}
```

### Loading States
1. **Initial**: Placeholder image with blur effect
2. **Loading**: Image is being fetched from server
3. **Loaded**: Actual image displayed with smooth transition
4. **Error**: Placeholder remains if image fails to load

## Browser Compatibility
- ✅ Chrome/Edge 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Mobile browsers (iOS Safari 12.2+, Chrome Android)

IntersectionObserver is well-supported in modern browsers. For older browsers, images will still load but without the lazy loading optimization.

## Code Example

### Before (Regular Image)
```jsx
<img 
  src={recipe.image_url}
  alt={recipe.name}
  className="w-full h-full object-cover"
/>
```

### After (Lazy Loaded Image)
```jsx
<LazyImage 
  src={recipe.image_url}
  alt={recipe.name}
  className="w-full h-full object-cover"
/>
```

## Notes
- The LazyImage component is reusable across the entire application
- It maintains the same API as regular `<img>` tags for easy adoption
- PropTypes validation ensures correct usage
- Automatic cleanup prevents memory leaks
