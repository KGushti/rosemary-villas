
import React, { useState } from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { chalets, reviews } from "@/data/chalets";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

// Mock data for bookings
const initialBookings = [
  { 
    id: "1", 
    chaletId: "chalet-11", 
    chaletName: "فيلا 11",
    customerName: "محمد عبد الله", 
    phone: "0911234567", 
    email: "mohamed@example.com", 
    startDate: "2023-08-20", 
    endDate: "2023-08-22", 
    status: "pending",
    guestsCount: 4,
    totalPrice: 2000,
    paymentMethod: "cash",
    rejectionReason: "" 
  },
  { 
    id: "2", 
    chaletId: "chalet-22", 
    chaletName: "فيلا 22",
    customerName: "فاطمة محمد", 
    phone: "0921234567", 
    email: "fatima@example.com", 
    startDate: "2023-08-25", 
    endDate: "2023-08-27", 
    status: "pending",
    guestsCount: 6,
    totalPrice: 2850,
    paymentMethod: "transfer",
    rejectionReason: "" 
  },
  { 
    id: "3", 
    chaletId: "chalet-33", 
    chaletName: "فيلا 33",
    customerName: "أحمد محمود", 
    phone: "0931234567", 
    email: "ahmed@example.com", 
    startDate: "2023-09-01", 
    endDate: "2023-09-03", 
    status: "cancelled",
    guestsCount: 2,
    totalPrice: 2000,
    paymentMethod: "card",
    rejectionReason: "غرفة غير متاحة في هذا التاريخ" 
  }
];

// Mock data for customers
const customers = [
  { 
    id: "1", 
    name: "محمد عبد الله", 
    phone: "0911234567", 
    email: "mohamed@example.com", 
    bookingsCount: 3, 
    rating: 90 
  },
  { 
    id: "2", 
    name: "فاطمة محمد", 
    phone: "0921234567", 
    email: "fatima@example.com", 
    bookingsCount: 1, 
    rating: 85 
  },
  { 
    id: "3", 
    name: "أحمد محمود", 
    phone: "0931234567", 
    email: "ahmed@example.com", 
    bookingsCount: 2, 
    rating: 15 
  }
];

// Mock data for statistics
const statistics = {
  totalBookings: 35,
  confirmedBookings: 25,
  pendingBookings: 7,
  cancelledBookings: 3,
  totalRevenue: 32500,
  thisMonthRevenue: 5000,
  weekdayBookings: 22,
  weekendBookings: 13
};

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("all");
  const [customerRatingFilter, setCustomerRatingFilter] = useState("all");
  const [bookings, setBookings] = useState(initialBookings);
  const [editingChalet, setEditingChalet] = useState(null);
  const [chaletsList, setChaletsList] = useState(chalets);
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  // New state for rejection dialog
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);
  const [rejectionBookingId, setRejectionBookingId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [notifyCustomer, setNotifyCustomer] = useState(true);
  
  // Filter bookings based on status
  const filteredBookings = bookings.filter(booking => {
    if (bookingStatusFilter === "all") return true;
    return booking.status === bookingStatusFilter;
  });
  
  // Filter customers based on rating
  const filteredCustomers = customers.filter(customer => {
    if (customerRatingFilter === "all") return true;
    if (customerRatingFilter === "good") return customer.rating >= 50;
    return customer.rating < 50;
  });
  
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };
  
  // Handle booking confirmation
  const handleConfirmBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? {...booking, status: "confirmed"} : booking
    ));
    
    toast({
      title: "تم تأكيد الحجز",
      description: `تم تأكيد الحجز رقم ${bookingId} بنجاح`,
    });
  };
  
  // Open rejection dialog
  const handleOpenRejectionDialog = (bookingId) => {
    setRejectionBookingId(bookingId);
    setRejectionReason("");
    setNotifyCustomer(true);
    setShowRejectionDialog(true);
  };
  
  // Handle booking rejection/cancellation with reason
  const handleRejectBooking = () => {
    if (!rejectionBookingId) return;
    
    setBookings(bookings.map(booking => 
      booking.id === rejectionBookingId ? 
        {...booking, status: "cancelled", rejectionReason: rejectionReason} : 
        booking
    ));
    
    const notificationMessage = notifyCustomer 
      ? `تم إلغاء الحجز رقم ${rejectionBookingId} وإرسال سبب الإلغاء للعميل`
      : `تم إلغاء الحجز رقم ${rejectionBookingId} بدون إرسال سبب الإلغاء للعميل`;
    
    toast({
      title: "تم إلغاء الحجز",
      description: notificationMessage,
      variant: "destructive",
    });
    
    // Here you would typically send an email to the customer if notifyCustomer is true
    console.log(`Email notification to customer: ${notifyCustomer ? 'Yes, with reason' : 'Yes, without reason'}`);
    
    // Close the dialog
    setShowRejectionDialog(false);
    setRejectionBookingId(null);
  };
  
  // Handle viewing booking details
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };
  
  // Handle editing chalet
  const handleEditChalet = (chalet) => {
    setEditingChalet({...chalet});
  };
  
  // Handle saving chalet
  const handleSaveChalet = () => {
    setChaletsList(chaletsList.map(chalet => 
      chalet.id === editingChalet.id ? editingChalet : chalet
    ));
    
    toast({
      title: "تم تحديث بيانات الفيلا",
      description: `تم تحديث بيانات ${editingChalet.name} بنجاح`,
    });
    
    setEditingChalet(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard">الإحصائيات</TabsTrigger>
              <TabsTrigger value="bookings">الحجوزات</TabsTrigger>
              <TabsTrigger value="customers">العملاء</TabsTrigger>
              <TabsTrigger value="chalets">الفيلات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">إجمالي الحجوزات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statistics.totalBookings}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">الإيرادات الكلية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statistics.totalRevenue} د.ل</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">إيرادات الشهر الحالي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statistics.thisMonthRevenue} د.ل</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">الحجوزات المؤكدة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{statistics.confirmedBookings}</div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>توزيع الحجوزات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>حجوزات مؤكدة</span>
                        <span className="font-bold">{statistics.confirmedBookings}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>حجوزات قيد الانتظار</span>
                        <span className="font-bold">{statistics.pendingBookings}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>حجوزات ملغاة</span>
                        <span className="font-bold">{statistics.cancelledBookings}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full" 
                          style={{ width: `${(statistics.confirmedBookings / statistics.totalBookings) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>توزيع أيام الحجز</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>أيام الأسبوع</span>
                        <span className="font-bold">{statistics.weekdayBookings}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>عطلة نهاية الأسبوع</span>
                        <span className="font-bold">{statistics.weekendBookings}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full mt-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full" 
                          style={{ width: `${(statistics.weekdayBookings / (statistics.weekdayBookings + statistics.weekendBookings)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="bookings">
              <div className="bg-white rounded-lg shadow mb-6 p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button 
                    variant={bookingStatusFilter === "all" ? "default" : "outline"}
                    onClick={() => setBookingStatusFilter("all")}
                  >
                    الكل
                  </Button>
                  <Button 
                    variant={bookingStatusFilter === "confirmed" ? "default" : "outline"}
                    onClick={() => setBookingStatusFilter("confirmed")}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    مؤكدة
                  </Button>
                  <Button 
                    variant={bookingStatusFilter === "pending" ? "default" : "outline"}
                    onClick={() => setBookingStatusFilter("pending")}
                    className="bg-yellow-500 hover:bg-yellow-600"
                  >
                    قيد الانتظار
                  </Button>
                  <Button 
                    variant={bookingStatusFilter === "cancelled" ? "default" : "outline"}
                    onClick={() => setBookingStatusFilter("cancelled")}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    ملغاة
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>رقم الحجز</TableHead>
                        <TableHead>اسم الفيلا</TableHead>
                        <TableHead>اسم العميل</TableHead>
                        <TableHead>تاريخ الوصول</TableHead>
                        <TableHead>تاريخ المغادرة</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>عدد الضيوف</TableHead>
                        <TableHead>المجموع</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBookings.map(booking => (
                        <TableRow key={booking.id}>
                          <TableCell>{booking.id}</TableCell>
                          <TableCell>{booking.chaletName}</TableCell>
                          <TableCell>{booking.customerName}</TableCell>
                          <TableCell>{booking.startDate}</TableCell>
                          <TableCell>{booking.endDate}</TableCell>
                          <TableCell>
                            <Badge className={getStatusBadgeColor(booking.status)}>
                              {booking.status === "confirmed" ? "مؤكد" : 
                                booking.status === "pending" ? "قيد الانتظار" : "ملغي"}
                            </Badge>
                          </TableCell>
                          <TableCell>{booking.guestsCount}</TableCell>
                          <TableCell>{booking.totalPrice} د.ل</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleViewBooking(booking)}>عرض</Button>
                              {booking.status === "pending" && (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="bg-green-500 hover:bg-green-600"
                                    onClick={() => handleConfirmBooking(booking.id)}
                                  >
                                    تأكيد
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="destructive"
                                    onClick={() => handleOpenRejectionDialog(booking.id)}
                                  >
                                    رفض
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Booking Details Dialog */}
              <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>تفاصيل الحجز</DialogTitle>
                  </DialogHeader>
                  {selectedBooking && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>رقم الحجز</Label>
                          <div>{selectedBooking.id}</div>
                        </div>
                        <div>
                          <Label>اسم الفيلا</Label>
                          <div>{selectedBooking.chaletName}</div>
                        </div>
                      </div>
                      <div>
                        <Label>اسم العميل</Label>
                        <div>{selectedBooking.customerName}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>رقم الهاتف</Label>
                          <div>{selectedBooking.phone}</div>
                        </div>
                        <div>
                          <Label>البريد الإلكتروني</Label>
                          <div>{selectedBooking.email}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>تاريخ الوصول</Label>
                          <div>{selectedBooking.startDate}</div>
                        </div>
                        <div>
                          <Label>تاريخ المغادرة</Label>
                          <div>{selectedBooking.endDate}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>عدد الضيوف</Label>
                          <div>{selectedBooking.guestsCount}</div>
                        </div>
                        <div>
                          <Label>طريقة الدفع</Label>
                          <div>
                            {selectedBooking.paymentMethod === "cash" ? "نقدي" : 
                             selectedBooking.paymentMethod === "card" ? "بطاقة مصرفية" : "تحويل فوري"}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>المجموع</Label>
                        <div className="text-lg font-bold">{selectedBooking.totalPrice} د.ل</div>
                      </div>
                      <div>
                        <Label>الحالة</Label>
                        <Badge className={getStatusBadgeColor(selectedBooking.status)}>
                          {selectedBooking.status === "confirmed" ? "مؤكد" : 
                           selectedBooking.status === "pending" ? "قيد الانتظار" : "ملغي"}
                        </Badge>
                      </div>
                      
                      {selectedBooking.status === "cancelled" && selectedBooking.rejectionReason && (
                        <div>
                          <Label>سبب الإلغاء</Label>
                          <div className="p-2 bg-gray-50 rounded mt-1">{selectedBooking.rejectionReason}</div>
                        </div>
                      )}
                    </div>
                  )}
                  <DialogFooter>
                    <Button onClick={() => setShowBookingDetails(false)}>
                      إغلاق
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {/* Rejection Reason Dialog */}
              <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>إلغاء الحجز</DialogTitle>
                    <DialogDescription>
                      يرجى إدخال سبب إلغاء الحجز
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="rejection-reason">سبب الإلغاء</Label>
                      <Textarea 
                        id="rejection-reason"
                        placeholder="أدخل سبب إلغاء الحجز هنا..."
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox 
                        id="notify-customer" 
                        checked={notifyCustomer}
                        onCheckedChange={setNotifyCustomer}
                      />
                      <Label htmlFor="notify-customer">
                        إرسال سبب الإلغاء للعميل عبر البريد الإلكتروني
                      </Label>
                    </div>
                  </div>
                  
                  <DialogFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowRejectionDialog(false)}
                    >
                      إلغاء
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={handleRejectBooking}
                      disabled={!rejectionReason.trim()}
                    >
                      <X className="w-4 h-4 mr-2" /> تأكيد الإلغاء
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>
            
            <TabsContent value="customers">
              <div className="bg-white rounded-lg shadow mb-6 p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Button 
                    variant={customerRatingFilter === "all" ? "default" : "outline"}
                    onClick={() => setCustomerRatingFilter("all")}
                  >
                    الكل
                  </Button>
                  <Button 
                    variant={customerRatingFilter === "good" ? "default" : "outline"}
                    onClick={() => setCustomerRatingFilter("good")}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    تقييم جيد
                  </Button>
                  <Button 
                    variant={customerRatingFilter === "bad" ? "default" : "outline"}
                    onClick={() => setCustomerRatingFilter("bad")}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    تقييم سيء
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الرقم</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>رقم الهاتف</TableHead>
                        <TableHead>البريد الإلكتروني</TableHead>
                        <TableHead>عدد الحجوزات</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map(customer => (
                        <TableRow key={customer.id}>
                          <TableCell>{customer.id}</TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{customer.phone}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.bookingsCount}</TableCell>
                          <TableCell>
                            <Badge className={customer.rating >= 50 ? "bg-green-500" : "bg-red-500"}>
                              {customer.rating}%
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm">عرض الحجوزات</Button>
                              <Button size="sm">تقييم</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chalets">
              <div className="bg-white rounded-lg shadow mb-6 p-4">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الرقم</TableHead>
                        <TableHead>الاسم</TableHead>
                        <TableHead>سعر الليلة العادية</TableHead>
                        <TableHead>سعر ليلة الخميس والجمعة</TableHead>
                        <TableHead>التقييم</TableHead>
                        <TableHead>الحد الأقصى للضيوف</TableHead>
                        <TableHead>الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {chaletsList.map(chalet => (
                        <TableRow key={chalet.id}>
                          <TableCell>{chalet.id.replace("chalet-", "")}</TableCell>
                          <TableCell>{chalet.name}</TableCell>
                          <TableCell>{chalet.price.weekday} د.ل</TableCell>
                          <TableCell>{chalet.price.weekend} د.ل</TableCell>
                          <TableCell>{chalet.rating}</TableCell>
                          <TableCell>{chalet.maxGuests}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleEditChalet(chalet)}>تعديل</Button>
                              <Button size="sm">إدارة الصور</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Chalet Edit Dialog */}
              <Dialog open={!!editingChalet} onOpenChange={(open) => {
                if (!open) setEditingChalet(null);
              }}>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>تعديل بيانات الفيلا</DialogTitle>
                  </DialogHeader>
                  {editingChalet && (
                    <div className="space-y-4">
                      <div>
                        <Label>اسم الفيلا</Label>
                        <Input 
                          value={editingChalet.name} 
                          onChange={(e) => setEditingChalet({...editingChalet, name: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>سعر الليلة العادية</Label>
                          <Input 
                            type="number" 
                            value={editingChalet.price.weekday} 
                            onChange={(e) => setEditingChalet({
                              ...editingChalet, 
                              price: {...editingChalet.price, weekday: Number(e.target.value)}
                            })}
                          />
                        </div>
                        <div>
                          <Label>سعر ليلة الخميس والجمعة</Label>
                          <Input 
                            type="number" 
                            value={editingChalet.price.weekend} 
                            onChange={(e) => setEditingChalet({
                              ...editingChalet, 
                              price: {...editingChalet.price, weekend: Number(e.target.value)}
                            })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label>الوصف المختصر</Label>
                        <Input 
                          value={editingChalet.description} 
                          onChange={(e) => setEditingChalet({...editingChalet, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>الوصف المفصل</Label>
                        <Input 
                          value={editingChalet.longDescription} 
                          onChange={(e) => setEditingChalet({...editingChalet, longDescription: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>التقييم</Label>
                          <Input 
                            type="number" 
                            step="0.1" 
                            min="0" 
                            max="5"
                            value={editingChalet.rating} 
                            onChange={(e) => setEditingChalet({...editingChalet, rating: Number(e.target.value)})}
                          />
                        </div>
                        <div>
                          <Label>الحد الأقصى للضيوف</Label>
                          <Input 
                            type="number" 
                            value={editingChalet.maxGuests} 
                            onChange={(e) => setEditingChalet({...editingChalet, maxGuests: Number(e.target.value)})}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditingChalet(null)}>
                      إلغاء
                    </Button>
                    <Button onClick={handleSaveChalet}>
                      حفظ التغييرات
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
