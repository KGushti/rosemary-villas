
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ChaletGallery from "@/components/chalets/ChaletGallery";
import ReviewCard from "@/components/chalets/ReviewCard";
import BookingForm from "@/components/booking/BookingForm";
import { chalets, reviews } from "@/data/chalets";
import { Check, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const ChaletDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const chalet = chalets.find((c) => c.id === id);
  const chaletReviews = reviews.filter((review) => review.chaletId === id);
  
  if (!chalet) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">الشاليه غير موجود</h1>
            <p className="text-gray-600">
              عذراً، الشاليه الذي تبحث عنه غير موجود.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Chalet Title and Rating */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{chalet.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(chalet.rating) ? 'text-orange-accent fill-orange-accent' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 mr-2">
                  {chalet.rating} ({chaletReviews.length} تقييم)
                </span>
              </div>
              <p className="text-gray-600">{chalet.location}</p>
            </div>
            <div className="mt-4 md:mt-0 bg-orange-accent/90 text-white py-2 px-4 rounded-lg text-lg font-bold">
              {chalet.price} د.ل / الليلة
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="mb-8">
            <ChaletGallery images={chalet.images} />
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chalet Details */}
            <div className="lg:col-span-2">
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">وصف الشاليه</h2>
                  <p className="text-gray-700 mb-6">{chalet.longDescription}</p>
                  
                  <h3 className="text-xl font-bold mb-4">المميزات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {chalet.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-blue-resort ml-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-bold mb-6">آراء العملاء</h2>
                
                {chaletReviews.length > 0 ? (
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
                ) : (
                  <p className="text-gray-600">لا توجد تقييمات لهذا الشاليه بعد.</p>
                )}
              </div>
            </div>
            
            {/* Booking Form */}
            <div className="lg:col-span-1">
              <BookingForm
                chaletId={chalet.id}
                chaletName={chalet.name}
                price={chalet.price}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChaletDetails;
