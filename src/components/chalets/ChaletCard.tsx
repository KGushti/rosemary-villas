
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ChaletCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

const ChaletCard = ({ id, name, description, price, rating, image }: ChaletCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-[4/3] relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2 bg-orange-accent/90 text-white py-1 px-3 rounded-full text-sm font-bold">
          {price} د.ل / الليلة
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <div className="flex items-center bg-blue-50 px-2 py-0.5 rounded-md">
            <Star className="h-4 w-4 text-orange-accent fill-orange-accent" />
            <span className="text-sm font-medium mr-1">{rating}</span>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <Link to={`/chalets/${id}`}>
          <Button className="w-full bg-blue-resort hover:bg-blue-600">
            التفاصيل والحجز
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ChaletCard;
