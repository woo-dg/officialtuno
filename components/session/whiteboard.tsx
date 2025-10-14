"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Pencil, Eraser, Type, ImageIcon, Code, Undo, Redo, Download, Trash2, Circle } from "lucide-react"

export function Whiteboard() {
  const [tool, setTool] = useState<"pen" | "eraser" | "text" | "shape">("pen")
  const [color, setColor] = useState("#0891b2")

  const colors = ["#0891b2", "#000000", "#ef4444", "#22c55e", "#3b82f6", "#a855f7", "#f59e0b"]

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="border-b border-border bg-card p-3">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Drawing Tools */}
          <div className="flex items-center gap-1">
            <Button
              variant={tool === "pen" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTool("pen")}
              className="gap-2"
            >
              <Pencil className="h-4 w-4" />
              Pen
            </Button>
            <Button
              variant={tool === "eraser" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTool("eraser")}
              className="gap-2"
            >
              <Eraser className="h-4 w-4" />
              Eraser
            </Button>
            <Button
              variant={tool === "text" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTool("text")}
              className="gap-2"
            >
              <Type className="h-4 w-4" />
              Text
            </Button>
            <Button
              variant={tool === "shape" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTool("shape")}
              className="gap-2"
            >
              <Circle className="h-4 w-4" />
              Shape
            </Button>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Colors */}
          <div className="flex items-center gap-1.5">
            {colors.map((c) => (
              <button
                key={c}
                className={`h-7 w-7 rounded-md border-2 transition-all ${
                  color === c ? "border-foreground scale-110" : "border-border hover:scale-105"
                }`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Special Tools */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Code className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-white relative overflow-hidden">
        <canvas className="absolute inset-0 w-full h-full cursor-crosshair" />

        {/* Placeholder Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Card className="p-8 text-center max-w-md">
            <Pencil className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Interactive Whiteboard</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Draw, write equations with LaTeX, add code blocks, and collaborate in real-time.
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
              <span className="px-2 py-1 bg-muted rounded">LaTeX Support</span>
              <span className="px-2 py-1 bg-muted rounded">Code Blocks</span>
              <span className="px-2 py-1 bg-muted rounded">Image Upload</span>
              <span className="px-2 py-1 bg-muted rounded">Real-time Sync</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
