
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 py-16">
          <h1 className="text-6xl font-bold text-blue-resort mb-4">404</h1>
          <h2 className="text-3xl font-bold mb-6">الصفحة غير موجودة</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو قد تم نقلها.
          </p>
          <Link to="/">
            <Button className="bg-blue-resort hover:bg-blue-600">
              العودة للرئيسية
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
