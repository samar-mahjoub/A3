import { Star } from 'lucide-react';

export default function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-white/15'}
        />
      ))}
    </div>
  );
}
