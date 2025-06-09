"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, MessageCircle, Zap, Brain } from "lucide-react"

interface ChatGPTIntegrationProps {
  className?: string
}

export function ChatGPTIntegration({ className }: ChatGPTIntegrationProps) {
  const [isHovered, setIsHovered] = useState(false)

  const openChatGPT = () => {
    window.open("https://chat.openai.com", "_blank", "noopener,noreferrer")
  }

  return (
    <Card className={`cosmic-card border-[#2D2D2D] bg-[#1A1A1A] ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center text-[#E6E6E6]">
          <Brain className="w-6 h-6 text-[#10A37F] mr-2" />
          تكامل ChatGPT
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-[#A0A0A0] text-sm">انتقل مباشرة إلى ChatGPT للحصول على مساعدة إضافية من OpenAI</div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Button
            onClick={openChatGPT}
            className="w-full bg-gradient-to-r from-[#10A37F] to-[#0D8B6B] hover:from-[#0D8B6B] hover:to-[#10A37F] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-[#10A37F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142-.0852 4.783-2.7582a.7712.7712 0 0 0 .7806 0l5.8428 3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142.0852-4.7735 2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="font-bold">فتح ChatGPT</div>
                <div className="text-sm opacity-80">OpenAI Assistant</div>
              </div>
            </div>
            <motion.div animate={{ x: isHovered ? 5 : 0 }} transition={{ duration: 0.2 }}>
              <ExternalLink className="w-5 h-5" />
            </motion.div>
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#2D2D2D] flex items-center">
            <MessageCircle className="w-4 h-4 text-[#10A37F] mr-2" />
            <span className="text-sm text-[#A0A0A0]">محادثة ذكية</span>
          </div>
          <div className="bg-[#0A0A0A] p-3 rounded-lg border border-[#2D2D2D] flex items-center">
            <Zap className="w-4 h-4 text-[#D4AF37] mr-2" />
            <span className="text-sm text-[#A0A0A0]">استجابة سريعة</span>
          </div>
        </div>

        <div className="text-xs text-[#666] mt-3 p-2 bg-[#0A0A0A] rounded border border-[#2D2D2D]">
          💡 <strong>نصيحة:</strong> استخدم ChatGPT للحصول على وجهات نظر إضافية ومقارنة الإجابات مع نماذج الذكاء
          الاصطناعي الأخرى في منصة الذئب الكوني.
        </div>
      </CardContent>
    </Card>
  )
}
