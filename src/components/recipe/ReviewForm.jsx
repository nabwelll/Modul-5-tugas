import { useState } from 'react';
import PropTypes from 'prop-types';
import { Star, Send } from 'lucide-react';

export default function ReviewForm({ onSubmit, loading, colors }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(rating, comment);
    // Reset form after successful submission
    setRating(5);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white/70 rounded-2xl p-6 border border-white/60">
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
              aria-label={`Rating ${star} bintang`}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating
                    ? 'text-amber-500 fill-current'
                    : 'text-slate-300'
                } hover:scale-110 transition-transform`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="review-comment" className="block text-sm font-medium text-slate-700 mb-2">
          Komentar
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bagikan pengalaman Anda dengan resep ini..."
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading || !comment.trim()}
        className={`w-full md:w-auto px-6 py-3 bg-${colors.primary}-600 text-white rounded-xl hover:bg-${colors.primary}-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
      >
        <Send className="w-4 h-4" />
        {loading ? 'Mengirim...' : 'Kirim Ulasan'}
      </button>
    </form>
  );
}

ReviewForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  colors: PropTypes.shape({
    primary: PropTypes.string,
  }).isRequired,
};
