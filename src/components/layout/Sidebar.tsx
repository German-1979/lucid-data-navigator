
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Database, 
  FileSpreadsheet, 
  FilePlus, 
  BarChart4, 
  FileText, 
  BrainCircuit,
  MessageSquare,
  Home,
  Settings,
  HelpCircle
} from "lucide-react";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ icon, label, active, onClick }: SidebarLinkProps) => (
  <Button
    variant="ghost"
    className={`w-full justify-start ${
      active ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
    }`}
    onClick={onClick}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </Button>
);

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  const mainNavItems = [
    { icon: <Home size={18} />, label: "Dashboard", id: "dashboard" },
    { icon: <Database size={18} />, label: "Data Sources", id: "datasources" },
    { icon: <BarChart4 size={18} />, label: "Visualizations", id: "visualizations" },
    { icon: <FileText size={18} />, label: "Analysis", id: "analysis" },
    { icon: <BrainCircuit size={18} />, label: "Machine Learning", id: "ml" },
    { icon: <MessageSquare size={18} />, label: "AI Assistant", id: "assistant" },
  ];

  const quickActions = [
    { icon: <FilePlus size={18} />, label: "Upload File", id: "upload" },
    { icon: <FileSpreadsheet size={18} />, label: "New Connection", id: "connection" },
  ];

  return (
    <div className="h-screen flex flex-col bg-sidebar py-4 w-64 border-r">
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold text-sidebar-foreground flex items-center">
          <Database className="mr-2" /> DataNav
        </h1>
        <p className="text-sm text-sidebar-foreground opacity-75">
          Your Data Navigator
        </p>
      </div>

      <Separator className="my-4 bg-sidebar-border" />

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <SidebarLink
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            />
          ))}
        </div>

        <Separator className="my-4 bg-sidebar-border" />

        <h3 className="text-sm font-medium text-sidebar-foreground px-4 py-2">
          Quick Actions
        </h3>
        <div className="space-y-1">
          {quickActions.map((item) => (
            <SidebarLink
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="px-3 py-2 mt-auto">
        <SidebarLink icon={<Settings size={18} />} label="Settings" onClick={() => setActivePage("settings")} />
        <SidebarLink icon={<HelpCircle size={18} />} label="Help & Support" onClick={() => setActivePage("help")} />
      </div>
    </div>
  );
};

export default Sidebar;
