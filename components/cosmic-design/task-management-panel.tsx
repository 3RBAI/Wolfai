"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Task {
  id: string
  text: string
  checked: boolean
  category: "analysis" | "operations" | "processing" | "optimization" | "general"
  priority: "high" | "medium" | "low"
  createdAt: Date
}

const categories = [
  { id: "all", name: "الكل", color: "#D4AF37" },
  { id: "analysis", name: "التحليل", color: "#2D8CFF" },
  { id: "operations", name: "العمليات", color: "#8A2BE2" },
  { id: "processing", name: "المعالجة", color: "#10B981" },
  { id: "optimization", name: "التحسين", color: "#F59E0B" },
]

export function TaskManagementPanel() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "تحليل البيانات الكونية",
      checked: false,
      category: "analysis",
      priority: "high",
      createdAt: new Date(),
    },
    {
      id: "2",
      text: "تطوير واجهة المستخدم",
      checked: true,
      category: "operations",
      priority: "medium",
      createdAt: new Date(),
    },
    {
      id: "3",
      text: "معالجة النصوص والصور",
      checked: true,
      category: "processing",
      priority: "high",
      createdAt: new Date(),
    },
    {
      id: "4",
      text: "تحسين أداء النماذج",
      checked: false,
      category: "optimization",
      priority: "medium",
      createdAt: new Date(),
    },
    {
      id: "5",
      text: "إنشاء التوثيق التقني",
      checked: true,
      category: "operations",
      priority: "low",
      createdAt: new Date(),
    },
  ])

  const [newTask, setNewTask] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showCompleted, setShowCompleted] = useState(true)

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch = activeCategory === "all" || task.category === activeCategory
    const completedMatch = showCompleted || !task.checked
    return categoryMatch && completedMatch
  })

  const handleAddTask = () => {
    if (!newTask.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      checked: false,
      category: "general",
      priority: "medium",
      createdAt: new Date(),
    }

    setTasks([...tasks, task])
    setNewTask("")
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, checked: !task.checked } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const completedCount = tasks.filter((task) => task.checked).length
  const totalCount = tasks.length
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl p-6 border border-[#2D2D2D] shadow-2xl"
    >
      {/* رأس القسم */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#8A2BE2] rounded-full mr-3 animate-pulse"></div>
          <h2 className="text-2xl font-bold text-[#E6E6E6]">
            إدارة المهام <span className="text-[#8A2BE2]">الكونية</span>
          </h2>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm text-[#A0A0A0]">
            {completedCount}/{totalCount} مكتملة
          </span>
          <div className="w-16 h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* أزرار التصنيف */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${
                activeCategory === category.id
                  ? "text-black font-bold shadow-lg"
                  : "bg-[#1A1A1A] hover:bg-[#2D2D2D] text-[#A0A0A0] hover:text-[#E6E6E6] border border-[#2D2D2D]"
              }
            `}
            style={{
              backgroundColor: activeCategory === category.id ? category.color : undefined,
            }}
          >
            {category.name}
          </motion.button>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCompleted(!showCompleted)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center
            ${
              showCompleted
                ? "bg-[#2D8CFF] text-white"
                : "bg-[#1A1A1A] hover:bg-[#2D2D2D] text-[#A0A0A0] border border-[#2D2D2D]"
            }
          `}
        >
          <Filter className="w-4 h-4 ml-1" />
          {showCompleted ? "إخفاء المكتملة" : "إظهار المكتملة"}
        </motion.button>
      </div>

      {/* قائمة المهام */}
      <div className="space-y-3 mb-6 max-h-80 overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`
                flex items-center bg-[#0A0A0A] p-4 rounded-lg border border-[#2D2D2D] 
                hover:border-[#8A2BE2]/30 transition-all duration-300 group
                ${task.checked ? "opacity-75" : ""}
              `}
            >
              <Checkbox
                checked={task.checked}
                onCheckedChange={() => toggleTask(task.id)}
                className="ml-3 data-[state=checked]:bg-[#8A2BE2] data-[state=checked]:border-[#8A2BE2]"
              />

              <span
                className={`
                flex-1 transition-all duration-300
                ${task.checked ? "line-through text-[#A0A0A0]" : "text-[#E6E6E6] group-hover:text-[#8A2BE2]"}
              `}
              >
                {task.text}
              </span>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span
                  className={`
                  text-xs px-2 py-1 rounded-full border
                  ${
                    task.priority === "high"
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : task.priority === "medium"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-green-500/20 text-green-400 border-green-500/30"
                  }
                `}
                >
                  {task.priority === "high" ? "عالية" : task.priority === "medium" ? "متوسطة" : "منخفضة"}
                </span>

                <span className="text-xs px-2 py-1 bg-[#1A1A1A] rounded-full border border-[#2D2D2D] text-[#A0A0A0]">
                  {categories.find((cat) => cat.id === task.category)?.name || "عام"}
                </span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTask(task.id)}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <X className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* إضافة مهمة جديدة */}
      <div className="flex gap-3">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="أضف مهمة كونية جديدة... ✨"
          className="flex-1 bg-[#0A0A0A] border-[#2D2D2D] text-[#E6E6E6] placeholder:text-[#A0A0A0] focus:border-[#8A2BE2] transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask()
            }
          }}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleAddTask}
            disabled={!newTask.trim()}
            className="bg-gradient-to-r from-[#8A2BE2] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#8A2BE2] text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <Plus className="h-4 w-4 ml-1" />
            إضافة
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
