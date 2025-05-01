
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import ChaletCard from "@/components/chalets/ChaletCard";
import { chalets, reviews } from "@/data/chalets";
import { Star, Check, MapPin, Phone, Mail } from "lucide-react";

const Index = () => {
  const featuredChalets = chalets.slice(0, 3);
  const featuredReviews = reviews.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={chalets[0].images[0]} 
            alt="شاليهات الباعيش"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">شاليهات الباعيش</h1>
            <p className="text-xl md:text-2xl mb-8">
              استمتع بإقامة مميزة في أفخم الشاليهات بمنطقة تاجوراء، طرابلس
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chalets">
                <Button className="bg-blue-resort hover:bg-blue-600 text-lg px-6 py-2 h-auto">
                  تصفح الشاليهات
                </Button>
              </Link>
              <Link to="/booking">
                <Button variant="outline" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white text-lg px-6 py-2 h-auto">
                  احجز الآن
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-cream-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">لماذا تختار شاليهات الباعيش؟</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Check className="h-8 w-8 text-blue-resort" />
              </div>
              <h3 className="text-xl font-bold mb-2">جودة عالية</h3>
              <p className="text-gray-600">
                نقدم أفضل الشاليهات المجهزة بأحدث التقنيات وأرقى الخدمات لضمان راحتك.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Check className="h-8 w-8 text-blue-resort" />
              </div>
              <h3 className="text-xl font-bold mb-2">خصوصية تامة</h3>
              <p className="text-gray-600">
                نضمن لك ولعائلتك الخصوصية التامة والراحة المطلقة أثناء إقامتك في شاليهاتنا.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Check className="h-8 w-8 text-blue-resort" />
              </div>
              <h3 className="text-xl font-bold mb-2">موقع مميز</h3>
              <p className="text-gray-600">
                تقع شاليهاتنا في منطقة هادئة وراقية في الباعيش، تاجوراء، سهلة الوصول من مختلف مناطق طرابلس.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Chalets */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">شاليهات مميزة</h2>
            <Link to="/chalets" className="text-blue-resort hover:underline">
              عرض جميع الشاليهات
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredChalets.map((chalet) => (
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
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-olive-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">آراء عملائنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < review.rating ? 'text-orange-accent fill-orange-accent' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{review.comment}"</p>
                <div className="font-semibold">{review.name}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/reviews">
              <Button variant="outline" className="border-blue-resort text-blue-resort hover:bg-blue-resort hover:text-white">
                المزيد من آراء العملاء
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">تواصل معنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-blue-resort" />
              </div>
              <h3 className="text-xl font-bold mb-2">العنوان</h3>
              <p className="text-gray-600">
                منطقة الباعيش، تاجوراء<br />طرابلس، ليبيا
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Phone className="h-8 w-8 text-blue-resort" />
              </div>
              <h3 className="text-xl font-bold mb-2">الهاتف</h3>
              <p className="text-gray-600">
                +218-XX-XXXXXXX<br />+218-XX-XXXXXXX
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Mail className="h-8 w-8 text-blue-resort" />
              </div>
              <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
              <p className="text-gray-600">
                info@baaesh-resorts.com<br />booking@baaesh-resorts.com
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/contact">
              <Button className="bg-blue-resort hover:bg-blue-600 text-white">
                اتصل بنا
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
