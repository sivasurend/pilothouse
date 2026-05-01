import { useState } from "react";
import {
  Paperclip,
  Mic,
  ArrowUp,
  Users,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Heart,
  FileText,
  AlertTriangle,
  ClipboardList,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

interface Journey {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tooltip?: string;
}

const journeys: Journey[] = [
  {
    id: "talent_pipeline",
    title: "Talent Pipeline",
    description: "Requisition tracking, pipeline health, source effectiveness & hiring velocity",
    icon: Users,
    tooltip: "Start here — review pipeline health, flag aging requisitions & optimize source channels",
  },
  {
    id: "performance_review",
    title: "Performance Review",
    description: "Rating distribution, calibration sessions, PIP tracking & development plans",
    icon: BarChart3,
  },
  {
    id: "compensation_analysis",
    title: "Compensation Analysis",
    description: "Market benchmarking, pay equity audit, compa-ratios & merit planning",
    icon: TrendingUp,
  },
  {
    id: "workforce_planning",
    title: "Workforce Planning",
    description: "Demand forecast, skills gap analysis, succession pipeline & scenario modeling",
    icon: ShieldCheck,
  },
  {
    id: "employee_onboarding",
    title: "Employee Onboarding",
    description: "30/60/90-day tracking across Workday, Docebo, ServiceNow, and Calendar",
    icon: Heart,
  },
  {
    id: "compliance_audit",
    title: "Compliance Audit",
    description: "I-9, FLSA, EEO, ADA audit results, findings & remediation tracking",
    icon: FileText,
  },
];

const integratedSystems = [
  "GMAIL",
  "CALENDAR",
  "WORKDAY",
  "ZOOM",
  "LINKEDIN",
  "SALESFORCE",
  "SAP",
  "UKG",
  "GOOGLE",
  "DOCEBO",
  "ADP",
];

const insights = [
  {
    title: "Engineering Attrition Spike: 28% Annualized",
    body:
      "Engineering team in Product Platform saw 3x normal attrition rate (28% annualized vs 9% company avg). Exit interviews cite delayed promotions and below-market equity refresh.",
  },
  {
    title: "Sales New Hire Early Departures",
    body:
      "5 Sales reps hired in Q4 2025 departed within 90 days — onboarding experience rated 2.1/5 in exit surveys. Regional manager turnover may be contributing factor.",
  },
];

const actions = [
  {
    title: "Engineering Compensation Adjustment — 23 Roles",
    tag: "COMPENSATION",
    date: "Mar 14, 2026",
    amount: "$680K",
    severity: "HIGH",
    body:
      "Market benchmarking flagged 23 Engineering roles below 90th percentile. Proposed adjustment of $680K total to retain critical AI/ML talent.",
  },
  {
    title: "Q2 Headcount Plan — 87 New Positions",
    tag: "WORKFORCE",
    date: "Mar 12, 2026",
    severity: "HIGH",
    body:
      "Forecast model recommends 87 backfills + new positions across Engineering, Sales & CX. Aligned with Q2 demand signal and revenue plan.",
  },
];

interface HomeDashboardProps {
  onJourneyClick: (id: string) => void;
}

export function HomeDashboard({ onJourneyClick }: HomeDashboardProps) {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[1100px] mx-auto px-8 py-10">
        {/* Hero */}
        <section className="flex flex-col items-center text-center">
          <div className="size-12 bg-foreground flex items-center justify-center mb-5">
            <span className="text-sm tracking-[0.15em] text-background font-medium">PH</span>
          </div>

          <h1 className="text-2xl tracking-tight text-foreground">HR Office AgenticOS</h1>
          <p className="mt-2 text-[11px] tracking-[0.05em] text-muted-foreground max-w-xl">
            AgenticOS — Autonomous people intelligence for the modern workforce
          </p>

          {/* Chat input */}
          <div className="mt-7 w-full max-w-2xl border border-border bg-card flex items-center gap-2 px-3 py-2">
            <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Paperclip className="size-3.5" strokeWidth={1.5} />
            </button>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="How can I help?"
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none px-1 py-1.5 tracking-[0.02em]"
            />
            <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <Mic className="size-3.5" strokeWidth={1.5} />
            </button>
            <button className="size-7 bg-foreground text-background flex items-center justify-center hover:opacity-90 transition-opacity">
              <ArrowUp className="size-3.5" strokeWidth={2} />
            </button>
          </div>

          {/* Integrated systems */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[9px] tracking-[0.2em] text-muted-foreground mr-2">
              INTEGRATED SYSTEMS
            </span>
            {integratedSystems.map((s) => (
              <span
                key={s}
                className="text-[9px] tracking-[0.15em] text-muted-foreground border border-border px-2 py-1 hover:text-foreground hover:border-foreground transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Agent Journeys */}
        <section className="mt-12">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <ClipboardList className="size-3.5 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[10px] tracking-[0.2em] text-muted-foreground">AGENT JOURNEYS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative">
            {journeys.map((j, idx) => {
              const Icon = j.icon;
              return (
                <div key={j.id} className="relative">
                  {j.tooltip && (
                    <div className="hidden lg:block absolute -left-4 -translate-x-full top-3 w-52 bg-foreground text-background text-[10px] tracking-[0.02em] leading-snug px-3 py-2">
                      {j.tooltip}
                      <div className="absolute right-[-6px] top-3 size-3 bg-foreground rotate-45" />
                    </div>
                  )}
                  <button
                    onClick={() => onJourneyClick(j.id)}
                    className={`group w-full text-left border bg-card p-4 flex items-start gap-3 transition-colors hover:border-foreground ${
                      idx === 0 ? "border-foreground" : "border-border"
                    }`}
                  >
                    <div className="size-8 bg-secondary flex items-center justify-center shrink-0">
                      <Icon className="size-3.5 text-foreground" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium tracking-tight text-foreground">
                        {j.title}
                      </div>
                      <div className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
                        {j.description}
                      </div>
                    </div>
                    <ChevronRight
                      className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors mt-1"
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Insights & Actions */}
        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Agent Insights */}
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-border">
              <AlertTriangle className="size-3.5 text-foreground" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.2em] text-foreground">AGENT INSIGHTS</span>
              <span className="ml-auto text-[10px] text-muted-foreground border border-border px-2 py-0.5">
                {insights.length}
              </span>
            </div>
            <div className="divide-y divide-border">
              {insights.map((ins, i) => (
                <div key={i} className="p-4 flex gap-3">
                  <AlertTriangle className="size-3.5 text-foreground shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="text-[11px] font-medium text-foreground">{ins.title}</div>
                    <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{ins.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Required */}
          <div className="border border-border bg-card">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-border">
              <ClipboardList className="size-3.5 text-foreground" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.2em] text-foreground">ACTIONS REQUIRED</span>
              <span className="ml-auto text-[10px] text-muted-foreground border border-border px-2 py-0.5">
                {actions.length}
              </span>
            </div>
            <div className="divide-y divide-border">
              {actions.map((a, i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[11px] font-medium text-foreground">{a.title}</div>
                    <span className="text-[9px] tracking-[0.15em] bg-foreground text-background px-2 py-0.5">
                      {a.severity}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[9px] tracking-[0.1em] text-muted-foreground">
                    <span>{a.tag}</span>
                    <span>•</span>
                    <span>{a.date}</span>
                    {a.amount && (
                      <>
                        <span>•</span>
                        <span className="text-foreground border border-border px-1.5 py-0.5">{a.amount}</span>
                      </>
                    )}
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">{a.body}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] border border-foreground text-foreground px-2.5 py-1 hover:bg-foreground hover:text-background transition-colors">
                      <Check className="size-3" strokeWidth={2} />
                      APPROVE
                    </button>
                    <button className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] border border-border text-muted-foreground px-2.5 py-1 hover:text-foreground hover:border-foreground transition-colors">
                      <X className="size-3" strokeWidth={2} />
                      REJECT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
