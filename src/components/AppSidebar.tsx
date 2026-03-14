import { useState } from "react";
import { ChevronDown, LayoutDashboard, Activity, Settings, Terminal } from "lucide-react";

const agents = [
  { id: "captain", name: "SERIES_B_FUNDRAISING", role: "Captain", active: true },
  { id: "crew_01", name: "INVESTOR_RESEARCHER", role: "Crew", active: true },
  { id: "crew_02", name: "CAMPAIGN_PERSONALIZE", role: "Crew", active: true },
  { id: "crew_03", name: "STATUS_REPORTING", role: "Crew", active: false },
  { id: "crew_04", name: "FOUNDER_TRAINING", role: "Crew", active: true },
];

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "COMMAND CENTER" },
  { id: "console", icon: Terminal, label: "CONSOLE" },
  { id: "analytics", icon: Activity, label: "ANALYTICS" },
  { id: "settings", icon: Settings, label: "SETTINGS" },
];

interface AppSidebarProps {
  activeView: string;
  selectedAgent: string | null;
  onNavClick: (id: string) => void;
  onAgentClick: (agentId: string, agentName: string) => void;
}

export function AppSidebar({ activeView, selectedAgent, onNavClick, onAgentClick }: AppSidebarProps) {
  const [agentsOpen, setAgentsOpen] = useState(true);

  return (
    <aside className="w-[240px] min-h-screen border-r border-border bg-sidebar flex flex-col shrink-0">
      <div className="h-14 flex items-center gap-2 px-5 border-b border-border">
        <div className="size-2 bg-foreground rounded-full animate-pulse-slow" />
        <span className="text-xs font-medium tracking-[0.15em] text-foreground">CLAW_SYSTEM</span>
      </div>

      <nav className="flex-1 py-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavClick(item.id)}
            className={`w-full flex items-center gap-3 px-5 py-2.5 text-xs tracking-[0.05em] transition-colors ${
              activeView === item.id
                ? "text-foreground bg-sidebar-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
            }`}
          >
            <item.icon className="size-3.5" strokeWidth={1.5} />
            <span>{item.label}</span>
          </button>
        ))}

        <div className="mt-2">
          <button
            onClick={() => setAgentsOpen(!agentsOpen)}
            className="w-full flex items-center justify-between px-5 py-2.5 text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>AGENTS</span>
            <ChevronDown
              className={`size-3 transition-transform duration-200 ${agentsOpen ? "rotate-0" : "-rotate-90"}`}
              strokeWidth={1.5}
            />
          </button>

          {agentsOpen && (
            <div className="py-1">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => onAgentClick(agent.id, agent.name)}
                  className={`w-full flex items-center gap-3 px-5 pl-9 py-2 transition-colors group ${
                    selectedAgent === agent.id
                      ? "text-foreground bg-sidebar-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <div
                    className={`size-1.5 ${
                      agent.active ? "bg-foreground animate-pulse-slow" : "bg-muted-foreground"
                    }`}
                  />
                  <span className="text-[10px] tracking-tight truncate">{agent.name}</span>
                  <span className="ml-auto text-[9px] opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
                    {agent.role === "Captain" ? "CPT" : "CRW"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <div className="border-t border-border px-5 py-3">
        <div className="text-[9px] text-muted-foreground tracking-[0.1em]">
          SYS_VERSION: 1.0.4
        </div>
      </div>
    </aside>
  );
}
