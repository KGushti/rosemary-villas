
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ChaletCard from "@/components/chalets/ChaletCard";
import { chalets } from "@/data/chalets";

const Chalets = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">الشاليهات المتاحة</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chalets.map((chalet) => (
              <ChaletCard
                key={chalet.id}
                id={chalet.id}
                name={chalet.name}
                description={chalet.description}
                price={chalet.price}
                rating={chalet.rating}
                image={chalet.images[0]}
              />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chalets;
