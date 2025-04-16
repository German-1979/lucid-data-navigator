
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import DashboardPage from "@/components/pages/DashboardPage";
import DataSourcesPage from "@/components/pages/DataSourcesPage";
import VisualizationsPage from "@/components/pages/VisualizationsPage";
import AnalysisPage from "@/components/pages/AnalysisPage";
import MachineLearningPage from "@/components/pages/MachineLearningPage";
import AIAssistantPage from "@/components/pages/AIAssistantPage";

const Index = () => {
  const [activePage, setActivePage] = useState<string>("dashboard");

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "datasources":
        return <DataSourcesPage />;
      case "visualizations":
        return <VisualizationsPage />;
      case "analysis":
        return <AnalysisPage />;
      case "ml":
        return <MachineLearningPage />;
      case "assistant":
        return <AIAssistantPage />;
      case "upload":
        return <DataSourcesPage />;
      case "connection":
        return <DataSourcesPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderActivePage()}
    </Layout>
  );
};

export default Index;
