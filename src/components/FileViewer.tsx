import { X } from "lucide-react";
import type { FileNode } from "./AgentFileTree";

interface FileViewerProps {
  file: FileNode;
  onClose: () => void;
}

export function FileViewer({ file, onClose }: FileViewerProps) {
  const Icon = file.icon;

  return (
    <div className="h-full flex flex-col border-l border-border bg-card">
      {/* Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Icon className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-xs font-medium tracking-tight text-foreground">{file.name}</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <pre className="text-xs leading-relaxed text-foreground whitespace-pre-wrap font-mono">
          {file.content || "// No content available"}
        </pre>
      </div>
    </div>
  );
}
