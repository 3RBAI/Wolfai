"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Save, Share2, Download, Settings, Users, Search, ChevronDown, MoonStar, Zap } from "lucide-react"

interface StudioHeaderProps {
  projectName: string
  collaborators: number
  onSave: () => void
  onShare: () => void
  onSearch: (query: string) => void
}

export function StudioHeader({ projectName, collaborators, onSave, onShare, onSearch }: StudioHeaderProps) {
  return (
    <div className="studio-header flex items-center justify-between px-4 bg-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <MoonStar className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">الذئب الكوني</span>
          <Badge variant="secondary" className="text-xs">
            <Zap className="h-3 w-3 mr-1" />
            Studio
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <Input placeholder={projectName} className="w-48 h-8 text-sm bg-background border-border" />
          <Badge variant="outline" className="text-xs">
            <Users className="h-3 w-3 mr-1" />
            {collaborators}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="بحث في المشروع..."
            className="w-64 h-8 pr-10 text-sm bg-background border-border"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <Button variant="ghost" size="sm" onClick={onSave}>
          <Save className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
              <ChevronDown className="h-3 w-3 mr-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              تصدير المشروع
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              إعدادات المشروع
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
