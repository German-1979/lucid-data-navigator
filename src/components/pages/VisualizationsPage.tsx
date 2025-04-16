
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BarChart, LineChart, PieChart, ScatterChart, AreaChart, Plus, Search, LayoutDashboard } from "lucide-react";
import ChartCard from "@/components/visualizations/ChartCard";

// Sample data for charts
const salesData = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 150 },
  { month: "Mar", sales: 200 },
  { month: "Apr", sales: 180 },
  { month: "May", sales: 220 },
  { month: "Jun", sales: 250 },
];

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 20000 },
  { month: "Apr", revenue: 18000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 25000 },
];

const categoryData = [
  { category: "Electronics", value: 40 },
  { category: "Clothing", value: 25 },
  { category: "Home", value: 20 },
  { category: "Books", value: 15 },
];

interface ChartType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const chartTypes: ChartType[] = [
  {
    id: "bar",
    name: "Bar Chart",
    icon: <BarChart className="h-10 w-10 text-data-blue" />,
    description: "Compare values across categories"
  },
  {
    id: "line",
    name: "Line Chart",
    icon: <LineChart className="h-10 w-10 text-data-teal" />,
    description: "Show trends over time"
  },
  {
    id: "pie",
    name: "Pie Chart",
    icon: <PieChart className="h-10 w-10 text-data-purple" />,
    description: "Show composition or proportion"
  },
  {
    id: "scatter",
    name: "Scatter Plot",
    icon: <ScatterChart className="h-10 w-10 text-data-orange" />,
    description: "Show correlation between variables"
  },
  {
    id: "area",
    name: "Area Chart",
    icon: <AreaChart className="h-10 w-10 text-data-green" />,
    description: "Show volume changes over time"
  },
];

const VisualizationsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Visualizations</h1>
          <p className="text-muted-foreground">
            Create and manage data visualizations
          </p>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search visualizations..." 
              className="w-full pl-8" 
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Chart
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="charts" className="w-full">
        <TabsList>
          <TabsTrigger value="charts">All Charts</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="dashboards">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Dashboards
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChartCard 
              title="Monthly Sales" 
              description="Unit sales over last 6 months"
              type="bar" 
              data={salesData} 
              dataKey="month" 
              valueKey="sales" 
            />
            
            <ChartCard 
              title="Revenue Trend" 
              description="Revenue trend over last 6 months"
              type="line" 
              data={revenueData} 
              dataKey="month" 
              valueKey="revenue" 
            />
            
            <ChartCard 
              title="Sales by Category" 
              description="Distribution by product category"
              type="pie" 
              data={categoryData} 
              dataKey="category" 
              valueKey="value" 
            />
            
            <Card className="flex flex-col justify-center items-center py-12 border-dashed">
              <Button variant="outline" className="mb-2">
                <Plus className="h-5 w-5 mr-2" />
                Add Chart
              </Button>
              <p className="text-sm text-muted-foreground">
                Create a new visualization
              </p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="create" className="py-4">
          <h2 className="text-xl font-semibold mb-4">Choose a Chart Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {chartTypes.map((chart) => (
              <Card key={chart.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="text-center pb-2">
                  <div className="flex justify-center">{chart.icon}</div>
                  <CardTitle className="mt-2">{chart.name}</CardTitle>
                  <CardDescription>{chart.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center pt-0 pb-4">
                  <Button>Create {chart.name}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="dashboards" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboards</CardTitle>
              <CardDescription>Create and manage dashboards</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <LayoutDashboard className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No dashboards yet</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Create a dashboard to organize multiple visualizations
              </p>
              <Button>Create Dashboard</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisualizationsPage;
