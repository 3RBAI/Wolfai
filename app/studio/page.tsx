"use client"

import { CosmicSidebar } from "@/components/cosmic-design/cosmic-sidebar"
import { AIAssistantPanel } from "@/components/cosmic-design/ai-assistant-panel"
import { TaskManagementPanel } from "@/components/cosmic-design/task-management-panel"
import { StatsAndModelsPanel } from "@/components/cosmic-design/stats-and-models-panel"
import { motion } from "framer-motion"

export default function StudioPage() {
  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#E6E6E6] overflow-hidden">
      {/* الشريط الجانبي */}
      <CosmicSidebar />

      {/* المحتوى الرئيسي */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* رأس الصفحة */}
          <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold mb-2">
              مركز القيادة <span className="text-[#D4AF37]">الكوني</span>
            </h1>
            <p className="text-[#A0A0A0] text-lg">نظام التحكم الشامل في الذكاء الاصطناعي المتكامل</p>
            <div className="mt-4 flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm text-[#A0A0A0]">جميع الأنظمة تعمل بكفاءة</span>
              </div>
              <div className="text-sm text-[#A0A0A0]">آخر تحديث: {new Date().toLocaleTimeString("ar-SA")}</div>
            </div>
          </motion.header>

          {/* الشبكة الرئيسية */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* العمود الأيسر - مساعد الذكاء وإدارة المهام */}
            <div className="lg:col-span-2 space-y-8">
              <AIAssistantPanel />
              <TaskManagementPanel />
            </div>

            {/* العمود الأيمن - الإحصائيات والنماذج */}
            <div className="lg:col-span-1">
              <StatsAndModelsPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
