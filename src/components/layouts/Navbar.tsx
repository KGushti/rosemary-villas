
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, User, Phone } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-blue-resort">شاليهات الباعيش</h1>
        </Link>
        
        {/* Mobile Menu Button */}
        {isMobile ? (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            className="md:hidden"
            aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        ) : (
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-resort transition-colors">
              الرئيسية
            </Link>
            <Link to="/chalets" className="text-gray-700 hover:text-blue-resort transition-colors">
              الشاليهات
            </Link>
            <Link to="/booking" className="text-gray-700 hover:text-blue-resort transition-colors">
              الحجز
            </Link>
            <Link to="/reviews" className="text-gray-700 hover:text-blue-resort transition-colors">
              آراء العملاء
            </Link>
            <Link to="/policies" className="text-gray-700 hover:text-blue-resort transition-colors">
              السياسات
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-resort transition-colors">
              اتصل بنا
            </Link>
            <Button className="bg-blue-resort hover:bg-blue-600 text-white">
              احجز الآن
            </Button>
          </div>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="md:hidden bg-white border-t py-3 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col gap-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-resort py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/chalets" 
              className="text-gray-700 hover:text-blue-resort py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              الشاليهات
            </Link>
            <Link 
              to="/booking" 
              className="text-gray-700 hover:text-blue-resort py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              الحجز
            </Link>
            <Link 
              to="/reviews" 
              className="text-gray-700 hover:text-blue-resort py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              آراء العملاء
            </Link>
            <Link 
              to="/policies" 
              className="text-gray-700 hover:text-blue-resort py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              السياسات
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-blue-resort py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              اتصل بنا
            </Link>
            <Button 
              className="bg-blue-resort hover:bg-blue-600 text-white mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              احجز الآن
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
