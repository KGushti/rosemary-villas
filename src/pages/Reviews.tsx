
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ReviewCard from "@/components/chalets/ReviewCard";
import { chalets, reviews } from "@/data/chalets";
import { Link } from 'react-router-dom';

const Reviews = () => {
  // Group reviews by chaletId
  const reviewsByChalet = reviews.reduce((acc, review) => {
    if (!acc[review.chaletId]) {
      acc[review.chaletId] = [];
    }
    acc[review.chaletId].push(review);
    return acc;
  }, {} as Record<string, typeof reviews>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">آراء وتقييمات العملاء</h1>
          
          {Object.entries(reviewsByChalet).map(([chaletId, chaletReviews]) => {
            const chalet = chalets.find((c) => c.id === chaletId);
            if (!chalet) return null;
            
            return (
              <div key={chaletId} className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{chalet.name}</h2>
                  <Link to={`/chalets/${chaletId}`} className="text-blue-resort hover:underline">
                    عرض الشاليه
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {chaletReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      name={review.name}
                      rating={review.rating}
                      comment={review.comment}
                      date={review.date}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reviews;
