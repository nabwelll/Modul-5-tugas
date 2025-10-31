// src/pages/FavoritesPage.jsx
import { useState, useEffect } from 'react';
import { getFavorites, removeFavorite } from '../utils/favorites';
import { Clock, Star, ChefHat, Heart, AlertCircle } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [favoritesMap, setFavoritesMap] = useState({});

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favs = getFavorites();
    setFavorites(favs);
    
    // Create a map for quick lookup
    const map = {};
    favs.forEach(fav => {
      map[`${fav.id}-${fav.type}`] = true;
    });
    setFavoritesMap(map);
  };

  const handleRemoveFavorite = (recipe, event) => {
    event.stopPropagation();
    removeFavorite(recipe.id, recipe.type);
    loadFavorites(); // Reload favorites after removal
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <section>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
            Resep Favorit Saya
          </h1>
          <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
            Koleksi resep yang telah Anda tandai sebagai favorit. Klik ikon hati untuk menghapus dari favorit.
          </p>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-2">Belum ada resep favorit</p>
              <p className="text-slate-400 text-sm">Mulai tandai resep favorit Anda dari halaman Makanan atau Minuman</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              {favorites.map((recipe) => (
                <div 
                  key={`${recipe.id}-${recipe.type}`}
                  className="group transform transition-all duration-300 hover:scale-105"
                >
                  <div className={`relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl ${
                    recipe.type === 'makanan' 
                      ? 'shadow-blue-500/5 hover:shadow-blue-500/15' 
                      : 'shadow-green-500/5 hover:shadow-green-500/15'
                  } transition-all duration-500 cursor-pointer group-hover:bg-white/20`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-white/5 via-transparent ${
                      recipe.type === 'makanan' ? 'to-blue-500/5' : 'to-green-500/5'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative h-32 md:h-56 overflow-hidden">
                      <img 
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                      
                      {/* Favorite button */}
                      <button
                        onClick={(e) => handleRemoveFavorite(recipe, e)}
                        className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                        aria-label="Remove from favorites"
                      >
                        <Heart 
                          className="w-4 h-4 md:w-5 md:h-5 text-red-500 fill-red-500"
                        />
                      </button>
                    </div>
                    
                    <div className="relative z-10 p-4 md:p-8">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <span className={`text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full ${
                          recipe.type === 'makanan'
                            ? 'text-blue-700 bg-blue-100/90'
                            : 'text-green-700 bg-green-100/90'
                        }`}>
                          {recipe.type === 'makanan' ? 'Makanan' : 'Minuman'}
                        </span>
                        <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-current" />
                          <span className="text-xs md:text-sm font-semibold text-slate-700">
                            {recipe.type === 'makanan' ? '4.8' : '4.7'}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className={`font-bold text-slate-800 mb-3 md:mb-4 text-base md:text-xl transition-colors duration-200 line-clamp-2 ${
                        recipe.type === 'makanan' ? 'group-hover:text-blue-600' : 'group-hover:text-green-600'
                      }`}>
                        {recipe.name}
                      </h3>
                      
                      <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                        <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="font-medium">{recipe.ingredients?.length || 0} bahan</span>
                        </div>
                        <div className="flex items-center space-x-1 md:space-x-2 bg-white/70 px-2 md:px-3 py-1 md:py-2 rounded-full">
                          <ChefHat className="w-3 h-3 md:w-4 md:h-4" />
                          <span className="font-medium">{recipe.steps?.length || 0} langkah</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
