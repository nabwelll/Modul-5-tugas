import { useState } from 'react';
import PropTypes from 'prop-types';
import { useReviews, useCreateReview } from '../../hooks/useReviews';
import { getUserIdentifier } from '../../hooks/useFavorites';
import userService from '../../services/userService';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

export default function ReviewSection({ recipeId, colors }) {
  const { reviews, loading: reviewsLoading, refetch: refetchReviews } = useReviews(recipeId);
  const { createReview, loading: createLoading } = useCreateReview();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = async (rating, comment) => {
    // Get username from user profile
    const userProfile = userService.getUserProfile();
    
    const reviewData = {
      user_identifier: userProfile.username || getUserIdentifier(),
      rating,
      comment: comment.trim(),
    };

    const success = await createReview(recipeId, reviewData);
    
    if (success) {
      setShowReviewForm(false);
      refetchReviews();
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/40">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Ulasan ({reviews?.length || 0})
        </h2>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className={`px-4 py-2 bg-${colors.primary}-600 text-white rounded-xl hover:bg-${colors.primary}-700 transition-colors font-medium`}
        >
          {showReviewForm ? 'Batal' : 'Tulis Ulasan'}
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <ReviewForm 
          onSubmit={handleSubmitReview}
          loading={createLoading}
          colors={colors}
        />
      )}

      {/* Reviews List */}
      <ReviewList 
        reviews={reviews}
        loading={reviewsLoading}
        colors={colors}
      />
    </div>
  );
}

ReviewSection.propTypes = {
  recipeId: PropTypes.string.isRequired,
  colors: PropTypes.shape({
    primary: PropTypes.string,
  }).isRequired,
};
