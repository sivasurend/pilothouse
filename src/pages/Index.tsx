import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { MessageBus } from "@/components/MessageBus";
import { CaptainCard } from "@/components/CaptainCard";
import { CrewGrid } from "@/components/CrewGrid";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />

        <div className="flex flex-1 min-h-0">
          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto space-y-6">
            <CaptainCard />
            <CrewGrid />
          </main>

          <MessageBus />
        </div>
      </div>
    </div>
  );
};

export default Index;
