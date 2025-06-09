"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bold, Italic, List, ListOrdered, Code, Eye, Play, Download, Copy, FileText, Terminal } from "lucide-react"

export function WorkspacePanel() {
  const [activeTab, setActiveTab] = useState("document")
  const [documentContent, setDocumentContent] = useState(`# مشروع الذئب الكوني

## نظرة عامة
هذا مثال على وثيقة تعاونية يمكن تحريرها في الوقت الفعلي.

## المميزات
- تحرير تعاوني
- معاينة مباشرة
- دعم Markdown
- تكامل مع الذكاء الاصطناعي

## الخطوات التالية
1. إضافة المزيد من المحتوى
2. مراجعة النص
3. نشر الوثيقة`)

  const [codeContent, setCodeContent] = useState(`# مثال على كود Python
def analyze_data(data):
    """
    تحليل البيانات باستخدام الذكاء الاصطناعي
    """
    results = []
    
    for item in data:
        # معالجة كل عنصر
        processed = process_item(item)
        results.append(processed)
    
    return results

def process_item(item):
    """معالجة عنصر واحد"""
    return {
        'id': item.get('id'),
        'value': item.get('value', 0) * 2,
        'status': 'processed'
    }

# تشغيل التحليل
if __name__ == "__main__":
    sample_data = [
        {'id': 1, 'value': 10},
        {'id': 2, 'value': 20},
        {'id': 3, 'value': 30}
    ]
    
    results = analyze_data(sample_data)
    print("نتائج التحليل:", results)`)

  const formatText = (format: string) => {
    // In a real implementation, this would format the selected text
    console.log(`Formatting text with: ${format}`)
  }

  const runCode = () => {
    // In a real implementation, this would execute the code
    console.log("Running code...")
  }

  return (
    <div className="studio-workspace bg-background flex flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="toolbar">
          <TabsList className="h-8">
            <TabsTrigger value="document" className="text-xs">
              <FileText className="h-3 w-3 mr-1" />
              وثيقة
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs">
              <Code className="h-3 w-3 mr-1" />
              كود
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs">
              <Eye className="h-3 w-3 mr-1" />
              معاينة
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-1 mr-4">
            {activeTab === "document" && (
              <>
                <Button variant="ghost" size="sm" onClick={() => formatText("bold")}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => formatText("italic")}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => formatText("list")}>
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => formatText("ordered-list")}>
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </>
            )}

            {activeTab === "code" && (
              <>
                <Button variant="ghost" size="sm" onClick={runCode}>
                  <Play className="h-4 w-4" />
                  تشغيل
                </Button>
                <Badge variant="secondary" className="text-xs">
                  <Terminal className="h-3 w-3 mr-1" />
                  Python
                </Badge>
              </>
            )}

            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="document" className="flex-1 m-0">
          <Textarea
            value={documentContent}
            onChange={(e) => setDocumentContent(e.target.value)}
            className="h-full resize-none border-0 rounded-none font-arabic text-sm leading-relaxed"
            placeholder="ابدأ الكتابة..."
          />
        </TabsContent>

        <TabsContent value="code" className="flex-1 m-0">
          <Textarea
            value={codeContent}
            onChange={(e) => setCodeContent(e.target.value)}
            className="h-full resize-none border-0 rounded-none code-editor"
            placeholder="اكتب الكود هنا..."
          />
        </TabsContent>

        <TabsContent value="preview" className="flex-1 m-0 p-4">
          <div className="prose prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: documentContent
                  .replace(/\n/g, "<br>")
                  .replace(/^# (.*$)/gim, "<h1>$1</h1>")
                  .replace(/^## (.*$)/gim, "<h2>$1</h2>"),
              }}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>آخر حفظ: منذ دقيقتين</span>
          <div className="flex items-center gap-4">
            <span>الأسطر: {documentContent.split("\n").length}</span>
            <span>الكلمات: {documentContent.split(" ").length}</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>متصل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
