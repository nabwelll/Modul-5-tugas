# Fitur Review dan Rating Resep

## Deskripsi
Fitur review dan rating memungkinkan pengguna untuk memberikan ulasan dan penilaian terhadap resep. Ulasan yang diberikan akan ditampilkan di halaman detail resep sehingga pengguna lain dapat membaca pengalaman dan penilaian dari pengguna lain.

## Arsitektur

### 1. Service Layer (`src/services/reviewService.js`)
Service layer menangani komunikasi dengan backend API untuk operasi CRUD review:
- `getReviews(recipeId)` - Mendapatkan semua review untuk resep tertentu
- `createReview(recipeId, reviewData)` - Membuat review baru
- `updateReview(reviewId, reviewData)` - Update review yang ada
- `deleteReview(reviewId)` - Hapus review

### 2. Custom Hooks (`src/hooks/useReviews.js`)
Hook untuk mengelola state dan logic review:
- `useReviews(recipeId)` - Hook untuk fetch dan manage reviews
- `useCreateReview()` - Hook untuk create review

### 3. UI Components

#### ReviewSection (`src/components/recipe/ReviewSection.jsx`)
Komponen utama yang mengintegrasikan form dan list review.

#### ReviewForm (`src/components/recipe/ReviewForm.jsx`)
Form untuk menulis review baru dengan star rating dan komentar.

#### ReviewList (`src/components/recipe/ReviewList.jsx`)
Menampilkan daftar review yang ada dengan loading dan empty states.

## Cara Penggunaan

### Untuk User

#### Memberikan Review
1. Buka halaman detail resep
2. Scroll ke bagian "Ulasan"
3. Klik tombol "Tulis Ulasan"
4. Pilih rating (1-5 bintang) dengan mengklik bintang
5. Tulis komentar di textarea
6. Klik "Kirim Ulasan"

#### Melihat Review
- Semua review ditampilkan di section "Ulasan" pada halaman detail resep
- Setiap review menampilkan nama user, rating, tanggal, dan komentar

## Features Implemented
- ✅ Menulis review dengan rating dan komentar
- ✅ Melihat semua review untuk resep
- ✅ Display rating dengan bintang visual
- ✅ Show/hide form review
- ✅ Loading states
- ✅ Empty states
- ✅ Validasi input
- ✅ Responsive design
