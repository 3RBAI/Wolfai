"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Zap, MessageSquare, Code, Database, Shield, ArrowRight, Sparkles } from "lucide-react"

const features = [
  {
    id: "ai-models",
    icon: Brain,
    title: "7 نماذج ذكية متقدمة",
    description: "تكامل سلس مع أقوى نماذج الذكاء الاصطناعي",
    details: [
      "Llama 3.1 - العبقرية مفتوحة المصدر",
      "DeepSeek-R1 - الذكاء الرياضي المتقدم",
      "GPT-4o - القوة التجارية المثبتة",
      "Claude 3.5 - التفكير النقدي العميق",
      "Gemini Pro - البصيرة متعددة الأبعاد",
      "Groq - السرعة الكونية",
      "Perplexity - البحث الذكي المتقدم",
    ],
    color: "from-blue-500 to-cyan-500",
    stats: "99.7% دقة",
  },
  {
    id: "telegram-bot",
    icon: MessageSquare,
    title: "بوت التلغرام الكوني",
    description: "مساعدك الذكي المتاح 24/7 عبر تلغرام",
    details: [
      "فهم اللغة العربية الطبيعية",
      "إجابات فلسفية وتقنية عميقة",
      "تنفيذ أوامر البرمجة المتقدمة",
      "تكامل مع جميع النماذج",
      "واجهة محادثة ذكية",
      "حفظ السياق والذاكرة",
      "أوامر مخصصة للمطورين",
    ],
    color: "from-green-500 to-emerald-500",
    stats: "50K+ رسالة يومياً",
  },
  {
    id: "code-generation",
    icon: Code,
    title: "توليد الأكواد المتقدم",
    description: "إنشاء تطبيقات كاملة بأوامر طبيعية",
    details: [
      "دعم 20+ لغة برمجة",
      "إنشاء مشاريع كاملة",
      "أفضل الممارسات البرمجية",
      "تحسين الأداء التلقائي",
      "توثيق تلقائي للكود",
      "اختبارات وحدة تلقائية",
      "نشر سحابي مباشر",
    ],
    color: "from-purple-500 to-pink-500",
    stats: "1M+ سطر كود",
  },
  {
    id: "knowledge-base",
    icon: Database,
    title: "قاعدة المعرفة الكونية",
    description: "مكتبة معرفية شاملة ومحدثة باستمرار",
    details: [
      "معرفة تقنية متخصصة",
      "أحدث التطورات التكنولوجية",
      "مراجع علمية موثقة",
      "أمثلة عملية تطبيقية",
      "تحديث مستمر للمحتوى",
      "بحث دلالي متقدم",
      "ربط المفاهيم الذكي",
    ],
    color: "from-orange-500 to-red-500",
    stats: "10TB+ معرفة",
  },
  {
    id: "api-integration",
    icon: Zap,
    title: "واجهة برمجة متقدمة",
    description: "تكامل سهل مع تطبيقاتك ومشاريعك",
    details: [
      "REST API كاملة",
      "WebSocket للتفاعل المباشر",
      "SDK متعددة اللغات",
      "توثيق تفاعلي شامل",
      "معدل استجابة < 100ms",
      "حماية متقدمة ضد الإساءة",
      "مراقبة الأداء المباشرة",
    ],
    color: "from-yellow-500 to-orange-500",
    stats: "99.9% وقت تشغيل",
  },
  {
    id: "security",
    icon: Shield,
    title: "الأمان الكوني المتقدم",
    description: "حماية على مستوى المؤسسات الكبرى",
    details: [
      "تشفير end-to-end",
      "مصادقة متعددة العوامل",
      "مراجعة أمنية مستمرة",
      "امتثال GDPR و SOC2",
      "نسخ احتياطية مشفرة",
      "مراقبة التهديدات المباشرة",
      "استجابة سريعة للحوادث",
    ],
    color: "from-red-500 to-pink-500",
    stats: "صفر انتهاكات",
  },
]

export function EnhancedFeaturesSection() {
  const [activeFeature, setActiveFeature] = useState("ai-models")

  const currentFeature = features.find((f) => f.id === activeFeature) || features[0]

  return (
    <section id="features" className="py-20 relative">
      <div className="cosmic-grid">
        <div className="col-span-12 text-center mb-16">
          <Badge variant="outline" className="border-stellarGold/50 text-stellarGold bg-stellarGold/10 px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            قدرات متقدمة
          </Badge>

          <h2 className="cosmic-heading-lg stellar-glow mb-6">قوة الذكاء الكوني المتكاملة</h2>

          <p className="cosmic-body text-muted-foreground max-w-3xl mx-auto">
            اكتشف النظام الأكثر تقدماً في عالم الذكاء الاصطناعي، حيث تتحد 7 نماذج ذكية لتقديم تجربة لا مثيل لها في
            الإبداع والإنتاجية.
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="col-span-12 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Button
                  key={feature.id}
                  variant={activeFeature === feature.id ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300 ${
                    activeFeature === feature.id
                      ? "event-horizon-button"
                      : "border-stellarGold/30 hover:border-stellarGold/60 hover:bg-stellarGold/5"
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs text-center leading-tight">
                    {feature.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Feature Details */}
        <div className="col-span-12">
          <Card className="quantum-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Feature Info */}
              <CardHeader className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentFeature.color} flex items-center justify-center`}
                  >
                    <currentFeature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-stellarGold mb-2">{currentFeature.title}</CardTitle>
                    <Badge variant="outline" className="border-stellarGold/50 text-stellarGold">
                      {currentFeature.stats}
                    </Badge>
                  </div>
                </div>

                <p className="cosmic-body text-muted-foreground">{currentFeature.description}</p>

                <Button className="event-horizon-button group w-fit">
                  تجربة الآن
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardHeader>

              {/* Feature Details */}
              <CardContent className="p-8 bg-eventHorizon/30">
                <h4 className="text-lg font-semibold text-stellarGold mb-6">المميزات التفصيلية:</h4>
                <div className="space-y-3">
                  {currentFeature.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-cosmicVoid/30 border border-stellarGold/20 hover:border-stellarGold/40 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-stellarGold" />
                      <span className="text-sm text-foreground/90">{detail}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
