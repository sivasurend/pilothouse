export type AgentRole = "captain" | "team";
export type AgentStatus = "active" | "idle" | "error";

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  active: boolean;
  status: AgentStatus;
  tasks: number;
}

export interface NewAgentInput {
  name: string;
  role: AgentRole;
}
