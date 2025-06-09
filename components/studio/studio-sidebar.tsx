"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FolderOpen,
  File,
  FileText,
  Code,
  ImageIcon,
  Plus,
  Search,
  ChevronRight,
  ChevronDown,
  Cloud,
} from "lucide-react"

interface FileItem {
  id: string
  name: string
  type: "folder" | "document" | "code" | "image"
  children?: FileItem[]
  isOpen?: boolean
}

const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "مشاريع الذكاء الاصطناعي",
    type: "folder",
    isOpen: true,
    children: [
      { id: "2", name: "تحليل البيانات.md", type: "document" },
      { id: "3", name: "نموذج التنبؤ.py", type: "code" },
      { id: "4", name: "واجهة المستخدم.tsx", type: "code" },
    ],
  },
  {
    id: "5",
    name: "الوثائق",
    type: "folder",
    children: [
      { id: "6", name: "دليل المستخدم.md", type: "document" },
      { id: "7", name: "API Documentation.md", type: "document" },
    ],
  },
  {
    id: "8",
    name: "الصور والموارد",
    type: "folder",
    children: [
      { id: "9", name: "logo.png", type: "image" },
      { id: "10", name: "screenshot.jpg", type: "image" },
    ],
  },
]

export function StudioSidebar() {
  const [files, setFiles] = useState<FileItem[]>(mockFiles)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFile, setActiveFile] = useState<string>("2")

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <FolderOpen className="h-4 w-4 text-blue-400" />
      case "document":
        return <FileText className="h-4 w-4 text-green-400" />
      case "code":
        return <Code className="h-4 w-4 text-yellow-400" />
      case "image":
        return <ImageIcon className="h-4 w-4 text-purple-400" />
      default:
        return <File className="h-4 w-4 text-gray-400" />
    }
  }

  const toggleFolder = (id: string) => {
    setFiles((prev) => prev.map((file) => (file.id === id ? { ...file, isOpen: !file.isOpen } : file)))
  }

  const renderFileTree = (items: FileItem[], depth = 0) => {
    return items.map((item) => (
      <div key={item.id}>
        <div
          className={`file-tree-item ${activeFile === item.id ? "active" : ""}`}
          style={{ paddingRight: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (item.type === "folder") {
              toggleFolder(item.id)
            } else {
              setActiveFile(item.id)
            }
          }}
        >
          {item.type === "folder" &&
            (item.isOpen ? <ChevronDown className="h-3 w-3 mr-1" /> : <ChevronRight className="h-3 w-3 mr-1" />)}
          {getFileIcon(item.type)}
          <span className="mr-2 text-sm truncate">{item.name}</span>
        </div>
        {item.type === "folder" && item.isOpen && item.children && (
          <div>{renderFileTree(item.children, depth + 1)}</div>
        )}
      </div>
    ))
  }

  return (
    <div className="studio-sidebar bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm">مستكشف الملفات</h3>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث في الملفات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pr-10 text-sm"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="file-tree p-2">{renderFileTree(files)}</div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <Button variant="outline" size="sm" className="w-full">
          <Cloud className="h-4 w-4 mr-2" />
          ربط Google Drive
        </Button>
      </div>
    </div>
  )
}
