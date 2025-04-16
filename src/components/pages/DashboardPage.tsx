
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, BarChart4, TrendingUp, PieChart, Database, ArrowUpRight, ArrowDownRight } from "lucide-react";
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

const DashboardPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Your analytics overview</p>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="w-full pl-8" 
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Chart
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-data-blue h-1 rounded-full" style={{ width: "75%" }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <div className="flex items-center pt-1 text-xs text-green-500">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+14.2% from last month</span>
            </div>
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-data-green h-1 rounded-full" style={{ width: "65%" }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <div className="flex items-center pt-1 text-xs text-red-500">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              <span>-2.5% from last week</span>
            </div>
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-data-purple h-1 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 databases, 4 files
            </p>
            <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="bg-data-teal h-1 rounded-full" style={{ width: "85%" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="charts" className="w-full">
        <TabsList>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="data">Data View</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
        
        <TabsContent value="data">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Data Table</CardTitle>
              <CardDescription>
                View and explore the data behind your visualizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Select a data source to view records
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Data Analysis</CardTitle>
              <CardDescription>
                Statistical analysis and insights from your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Run analysis to discover patterns and insights
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
