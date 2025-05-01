
import React from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Policies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">سياسات الحجز والاستخدام</h1>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6">
                نرجو من جميع عملائنا الكرام الاطلاع على سياسات الحجز والاستخدام الخاصة بشاليهات الباعيش قبل إتمام عملية الحجز.
                هذه السياسات هي بمثابة عقد بين العميل والإدارة، وتهدف إلى ضمان تجربة إقامة مريحة وممتعة للجميع.
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="booking">
                  <AccordionTrigger className="text-xl font-bold">سياسة قبول الحجز</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <ul className="list-disc mr-6 space-y-2">
                      <li>يتم قبول الحجوزات بناءً على توفر الشاليه في الفترة المطلوبة.</li>
                      <li>يحتفظ الشاليه بحق رفض أي حجز دون إبداء الأسباب.</li>
                      <li>يتم تأكيد الحجز فقط بعد موافقة مسؤول المنصة وسداد المبلغ المطلوب.</li>
                      <li>الحد الأدنى للحجز هو ليلة واحدة.</li>
                      <li>قد يتم طلب مستندات هوية سارية عند تسجيل الوصول.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="payment">
                  <AccordionTrigger className="text-xl font-bold">سياسة الدفع</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <ul className="list-disc mr-6 space-y-2">
                      <li>يتطلب تأكيد الحجز دفع مقدم بنسبة 50% من إجمالي مبلغ الحجز.</li>
                      <li>يتم سداد المبلغ المتبقي عند تسجيل الوصول.</li>
                      <li>نقبل الدفع عبر البطاقات المصرفية، الدفع النقدي، أو التحويل المصرفي.</li>
                      <li>سيتم إرسال فاتورة إلكترونية عبر البريد الإلكتروني بعد إتمام الحجز.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cancellation">
                  <AccordionTrigger className="text-xl font-bold">سياسة الإلغاء</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <ul className="list-disc mr-6 space-y-2">
                      <li>يمكن إلغاء الحجز مع استرداد كامل المبلغ المدفوع قبل 7 أيام من موعد الوصول.</li>
                      <li>الإلغاء قبل 3-7 أيام من موعد الوصول يتم استرداد 50% من المبلغ المدفوع.</li>
                      <li>الإلغاء قبل أقل من 3 أيام من موعد الوصول لا يتم استرداد أي مبلغ.</li>
                      <li>في حالة عدم الحضور بدون إشعار مسبق، سيتم اعتبار الحجز ملغياً بدون استرداد.</li>
                      <li>يمكن تغيير تواريخ الحجز مجاناً قبل 7 أيام من موعد الوصول، حسب التوفر.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="refund">
                  <AccordionTrigger className="text-xl font-bold">سياسة الاسترجاع</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <ul className="list-disc mr-6 space-y-2">
                      <li>في حالة الإلغاء المؤهل لاسترداد المبلغ، سيتم إعادة المبلغ بنفس طريقة الدفع الأصلية.</li>
                      <li>تستغرق عملية استرداد المبلغ عادة 5-10 أيام عمل.</li>
                      <li>في حالة وجود مشاكل في الشاليه تمنع الإقامة، سيتم استرداد كامل المبلغ.</li>
                      <li>لا يتم استرداد المبلغ في حالة مغادرة العميل قبل انتهاء فترة الحجز.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="house-rules">
                  <AccordionTrigger className="text-xl font-bold">قواعد الاستخدام</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <ul className="list-disc mr-6 space-y-2">
                      <li>ساعة تسجيل الوصول: 3:00 مساءً، وساعة المغادرة: 12:00 ظهراً.</li>
                      <li>يمنع التدخين داخل الشاليه، ويسمح فقط في المناطق المخصصة.</li>
                      <li>غير مسموح باصطحاب الحيوانات الأليفة.</li>
                      <li>يجب المحافظة على نظافة المسبح والمرافق المشتركة.</li>
                      <li>ممنوع إقامة الحفلات الصاخبة أو إزعاج الآخرين.</li>
                      <li>أي أضرار تلحق بالشاليه أو محتوياته سيتم تحميلها على العميل.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="privacy">
                  <AccordionTrigger className="text-xl font-bold">سياسة الخصوصية</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <ul className="list-disc mr-6 space-y-2">
                      <li>نحن نحترم خصوصية عملائنا ونلتزم بحماية بياناتهم الشخصية.</li>
                      <li>يتم استخدام البيانات الشخصية فقط لأغراض الحجز والتواصل.</li>
                      <li>لن يتم مشاركة بيانات العملاء مع أي طرف ثالث دون موافقة مسبقة.</li>
                      <li>نحتفظ ببيانات الحجز لفترة محدودة وفقاً للقوانين المعمول بها.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="loyalty">
                  <AccordionTrigger className="text-xl font-bold">برنامج الولاء</AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    <ul className="list-disc mr-6 space-y-2">
                      <li>يحصل العملاء على خصم 0.5% على كل عملية حجز لاحقة باستخدام نفس رقم الهاتف.</li>
                      <li>يمكن تجميع الخصومات حتى حد أقصى 10% من قيمة الحجز.</li>
                      <li>الخصومات غير قابلة للتحويل لأشخاص آخرين.</li>
                      <li>تحتفظ الإدارة بحق تعديل أو إلغاء برنامج الولاء في أي وقت.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">إخلاء المسؤولية</h2>
              <p className="text-gray-700">
                بمجرد إتمام عملية الحجز، يعتبر العميل موافقاً على جميع الشروط والسياسات المذكورة أعلاه.
                تحتفظ إدارة شاليهات الباعيش بحق تعديل هذه السياسات في أي وقت دون إشعار مسبق.
                لا تتحمل الإدارة أي مسؤولية عن فقدان أو سرقة أو تلف الممتلكات الشخصية للنزلاء.
                استخدام المرافق والخدمات في الشاليهات يكون على مسؤولية النزلاء الشخصية.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Policies;
