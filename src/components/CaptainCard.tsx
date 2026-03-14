import { useEffect, useState } from "react";

interface CaptainCardProps {
  captainName: string;
  teamActive: number;
  teamTotal: number;
  onOpenFiles: () => void;
}

function SynapseDot({ active }: { active: boolean }) {
  return (
    <div
      className={`size-2.5 transition-opacity duration-300 ${
        active ? "bg-foreground opacity-100" : "bg-muted opacity-30"
      }`}
    />
  );
}

export function CaptainCard({ captainName, teamActive, teamTotal, onOpenFiles }: CaptainCardProps) {
  const [synapses, setSynapses] = useState<boolean[]>(Array(16).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setSynapses((prev) => prev.map(() => Math.random() > 0.5));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <button
      type="button"
      onClick={onOpenFiles}
      className="w-full border border-border bg-card p-6 text-left transition-colors hover:border-foreground"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[9px] tracking-[0.15em] text-muted-foreground">CAPTAIN</span>
          <h2 className="text-sm font-medium tracking-tight text-foreground mt-1">{captainName}</h2>
        </div>
        <span className="text-[10px] border border-foreground text-foreground px-2 py-0.5 tracking-[0.1em]">
          RUNNING
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="grid grid-cols-4 gap-1.5">
          {synapses.map((active, i) => (
            <SynapseDot key={i} active={active} />
          ))}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">UPTIME</span>
            <span className="text-foreground">4h 23m</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">TASKS</span>
            <span className="text-foreground">142 / 156</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">TEAM_ACTIVE</span>
            <span className="text-foreground">{teamActive} / {teamTotal}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
