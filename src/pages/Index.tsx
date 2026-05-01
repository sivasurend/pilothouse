import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { HomeDashboard } from "@/components/HomeDashboard";
import { AgentFileTree, getAgentFileTree } from "@/components/AgentFileTree";
import { FileViewer } from "@/components/FileViewer";
import { AddAgentDialog } from "@/components/AddAgentDialog";
import type { FileNode } from "@/components/AgentFileTree";
import type { Agent, NewAgentInput } from "@/types/agents";
import { ArrowLeft } from "lucide-react";

const initialAgents: Agent[] = [
  {
    id: "captain",
    name: "HR_OFFICE_CAPTAIN",
    role: "captain",
    active: true,
    status: "active",
    tasks: 142,
  },
  { id: "team_01", name: "TALENT_PIPELINE", role: "team", active: true, status: "active", tasks: 34 },
  { id: "team_02", name: "PERFORMANCE_REVIEW", role: "team", active: true, status: "active", tasks: 58 },
  { id: "team_03", name: "COMPENSATION_ANALYSIS", role: "team", active: false, status: "idle", tasks: 12 },
  { id: "team_04", name: "WORKFORCE_PLANNING", role: "team", active: true, status: "active", tasks: 38 },
];

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedAgentName, setSelectedAgentName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [addAgentOpen, setAddAgentOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);

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

  const handleJourneyClick = (id: string) => {
    handleAgentClick(id, id.toUpperCase());
  };

  const handleBackToDashboard = () => {
    setActiveView("dashboard");
    setSelectedAgent(null);
    setSelectedAgentName("");
    setSelectedFile(null);
  };

  const handleCreateAgent = ({ name, role }: NewAgentInput) => {
    const newAgent: Agent = {
      id: `${role}_${Date.now()}`,
      name,
      role,
      active: true,
      status: "active",
      tasks: 0,
    };

    setAgents((prev) => {
      if (role === "captain") {
        return [newAgent, ...prev.filter((agent) => agent.role !== "captain")];
      }
      return [...prev, newAgent];
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar
        activeView={activeView}
        selectedAgent={selectedAgent}
        agents={agents}
        onNavClick={handleNavClick}
        onAgentClick={handleAgentClick}
      />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <TopBar />

        <div className="flex flex-1 overflow-hidden">
          {activeView === "agent" && selectedAgent ? (
            <>
              <div className={`${selectedFile ? "w-1/2" : "flex-1"} flex flex-col h-full overflow-hidden`}>
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

              {selectedFile && (
                <div className="w-1/2 h-full">
                  <FileViewer file={selectedFile} onClose={() => setSelectedFile(null)} />
                </div>
              )}
            </>
          ) : (
            <HomeDashboard onJourneyClick={handleJourneyClick} />
          )}
        </div>
      </div>

      <AddAgentDialog
        open={addAgentOpen}
        onOpenChange={setAddAgentOpen}
        onCreateAgent={handleCreateAgent}
      />
    </div>
  );
};

export default Index;
