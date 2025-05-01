
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const ReviewCard = ({ name, rating, comment, date }: ReviewCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-3">
          <div className="font-semibold">{name}</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'text-orange-accent fill-orange-accent' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-gray-600">{comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
