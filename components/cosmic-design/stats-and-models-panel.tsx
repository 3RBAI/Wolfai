"use client"

import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { AIModelsGrid } from "./ai-models-grid"
import { BarChart3, TrendingUp, Zap, Clock } from "lucide-react"

const stats = [
  {
    label: "التقدم العام",
    value: 72,
    color: "#2D8CFF",
    icon: BarChart3,
    trend: "+12%",
  },
  {
    label: "جودة البيانات",
    value: 88,
    color: "#8A2BE2",
    icon: TrendingUp,
    trend: "+5%",
  },
  {
    label: "كفاءة النماذج",
    value: 94,
    color: "#10B981",
    icon: Zap,
    trend: "+8%",
  },
  {
    label: "سرعة الاستجابة",
    value: 96,
    color: "#F59E0B",
    icon: Clock,
    trend: "+15%",
  },
]

export function StatsAndModelsPanel() {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-6"
    >
      {/* لوحة الإحصائيات */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl p-6 border border-[#2D2D2D] shadow-2xl">
        <div className="flex items-center mb-6">
          <div className="w-3 h-3 bg-[#2D8CFF] rounded-full mr-3 animate-pulse"></div>
          <h3 className="text-2xl font-bold text-[#E6E6E6]">
            الإحصائيات <span className="text-[#2D8CFF]">الحيوية</span>
          </h3>
        </div>

        <div className="space-y-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="group"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <stat.icon className="w-5 h-5 mr-2" style={{ color: stat.color }} />
                  <span className="text-[#E6E6E6] font-medium">{stat.label}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm text-green-400 font-semibold">{stat.trend}</span>
                  <span className="font-bold text-lg" style={{ color: stat.color }}>
                    {stat.value}%
                  </span>
                </div>
              </div>

              <div className="relative">
                <Progress value={stat.value} className="h-3 bg-[#0A0A0A] border border-[#2D2D2D]" />
                <motion.div
                  className="absolute top-0 left-0 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${stat.color}40, ${stat.color})`,
                    width: `${stat.value}%`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.value}%` }}
                  transition={{ duration: 1.5, delay: 0.8 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ملخص سريع */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-6 p-4 bg-[#0A0A0A] rounded-lg border border-[#2D2D2D]"
        >
          <h4 className="text-sm font-semibold text-[#A0A0A0] mb-2">ملخص الأداء</h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex justify-between">
              <span className="text-[#A0A0A0]">المهام المكتملة</span>
              <span className="text-[#D4AF37] font-bold">24/30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A0A0A0]">وقت التشغيل</span>
              <span className="text-[#2D8CFF] font-bold">99.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A0A0A0]">الاستعلامات اليوم</span>
              <span className="text-[#8A2BE2] font-bold">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#A0A0A0]">متوسط الاستجابة</span>
              <span className="text-[#10B981] font-bold">0.8s</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* لوحة النماذج المتكاملة */}
      <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl p-6 border border-[#2D2D2D] shadow-2xl">
        <div className="flex items-center mb-6">
          <div className="w-3 h-3 bg-[#D4AF37] rounded-full mr-3 animate-pulse"></div>
          <h3 className="text-2xl font-bold text-[#E6E6E6]">
            النماذج <span className="text-[#D4AF37]">المتكاملة</span>
          </h3>
        </div>

        <AIModelsGrid />

        {/* معلومات إضافية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-6 p-4 bg-[#0A0A0A] rounded-lg border border-[#2D2D2D]"
        >
          <h4 className="text-sm font-semibold text-[#A0A0A0] mb-3">حالة النماذج</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A0A0A0]">النماذج النشطة</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                <span className="text-green-400 font-bold">6/6</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A0A0A0]">متوسط زمن الاستجابة</span>
              <span className="text-[#2D8CFF] font-bold">0.8s</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A0A0A0]">معدل النجاح</span>
              <span className="text-[#10B981] font-bold">99.2%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
