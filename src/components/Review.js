import React from 'react';
import "../Styles/Review.css";

// Review Component
const Review = ({ name, date, feedback, rating }) => {
  return (
    <div className="review">
      <div className="review-header">
        <span className="review-author">{name}</span>
        <span className="review-date">{date}</span>
      </div>
      <div className="review-body">
        <p>{feedback}</p>
      </div>
      <div className="review-rating">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < rating ? "filled-star" : "empty-star"}>★</span>
        ))}
      </div>
    </div>
  );
};

// Review Section Component
const ReviewSection = () => {
  const reviews = [
    {
      name: 'xyz',
      date: '22 Jul',
      feedback: "I've been using this app for a while, and it has completely changed my gaming experience! The matchmaking system is great, helping me find players who match my skill level and interests. Whether I'm looking for casual teammates or competitive partners, this app always delivers.",
      rating: 5,
    },
    // Add more reviews as needed
  ];

  return (
    <div className="review-section">
      <h2>Reviews and Rating</h2>
      <div className=''>
      {reviews.map((review, index) => (
        <Review key={index} {...review} />
      ))}
      </div>

    </div>
  );
};

export default ReviewSection;
