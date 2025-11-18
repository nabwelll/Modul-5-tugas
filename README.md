# Resep Nusantara - Recipe Review App

Aplikasi web untuk menjelajahi dan berbagi resep masakan Nusantara dengan fitur review dan rating.

## Fitur Utama

### ✨ Fitur Review dan Rating Resep
Pengguna dapat memberikan ulasan dan rating (1-5 bintang) pada setiap resep. Fitur ini memungkinkan:
- 📝 Menulis review dengan rating bintang dan komentar
- 👀 Melihat review dari pengguna lain
- ⭐ Average rating ditampilkan di detail resep
- 📱 Responsive design untuk mobile dan desktop

**Dokumentasi lengkap**: [docs/REVIEW_FEATURE.md](./docs/REVIEW_FEATURE.md)

### Fitur Lainnya
- 🍲 Katalog resep makanan dan minuman Nusantara
- ❤️ Favorit resep
- ➕ Buat, edit, dan hapus resep
- 🔍 Pencarian dan filter resep
- 👤 Profil pengguna

## Teknologi

- **React 19** - UI Library
- **Vite 6** - Build tool dengan HMR
- **Tailwind CSS 4** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **PWA** - Progressive Web App support

## Instalasi

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Environment Variables

Buat file `.env` di root project:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Struktur Project

```
src/
├── components/
│   ├── recipe/
│   │   ├── RecipeDetail.jsx      # Detail resep
│   │   ├── ReviewSection.jsx     # Section review
│   │   ├── ReviewForm.jsx        # Form menulis review
│   │   └── ReviewList.jsx        # List review
│   ├── common/                   # Shared components
│   ├── navbar/                   # Navigation
│   └── modals/                   # Modal dialogs
├── hooks/
│   ├── useReviews.js             # Review hooks
│   └── useRecipes.js             # Recipe hooks
├── services/
│   ├── reviewService.js          # Review API service
│   └── recipeService.js          # Recipe API service
├── pages/                        # Page components
└── utils/                        # Utility functions
```

## Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## License

MIT License
