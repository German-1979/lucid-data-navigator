
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Database, Cloud, Plus } from "lucide-react";
import FileUpload from "@/components/data-sources/FileUpload";
import DatabaseConnection from "@/components/data-sources/DatabaseConnection";
import { useToast } from "@/components/ui/use-toast";

interface DataSource {
  id: string;
  name: string;
  type: string;
  details: string;
  connected: boolean;
}

interface UploadedFile {
  name: string;
  type: string;
  size: number;
  data: any;
}

const initialSources: DataSource[] = [
  {
    id: "1",
    name: "Sample Data",
    type: "csv",
    details: "Sample data for testing",
    connected: true,
  },
];

const DataSourcesPage = ({ onDataSourceAdded }: { onDataSourceAdded?: (source: DataSource) => void }) => {
  const [activeTab, setActiveTab] = useState<string>("sources");
  const [dataSources, setDataSources] = useState<DataSource[]>(initialSources);
  const { toast } = useToast();

  const handleFileUploaded = (file: UploadedFile) => {
    const newSource: DataSource = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.includes("csv") ? "csv" : 
            file.type.includes("excel") ? "excel" : 
            file.type.includes("json") ? "json" : "file",
      details: `${(file.size / 1024).toFixed(1)} KB`,
      connected: true,
    };
    
    setDataSources([...dataSources, newSource]);
    
    if (onDataSourceAdded) {
      onDataSourceAdded(newSource);
    }
    
    setActiveTab("sources");
  };
  
  const handleDatabaseConnected = (values: any) => {
    const newSource: DataSource = {
      id: Date.now().toString(),
      name: values.database,
      type: values.type,
      details: `${values.host}${values.port ? `:${values.port}` : ""}`,
      connected: true,
    };
    
    setDataSources([...dataSources, newSource]);
    
    if (onDataSourceAdded) {
      onDataSourceAdded(newSource);
    }
    
    setActiveTab("sources");
  };
  
  const getSourceIcon = (type: string) => {
    switch (type) {
      case "postgresql":
      case "mysql":
      case "oracle":
      case "sqlserver":
        return <Database className="h-5 w-5 text-data-blue" />;
      case "supabase":
      case "salesforce":
      case "firebase":
        return <Cloud className="h-5 w-5 text-data-purple" />;
      case "csv":
      case "excel":
      case "json":
        return <FileUp className="h-5 w-5 text-data-green" />;
      default:
        return <FileUp className="h-5 w-5 text-data-teal" />;
    }
  };
  
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage your data connections and files
          </p>
        </div>
        <Button onClick={() => setActiveTab("add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Source
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="sources">My Data Sources</TabsTrigger>
          <TabsTrigger value="add">Add New Source</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sources" className="space-y-4 py-4">
          {dataSources.length === 0 ? (
            <div className="text-center py-12">
              <Database className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No data sources yet</h3>
              <p className="text-muted-foreground mb-4">
                Add a data source to get started with your analysis
              </p>
              <Button onClick={() => setActiveTab("add")}>
                <Plus className="mr-2 h-4 w-4" />
                Add Source
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dataSources.map((source) => (
                <Card key={source.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        {getSourceIcon(source.type)}
                        <CardTitle className="ml-2 text-lg">{source.name}</CardTitle>
                      </div>
                      <div className={`h-2 w-2 rounded-full ${source.connected ? "bg-green-500" : "bg-amber-500"}`} />
                    </div>
                    <CardDescription className="flex justify-between">
                      <span className="capitalize">{source.type}</span>
                      <span>{source.details}</span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="add" className="py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FileUpload onFileUploaded={handleFileUploaded} />
            <DatabaseConnection onConnect={handleDatabaseConnected} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataSourcesPage;
