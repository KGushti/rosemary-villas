
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import BookingCalendar from "./BookingCalendar";

// Schema for form validation
const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "الاسم الثلاثي يجب أن يحتوي على الأقل 3 أحرف.",
  }),
  phone: z.string().min(10, {
    message: "رقم الهاتف يجب أن يكون على الأقل 10 أرقام.",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح.",
  }),
  address: z.string().min(3, {
    message: "العنوان يجب أن يحتوي على الأقل 3 أحرف.",
  }),
  guestsCount: z.string().min(1, {
    message: "يرجى تحديد عدد الضيوف.",
  }),
  paymentMethod: z.string({
    required_error: "يرجى اختيار طريقة الدفع.",
  }),
  specialRequests: z.string().optional(),
  agreeToTerms: z.boolean().refine(value => value === true, {
    message: "يجب الموافقة على الشروط والأحكام للمتابعة.",
  }),
});

interface BookingFormProps {
  chaletId?: string;
  chaletName?: string;
  price?: {
    weekday: number;
    weekend: number;
  };
}

const BookingForm = ({ 
  chaletId = "", 
  chaletName = "فيلا", 
  price = {
    weekday: 950,
    weekend: 1000
  } 
}: BookingFormProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      guestsCount: "1",
      paymentMethod: "",
      specialRequests: "",
      agreeToTerms: false,
    },
  });
  
  // Function to check if a date is a weekend (Thursday or Friday)
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    // In Arabic calendar, Thursday is 4 and Friday is 5
    return day === 4 || day === 5;
  };
  
  // Calculate price based on weekday/weekend
  const calculateTotalPrice = (start: Date | undefined, end: Date | undefined) => {
    if (!start || !end) return 0;
    
    let total = 0;
    const currentDate = new Date(start);
    
    // Loop through each day and add appropriate price
    while (currentDate <= end) {
      if (isWeekend(currentDate)) {
        total += price.weekend;
      } else {
        total += price.weekday;
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return total;
  };
  
  // Handle date selection
  const handleDateSelection = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
    
    if (start && end) {
      const total = calculateTotalPrice(start, end);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!startDate || !endDate) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى اختيار تواريخ الحجز.",
        variant: "destructive",
      });
      return;
    }
    
    console.log({
      ...values,
      startDate,
      endDate,
      chaletId,
      totalPrice,
    });
    
    toast({
      title: "تم استلام طلب الحجز",
      description: "سيتم مراجعة طلبك والرد عليك في أقرب وقت.",
    });
  };

  // Calculate nights between two dates
  const calculateNights = (start: Date, end: Date): number => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">حجز {chaletName}</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">اختر تواريخ الإقامة</h3>
        <BookingCalendar 
          onSelectDates={handleDateSelection}
          bookedDates={[
            // هنا يمكن إضافة التواريخ المحجوزة
            new Date(2023, 7, 15),
            new Date(2023, 7, 16),
            new Date(2023, 7, 17),
          ]}
        />
      </div>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">تفاصيل الحجز</h3>
        <div className="flex justify-between mb-2">
          <span>سعر الليلة العادية:</span>
          <span>{price.weekday} د.ل</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>سعر ليلة الخميس والجمعة:</span>
          <span>{price.weekend} د.ل</span>
        </div>
        {startDate && endDate && (
          <div className="flex justify-between mb-2">
            <span>عدد الليالي:</span>
            <span>{calculateNights(startDate, endDate)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>المجموع:</span>
          <span>{totalPrice} د.ل</span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الثلاثي</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل اسمك الثلاثي" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل رقم هاتفك" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل بريدك الإلكتروني" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان السكن</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل عنوان سكنك" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="guestsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد الضيوف</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر عدد الضيوف" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>طريقة الدفع</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر طريقة الدفع" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="card">بطاقة مصرفية</SelectItem>
                    <SelectItem value="cash">دفع نقدي</SelectItem>
                    <SelectItem value="transfer">تحويل فوري</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>طلبات خاصة (اختياري)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="أي طلبات أو ملاحظات خاصة"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none mr-2">
                  <FormLabel>
                    أوافق على <a href="/policies" className="text-blue-resort hover:underline">الشروط والأحكام</a>
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full bg-blue-resort hover:bg-blue-600">
            تأكيد الحجز
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookingForm;
