
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import BookingForm from "@/components/booking/BookingForm";

const Booking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-center">احجز فيلا روزماري</h1>
          
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Booking;
