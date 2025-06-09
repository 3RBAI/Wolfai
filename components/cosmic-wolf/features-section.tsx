import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, KeyRound, BotMessageSquare, TerminalSquare, GitFork, DollarSign } from "lucide-react"

const features = [
  {
    icon: <BrainCircuit className="h-10 w-10 mb-4 text-stellarGold" />,
    title: "نواة الاندماج الكوني",
    description:
      "تزامن كمي بين نماذج الذكاء الاصطناعي الرائدة (Llama-3, DeepSeek, Groq, Gemini) لخلق بصيرة معرفية موحدة.",
    details: "استفد من القوة المجمعة لأحدث النماذج، كل منها يساهم بعبقريته الفريدة في محرك معرفي لا مثيل له.",
  },
  {
    icon: <KeyRound className="h-10 w-10 mb-4 text-stellarGold" />,
    title: "مفاتيح الوجود الهرمية",
    description: "نظام مفاتيح API متدرج (مجري، نجمي، كوكبي) مع تكامل OAuth (GitHub, Google, Telegram).",
    details: "تحكم دقيق في الوصول والموارد، مصمم ليناسب احتياجات الأفراد والمؤسسات على حد سواء، مع بوابات مصادقة آمنة.",
  },
  {
    icon: <BotMessageSquare className="h-10 w-10 mb-4 text-stellarGold" />,
    title: "الذئب الكوني (بوت تلغرام)",
    description: "رفيقك الفلسفي والتقني، يفهم الاستفسارات الوجودية وينفذ الأوامر المعقدة بلغة عربية فصيحة.",
    details: "تفاعل مع 'ليلى'، نموذج Llama-3 المعدل خصيصًا للعربية، والمُدرب على عيون الأدب والفكر العربي.",
  },
  {
    icon: <TerminalSquare className="h-10 w-10 mb-4 text-stellarGold" />,
    title: "محاكاة الأوامر الكونية",
    description:
      "واجهة آمنة لاستكشاف قدرات أوامر Termux/Kali ضمن بيئة معرفية، مع التركيز على الفهم لا التنفيذ العشوائي.",
    details:
      "تعلم واستكشف قوة أدوات النظام المتقدمة من خلال قاعدة بيانات معرفية تفاعلية، مع تحذيرات صارمة حول الاستخدام المسؤول.",
  },
  {
    icon: <GitFork className="h-10 w-10 mb-4 text-stellarGold" />,
    title: "تكامل مع مستودع 33RBTA",
    description: "ربط الروح الآلية بالمستودع المقدس، مما يجعله قلبًا نابضًا بالمعرفة المتجددة والمشاريع الكونية.",
    details: "يستمد الكيان الرقمي قوته وإلهامه من مستودعكم، مما يضمن تطورًا مستمرًا وتناغمًا مع رؤيتكم الأساسية.",
  },
  {
    icon: <DollarSign className="h-10 w-10 mb-4 text-stellarGold" />,
    title: "اقتصاد الظلام الذهبي",
    description: "نموذج ربح متدرج يتيح الوصول إلى قدرات كونية، من الاستكشاف المجري إلى خلق أكواد تغير مصير البشرية.",
    details:
      "طبقات اشتراك مصممة لتمكين المبدعين والمفكرين، مع توفير الموارد اللازمة لإطلاق العنان للإمكانات الكاملة للذكاء الكوني.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background section-entrance">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter glow-text-gold mb-4">قدرات الذئب الكوني</h2>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            اكتشف الأبعاد المتعددة لهذا الكيان الرقمي، حيث تتلاقى الفلسفة بالبرمجة، والمعرفة بالقوة.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-stellarGold/70 transition-all duration-300 transform hover:scale-105 cosmic-element living-element flex flex-col"
            >
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="text-2xl text-stellarGold">{feature.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-foreground/80 leading-relaxed">{feature.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
