import { useState } from "react";
import { X } from "lucide-react";

interface AddAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAgentDialog({ open, onOpenChange }: AddAgentDialogProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState<"captain" | "crew">("crew");

  if (!open) return null;

  const handleCreate = () => {
    // For now just close — would persist in a real app
    setName("");
    setRole("crew");
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/10"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="relative border border-border bg-card w-[400px] z-10">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-xs font-medium tracking-[0.1em] text-foreground">NEW_AGENT</span>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="text-[10px] tracking-[0.15em] text-muted-foreground block mb-2">
              AGENT_NAME
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase().replace(/\s+/g, "_"))}
              placeholder="e.g. MARKET_ANALYST"
              className="w-full bg-background border border-border px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
            />
          </div>

          <div>
            <label className="text-[10px] tracking-[0.15em] text-muted-foreground block mb-2">
              ROLE
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setRole("captain")}
                className={`flex-1 text-[10px] tracking-[0.1em] py-2 border transition-colors ${
                  role === "captain"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                CAPTAIN
              </button>
              <button
                onClick={() => setRole("crew")}
                className={`flex-1 text-[10px] tracking-[0.1em] py-2 border transition-colors ${
                  role === "crew"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                CREW
              </button>
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={!name}
            className="w-full text-[10px] tracking-[0.15em] py-2.5 border border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            CREATE_AGENT
          </button>
        </div>
      </div>
    </div>
  );
}
