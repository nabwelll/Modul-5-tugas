import PropTypes from 'prop-types';
import { Star } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

export default function ReviewList({ reviews, loading, colors }) {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-${colors.primary}-600 mx-auto`}></div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-slate-500">Belum ada ulasan untuk resep ini.</p>
        <p className="text-slate-400 text-sm mt-2">
          Jadilah yang pertama memberikan ulasan!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white/70 rounded-2xl p-6 border border-white/60"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-slate-800">
                {review.user_identifier}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= review.rating
                        ? 'text-amber-500 fill-current'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-sm text-slate-500">
              {formatDate(review.created_at)}
            </p>
          </div>
          {review.comment && (
            <p className="text-slate-700 leading-relaxed">
              {review.comment}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      user_identifier: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string,
      created_at: PropTypes.string.isRequired,
    })
  ),
  loading: PropTypes.bool,
  colors: PropTypes.shape({
    primary: PropTypes.string,
  }).isRequired,
};
