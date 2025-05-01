
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">شاليهات الباعيش</h2>
            <p className="text-gray-300 mb-4">
              استمتع بإقامة مميزة في أجمل شاليهات تاجوراء بمدينة طرابلس
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-resort" />
                <span>+218-XX-XXXXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-resort" />
                <span>info@baaesh-resorts.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-resort" />
                <span>منطقة الباعيش، تاجوراء، طرابلس، ليبيا</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-resort transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/chalets" className="text-gray-300 hover:text-blue-resort transition-colors">
                  الشاليهات
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-blue-resort transition-colors">
                  الحجز
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-300 hover:text-blue-resort transition-colors">
                  آراء العملاء
                </Link>
              </li>
              <li>
                <Link to="/policies" className="text-gray-300 hover:text-blue-resort transition-colors">
                  سياسات الإستخدام
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-resort transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">تابعنا</h3>
            <p className="text-gray-300 mb-4">
              تابع صفحاتنا على مواقع التواصل الاجتماعي للحصول على أحدث العروض والأخبار
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-blue-resort/20 hover:bg-blue-resort/30 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="bg-blue-resort/20 hover:bg-blue-resort/30 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="bg-blue-resort/20 hover:bg-blue-resort/30 p-2 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>جميع الحقوق محفوظة © {new Date().getFullYear()} - شاليهات الباعيش</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
