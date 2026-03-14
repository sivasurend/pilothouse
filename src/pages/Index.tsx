import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { MessageBus } from "@/components/MessageBus";
import { CaptainCard } from "@/components/CaptainCard";
import { CrewGrid } from "@/components/CrewGrid";
import { AgentFileTree, getAgentFileTree } from "@/components/AgentFileTree";
import { FileViewer } from "@/components/FileViewer";
import type { FileNode } from "@/components/AgentFileTree";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedAgentName, setSelectedAgentName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const handleNavClick = (id: string) => {
    setActiveView(id);
    setSelectedAgent(null);
    setSelectedAgentName("");
    setSelectedFile(null);
  };

  const handleAgentClick = (agentId: string, agentName: string) => {
    setActiveView("agent");
    setSelectedAgent(agentId);
    setSelectedAgentName(agentName);
    setSelectedFile(null);
  };

  const handleBackToDashboard = () => {
    setActiveView("dashboard");
    setSelectedAgent(null);
    setSelectedAgentName("");
    setSelectedFile(null);
  };

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar
        activeView={activeView}
        selectedAgent={selectedAgent}
        onNavClick={handleNavClick}
        onAgentClick={handleAgentClick}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <div className="flex flex-1 min-h-0">
          {activeView === "dashboard" && (
            <>
              <main className="flex-1 p-6 overflow-y-auto space-y-6">
                <CaptainCard />
                <CrewGrid />
              </main>
              <MessageBus />
            </>
          )}

          {activeView === "agent" && selectedAgent && (
            <>
              {/* File Tree - left half (or full if no file selected) */}
              <div className={`${selectedFile ? "w-1/2" : "flex-1"} flex flex-col overflow-hidden border-r border-border`}>
                <div className="h-12 flex items-center gap-3 px-4 border-b border-border shrink-0">
                  <button
                    onClick={handleBackToDashboard}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="size-4" strokeWidth={1.5} />
                  </button>
                  <div className="size-1.5 bg-foreground animate-pulse-slow" />
                  <span className="text-xs font-medium tracking-[0.05em] text-foreground">
                    {selectedAgentName}
                  </span>
                  <span className="text-[9px] text-muted-foreground tracking-[0.1em] border border-border px-2 py-0.5">
                    REPOSITORY
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="px-4 pt-4 pb-2">
                    <span className="text-[10px] tracking-[0.15em] text-muted-foreground">
                      📁 {selectedAgentName.toLowerCase().replace(/_/g, "-")}-agent/
                    </span>
                  </div>
                  <AgentFileTree
                    nodes={getAgentFileTree(selectedAgentName)}
                    onFileClick={(file) => setSelectedFile(file)}
                    selectedFile={selectedFile?.name || null}
                  />
                </div>
              </div>

              {/* File Viewer - right half */}
              {selectedFile && (
                <div className="w-1/2">
                  <FileViewer file={selectedFile} onClose={() => setSelectedFile(null)} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
