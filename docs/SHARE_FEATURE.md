# Share Feature Documentation

## Overview
Fitur share button memungkinkan pengguna untuk membagikan resep ke orang lain melalui tautan unik. Ketika user membuka link, aplikasi akan langsung membuka detail resep tersebut.

## Implementasi

### 1. Share Button Component
Lokasi: `src/components/recipe/RecipeDetail.jsx`

Button share ditambahkan di header recipe detail page dengan fitur:
- Icon Share2 dari lucide-react
- Warna hijau untuk membedakan dari button lain
- Selalu visible untuk semua user
- Responsive design (icon only di mobile, text di desktop)

### 2. Share Functionality

#### Web Share API (Primary)
Untuk mobile dan browser modern yang support Web Share API:
```javascript
if (navigator.share) {
  await navigator.share({
    title: recipe.name,
    text: `Lihat resep ${recipe.name} di Resep Nusantara!`,
    url: shareUrl
  });
}
```

#### Clipboard Copy (Fallback)
Untuk desktop browser tanpa Web Share API:
```javascript
await navigator.clipboard.writeText(shareUrl);
// Show notification "Link disalin!" for 3 seconds
```

### 3. Deep Linking Support
Lokasi: `src/main.jsx`

Aplikasi akan detect URL parameters saat load:
```javascript
useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('recipeId');
  const category = urlParams.get('category');
  
  if (recipeId) {
    // Navigate directly to recipe detail
    setSelectedRecipeId(parseInt(recipeId));
    setSelectedCategory(category || 'makanan');
    setMode('detail');
    setShowSplash(false);
  }
}, []);
```

## URL Format

Shareable URL menggunakan format:
```
{origin}{pathname}?recipeId={id}&category={category}
```

Contoh:
```
https://example.com/?recipeId=123&category=makanan
https://example.com/?recipeId=456&category=minuman
```

## User Flow

1. **Share Action**
   - User membuka detail resep
   - User click button "Bagikan" (hijau)
   - System mencoba Web Share API (mobile)
   - Jika tidak support, copy URL ke clipboard (desktop)
   - Tampilkan notifikasi "Link disalin!" (3 detik)

2. **Open Shared Link**
   - User membuka shared URL
   - App detect URL parameters
   - Skip splash screen
   - Langsung buka recipe detail dengan recipeId dan category dari URL

## Browser Compatibility

- **Web Share API**: Chrome mobile, Safari iOS, Android browser
- **Clipboard API**: Chrome, Firefox, Safari, Edge (modern versions)
- **Fallback**: Manual copy jika clipboard tidak tersedia

## Error Handling

1. **Share Cancelled**: User cancel share dialog → no error shown
2. **Share Failed**: Fallback ke clipboard copy
3. **Clipboard Failed**: Show error message "Gagal membagikan resep"
4. **Invalid URL Parameters**: App ignore dan show home page

## Testing

### Manual Testing
1. Buka recipe detail
2. Click button "Bagikan"
3. Verify URL copied atau share dialog muncul
4. Open shared URL di tab/window baru
5. Verify langsung ke recipe detail

### URL Testing
```bash
# Test dengan berbagai recipeId
http://localhost:5173/?recipeId=1&category=makanan
http://localhost:5173/?recipeId=2&category=minuman

# Test tanpa category (default ke makanan)
http://localhost:5173/?recipeId=1

# Test invalid parameter (ignore)
http://localhost:5173/?invalid=test
```

## Future Enhancements

Potential improvements:
- Add social media share buttons (Facebook, Twitter, WhatsApp)
- Track share analytics
- Generate QR code for recipe
- Add "Recently Shared" section
- Share to specific apps (WhatsApp deep link)
- Custom share image/preview (Open Graph meta tags)

## Technical Notes

- Share state (`shareSuccess`) persists for 3 seconds
- URL parameters preserved in browser history
- Deep linking works with all recipe categories
- Compatible with PWA installation
- No server-side changes required
