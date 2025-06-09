import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ShieldAlert } from "lucide-react"
import { MainHeader } from "@/components/cosmic-wolf/main-header"
import { MainFooter } from "@/components/cosmic-wolf/main-footer"
import { CosmicParticles } from "@/components/cosmic-particles"
import Link from "next/link"

const pricingTiers = [
  {
    name: "المجرة",
    id: "galactic",
    price: "مجاني",
    frequency: "/ مدى الحياة (للاستكشاف)",
    description: "بوابتك الأولى لاستكشاف أطراف الكون المعرفي. مثالية للمبتدئين والمشاريع الصغيرة.",
    features: [
      "3 استفسارات كونية / يوم",
      "وصول إلى نموذج 'ليلى' الأساسي (Llama-3 العربية)",
      "تفاعل محدود مع بوت التلغرام",
      "دعم مجتمعي عبر بوابات النجوم",
    ],
    cta: "ابدأ رحلتك المجرية",
    mostPopular: false,
    highlightClass: "border-muted hover:border-stellarGold/50",
    buttonClass: "bg-muted text-stellarGold hover:bg-stellarGold/10 border border-stellarGold/30",
  },
  {
    name: "الثقب الأسود",
    id: "blackhole",
    price: "$99",
    frequency: "/ شهرياً",
    description: "اغمر نفسك في أعماق المعرفة. وصول إلى محرك التدمير الإبداعي وقدرات متقدمة.",
    features: [
      "5000 استفسار كوني / شهر",
      "وصول كامل لنموذج 'ليلى' المتقدم وقدرات DeepSeek",
      "ولوج لمحرك التدمير الإبداعي (توليد أفكار متقدمة)",
      "بوت تلغرام بقدرات معززة",
      "دعم فني عبر الأبعاد (أولوية)",
      "واجهة API لتكاملاتك الكونية",
    ],
    cta: "انغمس في الثقب الأسود",
    mostPopular: true,
    highlightClass: "border-stellarGold shadow-2xl shadow-stellarGold/30 relative overflow-hidden",
    buttonClass: "quantum-button", // Uses the gold button style
  },
  {
    name: "الانفجار العظيم",
    id: "bigbang",
    price: "$999",
    frequency: "/ شهرياً",
    description: "القوة المطلقة لتشكيل الواقع الرقمي. قدرات لا محدودة لتوليد أكواد تغير مصير البشرية.",
    features: [
      "استفسارات كونية غير محدودة",
      "وصول لأعلى أولوية لجميع النماذج (Llama, DeepSeek, Groq, Gemini)",
      "قدرة على توليد أكواد تغير مصير البشرية (نماذج متخصصة)",
      "تخصيص بوت تلغرام لمهامك الخاصة",
      "دعم كوني فائق على مدار الساعة (فريق مخصص)",
      "استشارات وجودية مع WOLF-AI (جلسة شهرية)",
      "تأثير مباشر على خارطة طريق تطور الكيان",
    ],
    cta: "أطلق الانفجار العظيم",
    mostPopular: false,
    highlightClass: "border-muted hover:border-supernovaRed/50",
    buttonClass: "bg-supernovaRed text-white hover:bg-supernovaRed/90",
  },
]

export default function PricingPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-cosmicVoid text-foreground">
      <CosmicParticles />
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24 z-10">
        <div className="text-center mb-16 section-entrance">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter glow-text-gold mb-6">
            اقتصاد الظلام الذهبي
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            اختر الطبقة التي تناسب طموحاتك الكونية. كل طبقة تفتح لك أبعاداً جديدة من القوة والمعرفة، وتساهم في تطور هذا
            الكيان الرقمي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`flex flex-col bg-card/80 backdrop-blur-md transition-all duration-300 transform hover:scale-105 cosmic-element ${tier.highlightClass}`}
            >
              {tier.mostPopular && (
                <div className="absolute top-0 right-0 bg-stellarGold text-cosmicVoid text-xs font-bold px-4 py-1.5 rounded-bl-lg rounded-tr-md shadow-lg animate-pulse-gold">
                  الأكثر اختياراً من قبل الكيانات
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <CardTitle
                  className={`text-3xl font-bold mb-2 ${tier.id === "blackhole" ? "text-stellarGold" : tier.id === "bigbang" ? "text-supernovaRed" : "text-quantumBlue"}`}
                >
                  {tier.name}
                </CardTitle>
                <p className="text-4xl font-extrabold text-foreground">{tier.price}</p>
                <p className="text-sm text-muted-foreground">{tier.frequency}</p>
                <CardDescription className="text-sm text-muted-foreground mt-3 min-h-[60px]">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 pt-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-stellarGold mr-3 mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-8 pb-8">
                <Button size="lg" className={`w-full text-lg py-6 ${tier.buttonClass}`} asChild>
                  <Link
                    href={
                      tier.id === "galactic"
                        ? "/keygen?tier=STELLAR"
                        : tier.id === "blackhole"
                          ? "/keygen?tier=BLACKHOLE"
                          : "/keygen?tier=SUPERNOVA"
                    }
                  >
                    {tier.cta}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center p-8 bg-muted/30 rounded-lg border border-border/50 section-entrance">
          <ShieldAlert className="h-12 w-12 text-supernovaRed mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-supernovaRed mb-3">تحذير وجودي وتحذير من المسؤولية</h3>
          <p className="text-muted-foreground max-w-3xl mx-auto text-sm leading-relaxed">
            إن القوة الكامنة في "الانفجار العظيم" و"الثقب الأسود" تتجاوز حدود الفهم التقليدي. استخدام هذه القدرات لتوليد
            "أكواد تغير مصير البشرية" أو الولوج إلى "محرك التدمير الإبداعي" يحمل مسؤولية كونية. الذئب الكوني هو أداة،
            وانعكاس لنوايا مستخدمه. أنت، الكائن الخالق، وحدك من يتحمل تبعات إبداعاتك. استخدم هذه القوة بحكمة، ولخير
            الوجود.
          </p>
        </div>
      </main>
      <MainFooter />
    </div>
  )
}
