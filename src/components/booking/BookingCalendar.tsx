
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface BookingCalendarProps {
  onSelectDates: (startDate: Date | undefined, endDate: Date | undefined) => void;
  bookedDates?: Date[];
}

const BookingCalendar = ({ onSelectDates, bookedDates = [] }: BookingCalendarProps) => {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const handleSelect = (selectedDate: any) => {
    setDate(selectedDate);
    onSelectDates(selectedDate.from, selectedDate.to);
  };

  // Helper function to check if a date is booked
  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() && 
      bookedDate.getFullYear() === date.getFullYear()
    );
  };

  // Custom modifiers to mark booked dates
  const modifiers = {
    booked: (date: Date) => isDateBooked(date),
  };
  
  // Custom modifier styles
  const modifiersStyles = {
    booked: {
      backgroundColor: "#FEE2E2",
      color: "#EF4444",
      textDecoration: "line-through",
    },
  };

  return (
    <div className="flex flex-col">
      <div className="grid gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-right font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="ml-2 h-4 w-4" />
              {date.from ? (
                date.to ? (
                  <>
                    {format(date.from, "PPP", { locale: ar })} -{" "}
                    {format(date.to, "PPP", { locale: ar })}
                  </>
                ) : (
                  format(date.from, "PPP", { locale: ar })
                )
              ) : (
                <span>اختر تواريخ الحجز</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={new Date()}
              selected={date}
              onSelect={handleSelect}
              weekStartsOn={6} // Start week from Saturday
              disabled={(date) => {
                // Disable past dates
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || isDateBooked(date);
              }}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              locale={ar}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="mt-4 flex gap-3 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-resort rounded-sm ml-1"></div>
          <span>متاح</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-200 rounded-sm ml-1"></div>
          <span>محجوز</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-200 rounded-sm ml-1"></div>
          <span>المدة المختارة</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
