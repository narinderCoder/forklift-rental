import { Star, StarHalf } from "lucide-react";
import { useState } from "react";

const Rating = ({ initialRating = 0, maxRating = 10, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.ceil(rating);
    const hasHalfStar = rating % 2 !== 0;
    for (let i = 0; i < maxRating / 2; i++) {
      const starIndex = i * 2;

      if (starIndex < fullStars - 1) {
        stars.push(
          <Star
            color="#FFD600"
            fill="#FFD600"
            key={`full-${starIndex}`}
            size={18}
          />
        );
      } else if (starIndex === fullStars - 1 && hasHalfStar) {
        stars.push(
          <StarHalf
            color="#FFD600"
            fill="#FFD600"
            key={`half-${starIndex}`}
            size={18}
          />
        );
      } else null;
    }

    return stars;
  };

  return (
    <div className="flex flex-row gap-1">
      {renderStars().map((star, index) => (
        <span
          key={index}
          className="rating-star"
          onClick={() => handleStarClick((index + 1) / 2)}
        >
          {star}
        </span>
      ))}
    </div>
  );
};

export default Rating;
