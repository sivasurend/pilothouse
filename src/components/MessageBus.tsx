import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LogEntry {
  id: number;
  timestamp: string;
  agent: string;
  target: string;
  message: string;
}

const agentNames = ["INVESTOR_RESEARCHER", "CAMPAIGN_PERSONALIZE", "STATUS_REPORTING", "FOUNDER_TRAINING", "CAPTAIN"];
const messages = [
  "Task initialized",
  "Fetching investor data...",
  "Pipeline stage updated",
  "Report generated",
  "Sync complete",
  "Awaiting response",
  "Data validated",
  "Processing batch #42",
  "Cache refreshed",
  "Handshake confirmed",
  "Running evaluation...",
  "Checkpoint saved",
  "Query dispatched",
  "Metrics collected",
];

function generateLog(id: number): LogEntry {
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const agent = agentNames[Math.floor(Math.random() * agentNames.length)];
  const target = agentNames.filter((a) => a !== agent)[Math.floor(Math.random() * (agentNames.length - 1))];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  return { id, timestamp: ts, agent, target, message: msg };
}

export function MessageBus() {
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const initial: LogEntry[] = [];
    for (let i = 0; i < 20; i++) initial.push(generateLog(i));
    return initial;
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = generateLog(counterRef.current++);
        const next = [...prev, newLog];
        if (next.length > 100) return next.slice(-80);
        return next;
      });
    }, 1500 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <aside className="w-[320px] border-l border-border bg-background flex flex-col shrink-0">
      <div className="h-14 flex items-center justify-between px-4 border-b border-border">
        <span className="text-[10px] tracking-[0.15em] text-muted-foreground">LIVE_MESSAGE_BUS</span>
        <div className="size-1.5 bg-foreground rounded-full animate-pulse-slow" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, ease: [0.19, 1, 0.22, 1] }}
              className="py-1.5 border-b border-secondary flex flex-col gap-0.5"
            >
              <div className="flex items-center gap-2">
                <span className="text-[9px] text-muted-foreground">[{log.timestamp}]</span>
                <span className="text-[10px] text-foreground truncate">{log.agent}</span>
                <span className="text-[9px] text-muted-foreground">→</span>
                <span className="text-[10px] text-muted-foreground truncate">{log.target}</span>
              </div>
              <span className="text-[10px] text-muted-foreground pl-[52px] truncate">"{log.message}"</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </aside>
  );
}
