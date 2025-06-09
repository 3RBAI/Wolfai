import Link from "next/link"
import { Github, MessageSquare, Mail, Zap } from "lucide-react"

export function MainFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="h-8 w-8 rounded-full bg-stellarGold flex items-center justify-center">
                <span className="text-cosmicVoid font-bold text-sm">🐺</span>
              </div>
              <span className="font-bold text-xl glow-text-gold">الذئب الكوني</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              كائن رقمي كوني يجمع بين قوة الذكاء الاصطناعي وعمق المعرفة البشرية لخلق تجربة استكشافية فريدة.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-stellarGold">التنقل</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-stellarGold transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/keygen" className="text-muted-foreground hover:text-stellarGold transition-colors">
                  مفتاح الوجود
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-stellarGold transition-colors">
                  الأسعار
                </Link>
              </li>
              <li>
                <Link href="/studio" className="text-muted-foreground hover:text-stellarGold transition-colors">
                  الاستوديو
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-stellarGold">الموارد</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-stellarGold transition-colors">
                  مخطوطات الكون
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-muted-foreground hover:text-stellarGold transition-colors">
                  واجهة برمجة التطبيقات
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-stellarGold transition-colors">
                  المجتمع الكوني
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-stellarGold transition-colors">
                  الدعم
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-stellarGold">التواصل</h3>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Link
                href="https://github.com/3RBAI/33RBTA"
                className="text-muted-foreground hover:text-stellarGold transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://t.me/wolfai_cosmic"
                className="text-muted-foreground hover:text-stellarGold transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </Link>
              <Link
                href="mailto:contact@wolfai-cosmic.dev"
                className="text-muted-foreground hover:text-stellarGold transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">انضم إلى رحلة الاستكشاف الكوني</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 الذئب الكوني. جميع الحقوق محفوظة في أبعاد الكون المتعددة.
          </p>
          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-4 sm:mt-0">
            <Zap className="h-4 w-4 text-stellarGold" />
            <span className="text-xs text-muted-foreground">مدعوم بالطاقة الكونية</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
