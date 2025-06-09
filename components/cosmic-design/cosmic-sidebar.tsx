"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Rocket,
  Key,
  Gem,
  Bot,
  BarChart3,
  Settings,
  FolderOpen,
  MessageCircle,
  Github,
  Globe,
  ChevronRight,
} from "lucide-react"

const navigationItems = [
  { icon: Rocket, text: "لوحة التحكم", href: "/studio", active: true },
  { icon: Key, text: "مفاتيح الوجود", href: "/keygen" },
  { icon: Gem, text: "الاشتراكات", href: "/pricing" },
  { icon: Bot, text: "النماذج الذكية", href: "/models" },
  { icon: BarChart3, text: "التحليلات", href: "/analytics" },
  { icon: Settings, text: "الإعدادات", href: "/settings" },
]

const integrations = [
  { icon: FolderOpen, text: "Google Drive", status: "connected" },
  { icon: MessageCircle, text: "Telegram", status: "connected" },
  { icon: Github, text: "GitHub", status: "connected" },
  { icon: Globe, text: "Vercel", status: "connected" },
]

export function CosmicSidebar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-80 h-screen bg-[#0A0A0A] border-r border-[#1F1F1F] p-6 overflow-y-auto"
    >
      {/* الشعار والعنوان */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center mb-10"
      >
        <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <span className="text-2xl">🐺</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#E6E6E6]">
            الذئب <span className="text-[#D4AF37]">الكوني</span>
          </h1>
          <p className="text-xs text-[#A0A0A0]">مركز القيادة الكوني</p>
        </div>
      </motion.div>

      {/* التنقل الكوني */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 text-[#A0A0A0] flex items-center">
          <span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-2"></span>
          التنقل الكوني
        </h2>
        <nav className="space-y-2">
          {navigationItems.map((item, index) => (
            <motion.a
              key={item.text}
              href={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredItem(item.text)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`
                flex items-center py-3 px-4 rounded-xl transition-all duration-300 group
                ${
                  item.active
                    ? "bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] text-[#D4AF37] border border-[#D4AF37]/20"
                    : "hover:bg-[#1A1A1A] text-[#E6E6E6] hover:text-[#D4AF37]"
                }
              `}
            >
              <item.icon
                className={`w-5 h-5 mr-3 transition-colors ${item.active ? "text-[#D4AF37]" : "group-hover:text-[#D4AF37]"}`}
              />
              <span className="flex-1">{item.text}</span>
              {hoveredItem === item.text && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </motion.div>
              )}
            </motion.a>
          ))}
        </nav>
      </div>

      {/* التكاملات الكونية */}
      <div className="pt-8 border-t border-[#2D2D2D]">
        <h2 className="text-lg font-semibold mb-4 text-[#A0A0A0] flex items-center">
          <span className="w-2 h-2 bg-[#8A2BE2] rounded-full mr-2"></span>
          التكاملات الكونية
        </h2>
        <div className="space-y-3">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center justify-between bg-[#1A1A1A] p-3 rounded-xl border border-[#2D2D2D] hover:border-[#8A2BE2]/30 transition-all duration-300 group"
            >
              <div className="flex items-center">
                <integration.icon className="w-5 h-5 mr-3 text-[#A0A0A0] group-hover:text-[#8A2BE2] transition-colors" />
                <span className="text-[#E6E6E6] group-hover:text-[#8A2BE2] transition-colors">{integration.text}</span>
              </div>
              <motion.div
                className="w-3 h-3 rounded-full bg-[#2D8CFF] shadow-lg"
                animate={{
                  boxShadow: ["0 0 5px #2D8CFF", "0 0 15px #2D8CFF", "0 0 5px #2D8CFF"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 p-4 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl border border-[#2D2D2D]"
      >
        <h3 className="text-sm font-semibold text-[#A0A0A0] mb-3">الحالة الكونية</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#A0A0A0]">النماذج النشطة</span>
            <span className="text-sm font-bold text-[#D4AF37]">6/6</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#A0A0A0]">الاستعلامات اليوم</span>
            <span className="text-sm font-bold text-[#2D8CFF]">1,247</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#A0A0A0]">وقت الاستجابة</span>
            <span className="text-sm font-bold text-[#8A2BE2]">0.8s</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
