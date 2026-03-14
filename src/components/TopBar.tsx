import { Bell } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-[10px] tracking-[0.15em] text-muted-foreground">
          SYSTEM_STATUS:
        </span>
        <span className="text-[10px] tracking-[0.1em] text-foreground border border-foreground px-2 py-0.5">
          OPERATIONAL
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="size-4" strokeWidth={1.5} />
          <div className="absolute top-1.5 right-1.5 size-1.5 bg-foreground rounded-full" />
        </button>

        <button className="text-[10px] tracking-[0.15em] text-muted-foreground border border-border px-4 py-1.5 hover:bg-foreground hover:text-background transition-colors">
          LOGIN
        </button>
      </div>
    </header>
  );
}
