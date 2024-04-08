import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons'; // Importação do ícone outlined

const StarRating = ({ rating }) => {
  const stars = [];
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FontAwesomeIcon icon={faStar} key={i} />);
  }

  if (hasHalfStar) {
    stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key={fullStars} />);
  }

  const remainingStars = maxStars - stars.length;
  for (let i = 0; i < remainingStars; i++) {
    stars.push(<FontAwesomeIcon icon={faStarOutline} key={i + fullStars + 1} className="empty-star" />);
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;