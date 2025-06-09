import { Brain, Key, Bot, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
  return (
    <section className="py-20 bg-muted/5 section-entrance">
      {" "}
      {/* Slightly adjusted background, added entrance animation */}
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl glow-text">المميزات الرئيسية</h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            اكتشف القدرات الفريدة التي يقدمها الذئب الكوني
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Apply .cosmic-element for transitions and .living-element for subtle breath animation */}
          <Card className="bg-card/80 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors cosmic-element living-element">
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>نماذج ذكاء متعددة</CardTitle>
              <CardDescription>وصول موحد إلى Llama-3 العربية، DeepSeek-V2، وGoogle Gemini</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                استفد من قوة نماذج متعددة من خلال واجهة واحدة سهلة الاستخدام، مع تخصص كل نموذج في مجالات مختلفة
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors cosmic-element living-element">
            <CardHeader>
              <Key className="h-10 w-10 text-primary mb-2" />
              <CardTitle>نظام المفاتيح الكمي</CardTitle>
              <CardDescription>مستويات متعددة تناسب احتياجاتك المختلفة</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                اختر بين المستوى المجري المجاني، الثقب الأسود للاستخدام المتوسط، أو الانفجار العظيم للاستخدام غير
                المحدود
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors cosmic-element living-element">
            <CardHeader>
              <Bot className="h-10 w-10 text-primary mb-2" />
              <CardTitle>بوت التلغرام</CardTitle>
              <CardDescription>تفاعل مع الذكاء الكوني من أي مكان</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                استخدم بوت التلغرام للوصول السريع إلى الذكاء الاصطناعي، مع أوامر متقدمة وتفعيل المفاتيح
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur border-primary/20 hover:border-primary/50 transition-colors cosmic-element living-element">
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>الأمان والخصوصية</CardTitle>
              <CardDescription>حماية متقدمة لبياناتك ومفاتيحك</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                تشفير المفاتيح باستخدام SHA-256، توقيع كوني فريد لكل مفتاح، ونظام محدود لمنع الإساءة
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
