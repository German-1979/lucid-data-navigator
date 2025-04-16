
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, BarChart3, FileText, Database, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AnalysisPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Analysis</h1>
          <p className="text-muted-foreground">
            Analyze and transform your data
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="statistics" className="w-full">
        <TabsList>
          <TabsTrigger value="statistics">
            <Calculator className="h-4 w-4 mr-2" />
            Statistics
          </TabsTrigger>
          <TabsTrigger value="transformation">
            <TrendingUp className="h-4 w-4 mr-2" />
            Transformation
          </TabsTrigger>
          <TabsTrigger value="etl">
            <Database className="h-4 w-4 mr-2" />
            ETL Processes
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="statistics" className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnalysisCard 
              title="Descriptive Statistics" 
              description="Calculate mean, median, mode, and standard deviation"
              icon={<Calculator className="h-6 w-6 text-data-blue" />}
              features={["Mean", "Median", "Standard deviation", "Quartiles", "Min/Max values"]}
            />
            
            <AnalysisCard 
              title="Correlation Analysis" 
              description="Find relationships between variables"
              icon={<TrendingUp className="h-6 w-6 text-data-purple" />}
              features={["Pearson correlation", "Scatter plots", "Heatmaps", "Linear regression"]}
            />
            
            <AnalysisCard 
              title="Distribution Analysis" 
              description="Analyze the distribution of your data"
              icon={<BarChart3 className="h-6 w-6 text-data-teal" />}
              features={["Histograms", "Box plots", "Density plots", "Normal distribution test"]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="transformation" className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalysisCard 
              title="Data Cleaning" 
              description="Clean and prepare your data for analysis"
              icon={<FileText className="h-6 w-6 text-data-green" />}
              features={["Remove duplicates", "Fill missing values", "Outlier detection", "Data type conversion"]}
            />
            
            <AnalysisCard 
              title="Feature Engineering" 
              description="Create new features from existing data"
              icon={<Brain className="h-6 w-6 text-data-orange" />}
              features={["Date extraction", "Text tokenization", "Binning", "Scaling", "Encoding"]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="etl" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle>ETL Processes</CardTitle>
              <CardDescription>Extract, transform, and load your data</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <Database className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No ETL processes configured</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Create an ETL pipeline to automate data extraction, transformation, and loading processes
              </p>
              <Button>Create ETL Process</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and schedule reports</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No reports configured</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Create reports to summarize and share insights from your data
              </p>
              <Button>Create Report</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AnalysisCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const AnalysisCard = ({ title, description, icon, features }: AnalysisCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex flex-row items-start space-y-0">
        <div>
          {icon}
          <CardTitle className="mt-4">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-1.5">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="mr-1.5 mb-1.5">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Run Analysis</Button>
      </CardFooter>
    </Card>
  );
};

export default AnalysisPage;
