import Link from "next/link"
import { MoonStar } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <MoonStar className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-primary">الذئب الكوني</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              بوابة الذكاء الاصطناعي المتقدمة التي تجمع بين التصميم الكوني الفريد والتكنولوجيا المتطورة. وصول موحد إلى
              نماذج الذكاء الاصطناعي المتعددة مع نظام مفاتيح كمي متقدم وبوت تلغرام تفاعلي.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/models" className="text-muted-foreground hover:text-primary transition-colors">
                  النماذج
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  الأسعار
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors">
                  التوثيق
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="mailto:support@33rbta.ai"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  البريد الإلكتروني
                </Link>
              </li>
              <li>
                <Link
                  href="https://t.me/CosmicWolfBot"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  التلغرام
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/3RBAI/33RBTA"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>© 2024 الذئب الكوني - Wolf AI Portal | مدعوم بواسطة 33RBTA</p>
        </div>
      </div>
    </footer>
  )
}
