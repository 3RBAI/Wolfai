import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MoonStar, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <MoonStar className="h-8 w-8 text-primary" />
          <Link href="/" className="text-xl font-bold text-primary">
            الذئب الكوني
            <span className="text-sm font-normal text-muted-foreground"> Wolf AI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <Link href="/models" className="text-sm font-medium hover:text-primary transition-colors">
            النماذج
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            الأسعار
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
            التوثيق
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex">
            تسجيل الدخول
          </Button>
          <Button size="sm" className="hidden md:flex">
            إنشاء حساب
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/">الرئيسية</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/models">النماذج</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/pricing">الأسعار</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/docs">التوثيق</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login">تسجيل الدخول</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup">إنشاء حساب</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
