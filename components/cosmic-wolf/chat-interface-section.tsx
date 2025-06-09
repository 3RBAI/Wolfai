import { ChatInterface } from "@/components/chat-interface"

export function ChatInterfaceSection() {
  return (
    <section className="py-20 md:py-32 bg-background/50 section-entrance">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl glow-text-gold">
            صدى الكون - تفاعل مع الذكاء الكوني
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            استخدم مفتاحك للتفاعل مع نماذج الذكاء الاصطناعي المتقدمة واستكشف أعماق المعرفة الكونية
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <ChatInterface />
        </div>
      </div>
    </section>
  )
}
