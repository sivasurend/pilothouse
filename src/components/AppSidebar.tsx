import { useState } from "react";
import {
  ChevronDown,
  Home,
  BookOpen,
  Inbox,
  Users,
  UserSearch,
  UserCheck,
  ClipboardCheck,
  CalendarDays,
  Send,
  HeartHandshake,
  Sparkles,
  GraduationCap,
  Briefcase,
  LifeBuoy,
  LogOut,
  BarChart3,
  Activity,
  ShieldCheck,
  FileText,
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
      { id: "wiki", label: "LLM Wiki", icon: BookOpen },
      { id: "inbox", label: "Decision Inbox", icon: Inbox },
    ],
  },
  {
    label: "RECRUITMENT",
    items: [
      { id: "talent_pipeline", label: "Talent Pipeline", icon: Users },
      { id: "candidate_sourcing", label: "Candidate Sourcing", icon: UserSearch },
      { id: "candidate_matching", label: "Candidate Matching", icon: UserCheck },
      { id: "candidate_evaluation", label: "Candidate Evaluation", icon: ClipboardCheck },
      { id: "interview_scheduling", label: "Interview Scheduling", icon: CalendarDays },
      { id: "employee_onboarding", label: "Employee Onboarding", icon: Send },
    ],
  },
  {
    label: "EMPLOYEE EXPERIENCE",
    items: [
      { id: "engagement_survey", label: "Engagement Survey", icon: HeartHandshake },
      { id: "diversity_inclusion", label: "Diversity & Inclusion", icon: Sparkles },
      { id: "learning_development", label: "Learning & Development", icon: GraduationCap },
      { id: "employee_relations", label: "Employee Relations", icon: Briefcase },
      { id: "help_desk", label: "Help Desk (Admin)", icon: LifeBuoy },
      { id: "exit_interviews", label: "Exit Interviews", icon: LogOut },
    ],
  },
  {
    label: "HR PRODUCTIVITY",
    items: [
      { id: "performance_review", label: "Performance Review", icon: BarChart3 },
      { id: "compensation_analysis", label: "Compensation Analysis", icon: Activity },
      { id: "workforce_planning", label: "Workforce Planning", icon: ShieldCheck },
      { id: "compliance_audit", label: "Compliance Audit", icon: FileText },
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

export function AppSidebar({ activeView, selectedAgent, agents, onNavClick, onAgentClick }: AppSidebarProps) {
  const [agentsOpen, setAgentsOpen] = useState(false);

  return (
    <aside className="w-[260px] h-screen border-r border-border bg-sidebar flex flex-col shrink-0 overflow-y-auto">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-border shrink-0">
        <div className="size-8 bg-foreground flex items-center justify-center">
          <span className="text-[10px] tracking-[0.15em] text-background font-medium">PH</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-medium tracking-[0.05em] text-foreground">PilotHouse</span>
          <span className="text-[9px] tracking-[0.15em] text-muted-foreground">POWERED BY GITCLAW</span>
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

        {/* Agents collapsible */}
        <div className="mt-4">
          <button
            onClick={() => setAgentsOpen(!agentsOpen)}
            className="w-full flex items-center justify-between px-5 py-2 text-[9px] tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
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
                    {agent.role === "captain" ? "CPT" : "TM"}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
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
