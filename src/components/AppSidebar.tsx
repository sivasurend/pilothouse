import {
  Home,
  BookOpen,
  Inbox,
  Users,
  UserSearch,
  UserCheck,
  HeartHandshake,
  Sparkles,
  GraduationCap,
  Bot,
  Wrench,
  BookOpenText,
  Puzzle,
  Workflow,
  Archive,
  LayoutGrid,
  Search,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import type { Agent } from "@/types/agents";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface NavGroup {
  label?: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    items: [
      { id: "dashboard", label: "Home", icon: Home },
      { id: "wiki", label: "Agent Graph", icon: BookOpen },
      { id: "inbox", label: "Agent Decision Inbox", icon: Inbox },
    ],
  },
  {
    label: "AGENT CATEGORY 1",
    items: [
      { id: "agent_1", label: "Agent 1", icon: Users },
      { id: "agent_2", label: "Agent 2", icon: UserSearch },
      { id: "agent_3", label: "Agent 3", icon: UserCheck },
    ],
  },
  {
    label: "AGENT CATEGORY 2",
    items: [
      { id: "agent_4", label: "Agent 4", icon: HeartHandshake },
      { id: "agent_5", label: "Agent 5", icon: Sparkles },
      { id: "agent_6", label: "Agent 6", icon: GraduationCap },
    ],
  },
  {
    label: "BUILD",
    items: [
      { id: "agent_studio", label: "Agents Library", icon: Bot },
      { id: "skills_manager", label: "Skills Manager", icon: Wrench },
      { id: "knowledge_base", label: "Knowledge Base", icon: BookOpenText },
      { id: "integrations", label: "Integrations", icon: Puzzle },
    ],
  },
  {
    label: "OBSERVE",
    items: [
      { id: "agent_metrics", label: "Agent Metrics", icon: LayoutGrid },
      { id: "agent_runs", label: "Agent Runs", icon: Search },
      { id: "compliance", label: "Compliance & Guardrails", icon: ShieldCheck },
      { id: "audit_trail", label: "Audit Trail", icon: ClipboardList },
    ],
  },
];

interface AppSidebarProps {
  activeView: string;
  selectedAgent: string | null;
  agents: Agent[];
  onNavClick: (id: string) => void;
  onAgentClick: (agentId: string, agentName: string) => void;
}


export function AppSidebar({ activeView, onNavClick }: AppSidebarProps) {
  return (
    <aside className="w-[260px] h-screen border-r border-border bg-sidebar flex flex-col shrink-0 overflow-y-auto">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-border shrink-0">
        <div className="size-8 bg-foreground flex items-center justify-center">
          <span className="text-[9px] tracking-[0.1em] text-background font-medium">Lyzr</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-[0.05em] text-foreground">Agentic Workbench</span>
        </div>
      </div>

      <nav className="flex-1 py-3">
        {navGroups.map((group, gi) => (
          <div key={gi} className={group.label ? "mt-4" : ""}>
            {group.label && (
              <div className="px-5 pb-2 text-[9px] tracking-[0.2em] text-muted-foreground">
                {group.label}
              </div>
            )}
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-5 py-2 text-[11px] tracking-[0.02em] transition-colors ${
                  activeView === item.id
                    ? "text-background bg-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="size-3.5 shrink-0" strokeWidth={1.5} />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Agent Active footer */}
      <div className="border-t border-border px-4 py-3 shrink-0">
        <div className="flex items-center gap-3 border border-border bg-card px-3 py-2">
          <div className="size-6 bg-foreground flex items-center justify-center">
            <div className="size-1.5 bg-background rounded-full animate-pulse-slow" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] tracking-[0.05em] text-foreground">Agent Active</span>
            <span className="text-[8px] tracking-[0.1em] text-muted-foreground">
              POWERED BY GITCLAW
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
