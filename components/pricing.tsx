import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export function Pricing() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">المستويات الكونية</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            اختر المستوى المناسب لاحتياجاتك من الذكاء الاصطناعي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">المستوى المجري</CardTitle>
              <CardDescription>للمستخدمين الجدد والاستخدام الخفيف</CardDescription>
              <div className="mt-4 text-4xl font-bold">مجاني</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>100 طلب شهرياً</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>وصول إلى نموذج Llama-3 العربية</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>استخدام بوت التلغرام</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>دعم أساسي</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">احصل على مفتاح مجاني</Button>
            </CardFooter>
          </Card>

          <Card className="border-primary bg-gradient-to-b from-background to-muted relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium">
              الأكثر شعبية
            </div>
            <CardHeader>
              <CardTitle className="text-xl">الثقب الأسود</CardTitle>
              <CardDescription>للمستخدمين المحترفين والشركات الصغيرة</CardDescription>
              <div className="mt-4 text-4xl font-bold">
                $99<span className="text-sm font-normal text-muted-foreground">/شهرياً</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>5000 طلب شهرياً</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>وصول إلى جميع النماذج</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>استخدام بوت التلغرام المتقدم</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>دعم متميز</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>واجهة API كاملة</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full animate-pulse-gold">اشترك الآن</Button>
            </CardFooter>
          </Card>

          <Card className="border-primary/20 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-xl">الانفجار العظيم</CardTitle>
              <CardDescription>للشركات الكبيرة والاستخدام المكثف</CardDescription>
              <div className="mt-4 text-4xl font-bold">
                $999<span className="text-sm font-normal text-muted-foreground">/شهرياً</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>طلبات غير محدودة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>وصول أولوية إلى جميع النماذج</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>بوت تلغرام مخصص</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>دعم على مدار الساعة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>واجهة API متقدمة</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-primary mr-2" />
                  <span>تخصيص كامل</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                تواصل معنا
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
