// src/components/recipe/RecipeDetail.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRecipe } from '../../hooks/useRecipes';
import { getDifficultyColor } from '../../utils/helpers';
import { ArrowLeft, Clock, Users, ChefHat, Star, Edit, Trash2 } from 'lucide-react';
import { useReviews, useCreateReview } from '../../hooks/useReviews';
import { useIsFavorited } from '../../hooks/useFavorites';
import { getUserIdentifier } from '../../hooks/useFavorites';
import { formatDate, getDifficultyColor } from '../../utils/helpers';
import { ArrowLeft, Clock, Users, ChefHat, Star, Send, Edit, Trash2, Share2 } from 'lucide-react';
import recipeService from '../../services/recipeService';
import ConfirmModal from '../modals/ConfirmModal';
import FavoriteButton from '../common/FavoriteButton';
import ReviewSection from './ReviewSection';

export default function RecipeDetail({ recipeId, onBack, onEdit, category = 'makanan' }) {
  const { recipe, loading: recipeLoading, error: recipeError } = useRecipe(recipeId);
  const { reviews, loading: reviewsLoading, refetch: refetchReviews } = useReviews(recipeId);
  const { createReview, loading: createLoading } = useCreateReview();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const categoryColors = {
    makanan: {
      primary: 'blue',
      gradient: 'from-blue-50 via-white to-indigo-50',
      text: 'text-blue-700',
      bg: 'bg-blue-100',
      border: 'border-blue-400',
      hover: 'hover:bg-blue-50',
      ring: 'ring-blue-500'
    },
    minuman: {
      primary: 'green',
      gradient: 'from-green-50 via-white to-cyan-50',
      text: 'text-green-700',
      bg: 'bg-green-100',
      border: 'border-green-400',
      hover: 'hover:bg-green-50',
      ring: 'ring-green-500'
    }
  };

  const colors = categoryColors[category] || categoryColors.makanan;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    // Get username from user profile
    const userProfile = userService.getUserProfile();
    
    const reviewData = {
      user_identifier: userProfile.username || getUserIdentifier(),
      rating,
      comment: comment.trim(),
    };

    const success = await createReview(recipeId, reviewData);
    
    if (success) {
      setComment('');
      setRating(5);
      setShowReviewForm(false);
      refetchReviews();
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      setDeleting(true);
      const result = await recipeService.deleteRecipe(recipeId);
      
      if (result.success) {
        alert('Resep berhasil dihapus!');
        setShowDeleteModal(false);
        if (onBack) {
          onBack();
        }
      } else {
        throw new Error(result.message || 'Gagal menghapus resep');
      }
    } catch (err) {
      console.error('Delete recipe error:', err);
      alert(err.message || 'Terjadi kesalahan saat menghapus resep');
    } finally {
      setDeleting(false);
    }
  };

  const handleShareRecipe = async () => {
    // Generate shareable URL
    const shareUrl = `${window.location.origin}${window.location.pathname}?recipeId=${recipeId}&category=${category}`;
    const shareData = {
      title: recipe.name,
      text: `Lihat resep ${recipe.name} di Resep Nusantara!`,
      url: shareUrl
    };

    try {
      // Try using Web Share API (works on mobile and some desktop browsers)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(shareUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 3000);
      }
    } catch (err) {
      // If share was cancelled or failed, try clipboard as fallback
      if (err.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 3000);
        } catch (clipboardErr) {
          console.error('Share error:', clipboardErr);
          alert('Gagal membagikan resep');
        }
      }
    }
  };

  if (recipeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-${colors.primary}-600 mx-auto`}></div>
          <p className="mt-4 text-slate-600">Memuat resep...</p>
        </div>
      </div>
    );
  }

  if (recipeError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-600 font-semibold mb-2">Terjadi Kesalahan</p>
            <p className="text-red-500 mb-4">{recipeError}</p>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600">Resep tidak ditemukan</p>
          <button
            onClick={onBack}
            className={`mt-4 px-4 py-2 bg-${colors.primary}-600 text-white rounded-lg hover:bg-${colors.primary}-700 transition-colors`}
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${colors.gradient} pb-20 md:pb-8`}>
      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteRecipe}
        title="Hapus Resep"
        message={`Apakah Anda yakin ingin menghapus resep "${recipe?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
        isLoading={deleting}
      />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* Share Button - Always visible */}
            <div className="relative">
              <button
                onClick={handleShareRecipe}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                title="Bagikan resep"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden md:inline">Bagikan</span>
              </button>
              {shareSuccess && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                  Link disalin!
                </div>
              )}
            </div>

            {/* Edit and Delete buttons - Only when onEdit is provided */}
            {onEdit && (
              <>
                <button
                  onClick={() => {
                    console.log('🖱️ Edit button clicked in RecipeDetail');
                    console.log('📝 Recipe ID:', recipeId);
                    console.log('🔧 onEdit function:', onEdit);
                    onEdit(recipeId);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden md:inline">Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden md:inline">Hapus</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Recipe Header */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-white/40 mb-8">
          {/* Hero Image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Favorite Button - Use component */}
            <div className="absolute top-4 right-4 z-10">
              <FavoriteButton recipeId={recipeId} size="lg" />
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4">
              <span className={`${colors.text} ${colors.bg} px-4 py-2 rounded-full text-sm font-semibold`}>
                {category === 'makanan' ? 'Makanan' : 'Minuman'}
              </span>
            </div>
          </div>

          {/* Recipe Info */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {recipe.name}
            </h1>
            
            {recipe.description && (
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {recipe.description}
              </p>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-white/60 text-center">
                <Clock className={`w-6 h-6 mx-auto mb-2 text-${colors.primary}-600`} />
                <p className="text-xs text-slate-500 mb-1">Persiapan</p>
                <p className="font-semibold text-slate-700">{recipe.prep_time}</p>
              </div>
              <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-white/60 text-center">
                <Clock className={`w-6 h-6 mx-auto mb-2 text-${colors.primary}-600`} />
                <p className="text-xs text-slate-500 mb-1">Memasak</p>
                <p className="font-semibold text-slate-700">{recipe.cook_time} menit</p>
              </div>
              <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-white/60 text-center">
                <Users className={`w-6 h-6 mx-auto mb-2 text-${colors.primary}-600`} />
                <p className="text-xs text-slate-500 mb-1">Porsi</p>
                <p className="font-semibold text-slate-700">{recipe.servings} orang</p>
              </div>
              <div className="bg-white/70 backdrop-blur p-4 rounded-xl border border-white/60 text-center">
                <ChefHat className={`w-6 h-6 mx-auto mb-2 text-${colors.primary}-600`} />
                <p className="text-xs text-slate-500 mb-1">Kesulitan</p>
                <p className={`font-semibold capitalize ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </p>
              </div>
            </div>

            {/* Rating */}
            {recipe.average_rating > 0 && (
              <div className="mt-6 flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(recipe.average_rating)
                          ? 'text-amber-500 fill-current'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-800">
                    {recipe.average_rating.toFixed(1)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {recipe.review_count} ulasan
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ingredients & Steps */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Ingredients */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/40">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-${colors.primary}-100 flex items-center justify-center`}>
                <span className={`text-${colors.primary}-600 text-xl`}>🥘</span>
              </div>
              Bahan-bahan
            </h2>
            <ul className="space-y-3">
              {recipe.ingredients?.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex items-start gap-3 bg-white/50 p-3 rounded-xl border border-white/60"
                >
                  <span className={`text-${colors.primary}-600 mt-1`}>•</span>
                  <div>
                    <p className="font-medium text-slate-700">{ingredient.name}</p>
                    <p className="text-sm text-slate-500">{ingredient.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/40">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-${colors.primary}-100 flex items-center justify-center`}>
                <span className={`text-${colors.primary}-600 text-xl`}>👨‍🍳</span>
              </div>
              Langkah-langkah
            </h2>
            <ol className="space-y-4">
              {recipe.steps?.map((step) => (
                <li
                  key={step.id}
                  className="flex gap-4 bg-white/50 p-4 rounded-xl border border-white/60"
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-${colors.primary}-600 text-white flex items-center justify-center font-bold text-sm`}>
                    {step.step_number}
                  </div>
                  <p className="text-slate-700 leading-relaxed pt-1">
                    {step.instruction}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection recipeId={recipeId} colors={colors} />
      </main>
    </div>
  );
}

RecipeDetail.propTypes = {
  recipeId: PropTypes.string.isRequired,
  onBack: PropTypes.func,
  onEdit: PropTypes.func,
  category: PropTypes.oneOf(['makanan', 'minuman']),
};

