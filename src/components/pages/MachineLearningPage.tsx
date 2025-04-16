
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, TrendingUp, Layers, BarChart4, Upload, GanttChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ModelCardProps {
  title: string;
  type: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

const ModelCard = ({ title, type, description, features, icon }: ModelCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            {icon}
            <CardTitle className="mt-4">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge>{type}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1.5">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary" className="mr-1.5 mb-1.5">
              {feature}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Model</Button>
      </CardFooter>
    </Card>
  );
};

const MachineLearningPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Machine Learning</h1>
          <p className="text-muted-foreground">
            Create, train, and deploy machine learning models
          </p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Import Model
        </Button>
      </div>
      
      <Tabs defaultValue="models" className="w-full">
        <TabsList>
          <TabsTrigger value="models">
            <BrainCircuit className="h-4 w-4 mr-2" />
            Models
          </TabsTrigger>
          <TabsTrigger value="training">
            <GanttChart className="h-4 w-4 mr-2" />
            Training
          </TabsTrigger>
          <TabsTrigger value="evaluation">
            <BarChart4 className="h-4 w-4 mr-2" />
            Evaluation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ModelCard 
              title="Linear Regression" 
              type="Regression"
              description="Predict continuous values based on input features"
              features={["Numerical prediction", "Feature importance", "Simple interpretability"]}
              icon={<TrendingUp className="h-8 w-8 text-data-blue" />}
            />
            
            <ModelCard 
              title="Classification" 
              type="Classification"
              description="Categorize data into predefined classes"
              features={["Binary classification", "Multi-class", "Probability scores"]}
              icon={<Layers className="h-8 w-8 text-data-green" />}
            />
            
            <ModelCard 
              title="Clustering" 
              type="Unsupervised"
              description="Group similar data points together"
              features={["K-means", "Hierarchical", "Density-based"]}
              icon={<BrainCircuit className="h-8 w-8 text-data-purple" />}
            />
          </div>
          
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Custom Model</CardTitle>
              <CardDescription>
                Build a custom machine learning model with Python
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <BrainCircuit className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Create a custom model using Python libraries like scikit-learn, PyTorch, or TensorFlow
              </p>
              <Button>Create Custom Model</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Training</CardTitle>
              <CardDescription>Train machine learning models on your data</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <GanttChart className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No training jobs</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Create a model and start training it on your data
              </p>
              <Button>Start Training</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="evaluation" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Evaluation</CardTitle>
              <CardDescription>Evaluate model performance and metrics</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-12">
              <BarChart4 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No models to evaluate</h3>
              <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                Train a model first to evaluate its performance
              </p>
              <Button>Create Model</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MachineLearningPage;
