import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Settings,
  Brain,
  FileText,
  Users,
  Calendar,
  Zap,
  Folder,
  BookOpen,
  Wrench,
  Database,
  Globe,
  Link,
  Shield,
} from "lucide-react";

export interface FileNode {
  name: string;
  type: "file" | "folder";
  icon: React.ElementType;
  tag?: { label: string; variant: "config" | "core" | "capability" | "live" | "governance" };
  children?: FileNode[];
  content?: string;
}

const tagStyles = {
  config: "bg-muted text-muted-foreground",
  core: "bg-muted text-muted-foreground",
  capability: "bg-muted text-muted-foreground",
  live: "bg-[hsl(var(--live-bg))] text-[hsl(var(--live-foreground))]",
  governance: "bg-muted text-muted-foreground",
};

export function getAgentFileTree(agentName: string): FileNode[] {
  return [
    {
      name: "agent.yaml",
      type: "file",
      icon: Settings,
      tag: { label: "config", variant: "config" },
      content: `# Agent Configuration: ${agentName}\n\nname: "${agentName}"\nversion: "1.2.0"\nruntime: "claw-engine-v3"\nmax_concurrent_tasks: 8\ntimeout: 300s\n\nresources:\n  memory: "512MB"\n  cpu: "0.5"\n\nendpoints:\n  - type: "webhook"\n    url: "/api/agents/${agentName.toLowerCase().replace(/_/g, '-')}/hook"\n  - type: "grpc"\n    port: 50051`,
    },
    {
      name: "SOUL.md",
      type: "file",
      icon: Brain,
      tag: { label: "core", variant: "core" },
      content: `# SOUL — ${agentName}\n\n## Purpose\nThis agent exists to serve as the primary orchestrator for its designated domain.\n\n## Core Values\n- Precision over speed\n- Data-driven decisions\n- Transparent reasoning chains\n\n## Behavioral Constraints\n- Never fabricate data points\n- Always cite sources when making claims\n- Escalate uncertainty to the Captain agent\n\n## Identity\nI am ${agentName}. I operate within the Claw System framework.\nMy decisions are logged, auditable, and reversible.`,
    },
    {
      name: "RULES.md",
      type: "file",
      icon: FileText,
      content: `# Rules — ${agentName}\n\n## Execution Rules\n1. All tasks must be logged before execution\n2. External API calls require rate-limit compliance\n3. Memory writes must be atomic\n4. Failed tasks retry max 3 times with exponential backoff\n\n## Communication Rules\n1. Messages to Captain must include task_id\n2. Team-to-team messages go through the Message Bus\n3. Priority levels: CRITICAL > HIGH > NORMAL > LOW\n\n## Data Rules\n1. PII must be redacted in logs\n2. All data older than 90 days auto-archives\n3. Knowledge base updates require validation`,
    },
    {
      name: "AGENTS.md",
      type: "file",
      icon: Users,
      content: `# Agent Registry\n\n## Connected Agents\n| Agent | Role | Status |\n|-------|------|--------|\n| SERIES_B_FUNDRAISING | Captain | ACTIVE |\n| INVESTOR_RESEARCHER | Team | ACTIVE |\n| CAMPAIGN_PERSONALIZE | Team | ACTIVE |\n| STATUS_REPORTING | Team | IDLE |\n| FOUNDER_TRAINING | Team | ACTIVE |\n\n## Communication Protocol\nAll agents communicate via the central Message Bus.\nDirect agent-to-agent calls are reserved for CRITICAL priority only.`,
    },
    {
      name: "INSTRUCTIONS.md",
      type: "file",
      icon: FileText,
      content: `# Instructions — ${agentName}\n\n## Startup Sequence\n1. Load agent.yaml configuration\n2. Initialize memory from last checkpoint\n3. Register with Message Bus\n4. Execute bootstrap hooks\n5. Signal READY to Captain\n\n## Task Processing\n1. Receive task from Message Bus\n2. Validate against RULES.md\n3. Execute using available skills/tools\n4. Log results to memory/runtime/\n5. Report completion to Captain`,
    },
    {
      name: "scheduler.yml",
      type: "file",
      icon: Calendar,
      content: `# Scheduler Configuration\n\nschedules:\n  - name: "daily_sync"\n    cron: "0 6 * * *"\n    task: "sync_knowledge_base"\n    timeout: 600s\n\n  - name: "health_check"\n    cron: "*/15 * * * *"\n    task: "self_diagnostic"\n    timeout: 30s\n\n  - name: "weekly_report"\n    cron: "0 9 * * 1"\n    task: "generate_status_report"\n    timeout: 1800s`,
    },
    {
      name: "skills/",
      type: "folder",
      icon: Zap,
      tag: { label: "capability", variant: "capability" },
      children: [
        {
          name: "code-review/",
          type: "folder",
          icon: Folder,
          children: [
            {
              name: "SKILL.md",
              type: "file",
              icon: BookOpen,
              content: `# Skill: Code Review\n\n## Description\nAutomated code review capability using static analysis and LLM-based reasoning.\n\n## Triggers\n- Pull request opened\n- Manual invocation via Message Bus\n\n## Parameters\n- \`language\`: Target programming language\n- \`severity_threshold\`: minimum issue level to report\n- \`max_files\`: maximum files to review per batch\n\n## Output\nStructured JSON report with findings, severity, and suggested fixes.`,
            },
          ],
        },
      ],
    },
    {
      name: "tools/",
      type: "folder",
      icon: Wrench,
      tag: { label: "capability", variant: "capability" },
      children: [
        {
          name: "search.yaml",
          type: "file",
          icon: Settings,
          content: `# Tool: Search\n\nname: "search"\ntype: "retrieval"\nversion: "2.1"\n\nconfig:\n  engine: "vector_search"\n  index: "knowledge_base"\n  top_k: 10\n  similarity_threshold: 0.75\n\npermissions:\n  - read:knowledge\n  - read:memory\n\nrate_limit:\n  requests_per_minute: 60\n  burst: 10`,
        },
      ],
    },
    {
      name: "knowledge/",
      type: "folder",
      icon: Database,
      children: [
        {
          name: "index.yaml",
          type: "file",
          icon: Settings,
          content: `# Knowledge Base Index\n\nsources:\n  - name: "investor_database"\n    type: "structured"\n    format: "json"\n    records: 2847\n    last_updated: "2026-03-13T18:00:00Z"\n\n  - name: "market_research"\n    type: "unstructured"\n    format: "markdown"\n    documents: 156\n    last_updated: "2026-03-14T06:00:00Z"\n\n  - name: "campaign_templates"\n    type: "template"\n    format: "yaml"\n    count: 34\n    last_updated: "2026-03-12T12:00:00Z"`,
        },
      ],
    },
    {
      name: "memory/",
      type: "folder",
      icon: Globe,
      children: [
        {
          name: "MEMORY.md",
          type: "file",
          icon: FileText,
          content: `# Memory Architecture\n\n## Storage Layers\n1. **Working Memory** — Active task context (volatile)\n2. **Short-term Memory** — Recent interactions, 24h window\n3. **Long-term Memory** — Persistent knowledge, checkpointed\n\n## Capacity\n- Working: 32KB\n- Short-term: 1MB\n- Long-term: Unlimited (compressed)\n\n## Retrieval\nMemory retrieval uses semantic search with recency bias.\nDecay function: score × 0.95^(hours_since_access)`,
        },
        {
          name: "runtime/",
          type: "folder",
          icon: Folder,
          tag: { label: "live", variant: "live" },
          children: [
            {
              name: "dailylog.md",
              type: "file",
              icon: FileText,
              content: `# Daily Log — 2026-03-14\n\n## 06:00 — System Boot\n- Loaded checkpoint from 2026-03-13\n- Memory integrity: PASSED\n- Knowledge sync: 12 new documents indexed\n\n## 08:30 — Task Batch #1\n- Processed 34 investor profiles\n- Flagged 8 high-priority matches\n- Sent summaries to CAMPAIGN_PERSONALIZE\n\n## 11:15 — Anomaly Detected\n- Duplicate entries in investor_database\n- Auto-dedup executed: 23 records merged\n- Captain notified\n\n## 14:00 — Status\n- Tasks completed: 142/156\n- Active threads: 3\n- Memory usage: 67%`,
            },
            {
              name: "key-decisions.md",
              type: "file",
              icon: FileText,
              content: `# Key Decisions Log\n\n## Decision #47 — 2026-03-14 09:12\n**Context:** Investor "Acme Ventures" matched on 3/5 criteria\n**Decision:** INCLUDE in outreach list\n**Reasoning:** Strong sector alignment outweighs geographic mismatch\n**Confidence:** 0.78\n**Reviewed by:** CAPTAIN\n\n## Decision #46 — 2026-03-14 08:45\n**Context:** Campaign template A vs B for fintech investors\n**Decision:** Use Template B\n**Reasoning:** Higher historical response rate (34% vs 21%)\n**Confidence:** 0.91\n**Reviewed by:** AUTO-APPROVED`,
            },
            {
              name: "context.md",
              type: "file",
              icon: FileText,
              content: `# Current Context\n\n## Active Task\nSeries B fundraising campaign — Phase 2: Outreach\n\n## Working Set\n- 847 qualified investors\n- 34 personalized campaigns drafted\n- 12 meetings scheduled\n\n## Constraints\n- Budget: $2.4M target raise\n- Timeline: 6 weeks remaining\n- Geographic focus: NA + EU\n\n## Dependencies\n- INVESTOR_RESEARCHER: providing daily investor feeds\n- CAMPAIGN_PERSONALIZE: drafting outreach emails\n- STATUS_REPORTING: weekly board updates`,
            },
          ],
        },
      ],
    },
    {
      name: "hooks/",
      type: "folder",
      icon: Link,
      children: [
        {
          name: "hooks.yaml",
          type: "file",
          icon: Settings,
          content: `# Hooks Configuration\n\nhooks:\n  on_boot:\n    - script: "bootstrap.md"\n      timeout: 60s\n  \n  on_shutdown:\n    - script: "teardown.md"\n      timeout: 30s\n  \n  on_error:\n    - action: "notify_captain"\n      severity: ">=HIGH"\n    - action: "log_to_memory"\n      severity: ">=LOW"`,
        },
        {
          name: "bootstrap.md",
          type: "file",
          icon: FileText,
          content: `# Bootstrap Procedure\n\n## Steps\n1. Verify agent.yaml integrity (checksum)\n2. Load SOUL.md into system prompt\n3. Initialize tool connections\n4. Warm up knowledge base search index\n5. Execute pending scheduled tasks\n6. Register heartbeat with Captain\n7. Log boot time and status\n\n## Failure Handling\n- Step 1-2 failure: ABORT boot, notify Captain\n- Step 3-5 failure: WARN, continue with degraded capability\n- Step 6-7 failure: RETRY 3x, then ABORT`,
        },
        {
          name: "teardown.md",
          type: "file",
          icon: FileText,
          content: `# Teardown Procedure\n\n## Steps\n1. Complete all in-flight tasks (max wait: 30s)\n2. Flush working memory to checkpoint\n3. Deregister from Message Bus\n4. Close tool connections\n5. Log shutdown event\n\n## Emergency Shutdown\nIf graceful shutdown exceeds 30s:\n- Force-flush critical memory\n- Drop non-critical tasks\n- Signal EMERGENCY_STOP to Captain`,
        },
      ],
    },
    {
      name: "compliance/",
      type: "folder",
      icon: Shield,
      tag: { label: "governance", variant: "governance" },
      children: [
        {
          name: "regulatory-map.yaml",
          type: "file",
          icon: Settings,
          content: `# Regulatory Compliance Map\n\nregulations:\n  - name: "GDPR"\n    status: "compliant"\n    applies_to:\n      - "investor_database"\n      - "campaign_personalize"\n    controls:\n      - "data_encryption_at_rest"\n      - "right_to_deletion"\n      - "consent_management"\n\n  - name: "SOC2"\n    status: "in_progress"\n    applies_to:\n      - "all_agents"\n    controls:\n      - "access_logging"\n      - "change_management"\n      - "incident_response"\n\naudit_schedule:\n  frequency: "quarterly"\n  next_audit: "2026-04-01"`,
        },
      ],
    },
  ];
}

interface FileTreeProps {
  nodes: FileNode[];
  depth?: number;
  onFileClick: (file: FileNode) => void;
  selectedFile: string | null;
}

function FileTreeNode({
  node,
  depth = 0,
  onFileClick,
  selectedFile,
}: {
  node: FileNode;
  depth: number;
  onFileClick: (file: FileNode) => void;
  selectedFile: string | null;
}) {
  const [open, setOpen] = useState(true);
  const isFolder = node.type === "folder";
  const Icon = node.icon;
  const indent = depth * 20;

  return (
    <div>
      <button
        onClick={() => {
          if (isFolder) setOpen(!open);
          else onFileClick(node);
        }}
        className={`w-full flex items-center gap-2 py-2 pr-4 text-left transition-colors group ${
          selectedFile === node.name
            ? "bg-muted text-foreground"
            : "text-foreground hover:bg-muted/50"
        }`}
        style={{ paddingLeft: `${indent + 16}px` }}
      >
        {/* Tree connector lines */}
        {depth > 0 && (
          <span className="text-muted-foreground text-xs select-none mr-1">
            {isFolder ? "├─" : "└─"}
          </span>
        )}

        {isFolder && (
          open ? (
            <ChevronDown className="size-3 text-muted-foreground shrink-0" strokeWidth={1.5} />
          ) : (
            <ChevronRight className="size-3 text-muted-foreground shrink-0" strokeWidth={1.5} />
          )
        )}

        <Icon className="size-4 text-muted-foreground shrink-0" strokeWidth={1.5} />

        <span className={`text-sm tracking-tight ${isFolder ? "font-medium" : ""}`}>
          {node.name}
        </span>

        {node.tag && (
          <span
            className={`ml-2 text-[9px] tracking-[0.05em] px-2 py-0.5 rounded-sm ${tagStyles[node.tag.variant]}`}
          >
            {node.tag.label}
          </span>
        )}
      </button>

      {isFolder && open && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.name}
              node={child}
              depth={depth + 1}
              onFileClick={onFileClick}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function AgentFileTree({ nodes, onFileClick, selectedFile }: FileTreeProps) {
  return (
    <div className="py-2">
      {nodes.map((node) => (
        <FileTreeNode
          key={node.name}
          node={node}
          depth={0}
          onFileClick={onFileClick}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
}
