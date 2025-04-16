
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Server, Cloud, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ConnectionValues {
  type: string;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
}

const initialValues: ConnectionValues = {
  type: "postgresql",
  host: "",
  port: "",
  database: "",
  username: "",
  password: "",
  ssl: true,
};

const ConnectionTypeBadge = ({ type }: { type: string }) => {
  const types: Record<string, { icon: React.ReactNode; color: string }> = {
    postgresql: { icon: <Database className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" },
    mysql: { icon: <Database className="h-4 w-4" />, color: "bg-orange-100 text-orange-800" },
    supabase: { icon: <Cloud className="h-4 w-4" />, color: "bg-emerald-100 text-emerald-800" },
    salesforce: { icon: <Cloud className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" },
  };

  const { icon, color } = types[type] || { icon: <Server className="h-4 w-4" />, color: "bg-gray-100 text-gray-800" };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {icon}
      <span className="ml-1 capitalize">{type}</span>
    </span>
  );
};

const DatabaseConnection = ({ onConnect }: { onConnect: (values: ConnectionValues) => void }) => {
  const [activeTab, setActiveTab] = useState<string>("local");
  const [values, setValues] = useState<ConnectionValues>(initialValues);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const { toast } = useToast();

  const handleChange = (field: keyof ConnectionValues, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleConnect = () => {
    setIsConnecting(true);
    
    // In a real application, this would validate and attempt to connect to the database
    setTimeout(() => {
      setIsConnecting(false);
      
      // Mock successful connection
      toast({
        title: "Successfully connected",
        description: `Connected to ${values.database} on ${values.host}`,
      });
      
      onConnect(values);
    }, 1500);
  };

  const isFormValid = () => {
    if (activeTab === "local") {
      return values.host && values.database && values.username && values.password;
    } else if (activeTab === "cloud") {
      return values.type && values.host && values.database && values.username && values.password;
    }
    return false;
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Connect to Database</CardTitle>
        <CardDescription>
          Create a connection to your database or service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="local" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="local">
              <Server className="h-4 w-4 mr-2" />
              Local Database
            </TabsTrigger>
            <TabsTrigger value="cloud">
              <Cloud className="h-4 w-4 mr-2" />
              Cloud Services
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="db-type">Database Type</Label>
              <Select 
                value={values.type} 
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select database type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postgresql">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="sqlserver">SQL Server</SelectItem>
                  <SelectItem value="oracle">Oracle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="host">Host</Label>
                <Input 
                  id="host" 
                  placeholder="localhost" 
                  value={values.host}
                  onChange={(e) => handleChange("host", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input 
                  id="port" 
                  placeholder="5432" 
                  value={values.port}
                  onChange={(e) => handleChange("port", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="database">Database Name</Label>
              <Input 
                id="database" 
                placeholder="my_database" 
                value={values.database}
                onChange={(e) => handleChange("database", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="db_user" 
                  value={values.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={values.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="service-type">Service Type</Label>
              <Select 
                value={values.type} 
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supabase">Supabase</SelectItem>
                  <SelectItem value="salesforce">Salesforce CRM</SelectItem>
                  <SelectItem value="firebase">Firebase</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="host">Host/URL</Label>
              <Input 
                id="host" 
                placeholder="https://your-project.supabase.co" 
                value={values.host}
                onChange={(e) => handleChange("host", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="database">Database/Project Name</Label>
              <Input 
                id="database" 
                placeholder="project-name" 
                value={values.database}
                onChange={(e) => handleChange("database", e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key/Username</Label>
                <Input 
                  id="api-key" 
                  placeholder="your-api-key" 
                  value={values.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-secret">API Secret/Password</Label>
                <div className="relative">
                  <Input 
                    id="api-secret" 
                    type="password" 
                    placeholder="••••••••" 
                    value={values.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {values.type && (
            <ConnectionTypeBadge type={values.type} />
          )}
        </div>
        <Button 
          onClick={handleConnect}
          disabled={!isFormValid() || isConnecting}
        >
          {isConnecting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Connecting...
            </>
          ) : (
            <>Connect</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DatabaseConnection;
