import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { MessageBus } from "@/components/MessageBus";
import { CaptainCard } from "@/components/CaptainCard";
import { CrewGrid } from "@/components/CrewGrid";
import { AgentFileTree, getAgentFileTree } from "@/components/AgentFileTree";
import { FileViewer } from "@/components/FileViewer";
import { AddAgentDialog } from "@/components/AddAgentDialog";
import type { FileNode } from "@/components/AgentFileTree";
import type { Agent, NewAgentInput } from "@/types/agents";
import { ArrowLeft } from "lucide-react";

const initialAgents: Agent[] = [
  {
    id: "captain",
    name: "SERIES_B_FUNDRAISING",
    role: "captain",
    active: true,
    status: "active",
    tasks: 142,
  },
  { id: "team_01", name: "INVESTOR_RESEARCHER", role: "team", active: true, status: "active", tasks: 34 },
  { id: "team_02", name: "CAMPAIGN_PERSONALIZE", role: "team", active: true, status: "active", tasks: 58 },
  { id: "team_03", name: "STATUS_REPORTING", role: "team", active: false, status: "idle", tasks: 12 },
  { id: "team_04", name: "FOUNDER_TRAINING", role: "team", active: true, status: "active", tasks: 38 },
];

const defaultCaptain = initialAgents[0];

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [selectedAgentName, setSelectedAgentName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [addAgentOpen, setAddAgentOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);

  const captainAgent = agents.find((agent) => agent.role === "captain") ?? defaultCaptain;
  const teamAgents = agents.filter((agent) => agent.role === "team");

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
          {activeView === "dashboard" && (
            <>
              <main className="flex-1 p-6 overflow-y-auto space-y-6">
                <CaptainCard
                  captainName={captainAgent.name}
                  teamActive={teamAgents.filter((agent) => agent.active).length}
                  teamTotal={teamAgents.length}
                  onOpenFiles={() => handleAgentClick(captainAgent.id, captainAgent.name)}
                />
                <CrewGrid
                  agents={teamAgents}
                  onAgentClick={handleAgentClick}
                  onAddAgent={() => setAddAgentOpen(true)}
                />
              </main>
              <MessageBus />
            </>
          )}

          {activeView === "agent" && selectedAgent && (
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
