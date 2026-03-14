import { Plus } from "lucide-react";
import type { Agent } from "@/types/agents";

function statusStyle(status: Agent["status"]) {
  switch (status) {
    case "active":
      return "bg-foreground animate-pulse-slow";
    case "idle":
      return "bg-muted-foreground";
    case "error":
      return "bg-foreground";
  }
}

function statusLabel(status: Agent["status"]) {
  switch (status) {
    case "active":
      return "ACTIVE";
    case "idle":
      return "IDLE";
    case "error":
      return "ERROR";
  }
}

interface CrewGridProps {
  agents: Agent[];
  onAgentClick: (agentId: string, agentName: string) => void;
  onAddAgent: () => void;
}

export function CrewGrid({ agents, onAgentClick, onAddAgent }: CrewGridProps) {
  return (
    <div>
      <span className="text-[9px] tracking-[0.15em] text-muted-foreground mb-3 block">TEAM</span>
      <div className="grid grid-cols-3 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            onClick={() => onAgentClick(agent.id, agent.name)}
            className={`border p-4 transition-colors hover:border-foreground cursor-pointer ${
              agent.status === "error"
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-card"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className={`size-1.5 ${statusStyle(agent.status)}`} />
              <span className="text-[9px] tracking-[0.1em] text-muted-foreground">
                {statusLabel(agent.status)}
              </span>
            </div>
            <h3 className="text-[11px] font-medium tracking-tight mb-2">{agent.name}</h3>
            <div className="text-[10px] text-muted-foreground">TASKS: {agent.tasks}</div>
          </div>
        ))}

        <button
          onClick={onAddAgent}
          className="border border-dashed border-border p-4 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors cursor-pointer"
        >
          <Plus className="size-5" strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
