
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { MessageSquare, Send, Bot, User, RefreshCw, Database, BarChart4, ArrowRight } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your AI data assistant. I can help you analyze your data, generate insights, and answer questions about your datasets. How can I help you today?",
    sender: "assistant",
    timestamp: new Date(),
  },
];

const suggestionPrompts = [
  "Analyze the trend in my sales data for the last 6 months",
  "Find correlations between customer age and purchase amount",
  "Generate a summary of my customer feedback data",
  "What insights can you provide about my inventory turnover?",
  "Create a forecast for the next quarter based on historical data",
];

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        sender: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    // This is a mock function that would be replaced with actual GPT integration
    const lowercasedInput = input.toLowerCase();
    
    if (lowercasedInput.includes("sales")) {
      return "Looking at your sales data, I can see an upward trend of 15% over the last 6 months. The strongest growth was in March and April. Would you like me to create a visualization of this trend?";
    } else if (lowercasedInput.includes("correlation") || lowercasedInput.includes("age")) {
      return "I've analyzed the relationship between customer age and purchase amount. There's a moderate positive correlation (r=0.42), suggesting that older customers tend to spend more. The 35-45 age group has the highest average purchase value.";
    } else if (lowercasedInput.includes("summary") || lowercasedInput.includes("feedback")) {
      return "I've analyzed your customer feedback data. Key themes include: product quality (mentioned positively in 78% of feedback), customer service (65% positive mentions), and delivery speed (some concerns, with 25% negative mentions). Would you like a detailed breakdown?";
    } else if (lowercasedInput.includes("inventory") || lowercasedInput.includes("turnover")) {
      return "Your inventory turnover rate is 5.2, which is above the industry average of 4.3. Your electronics category has the highest turnover rate at 7.1, while furniture has the lowest at 3.2. This suggests potential opportunities to optimize your furniture inventory levels.";
    } else if (lowercasedInput.includes("forecast") || lowercasedInput.includes("predict")) {
      return "Based on historical patterns and seasonality, I predict a 12% increase in revenue for the next quarter. This forecast takes into account your typical Q3 performance, current market trends, and your recent marketing campaigns.";
    } else {
      return "I understand you're interested in analyzing your data. Could you provide more details about what specific aspects you'd like to explore? I can help with trend analysis, finding correlations, generating summaries, or making predictions.";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const applySuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="container mx-auto py-6 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI Assistant</h1>
          <p className="text-muted-foreground">
            Get insights and answers from your data
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center">
                <Bot className="h-5 w-5 text-primary mr-2" />
                <CardTitle>Data AI Assistant</CardTitle>
              </div>
              <CardDescription>
                Ask questions about your data and get AI-powered insights
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden">
              <ScrollArea className="h-[calc(100vh-18rem)]">
                <div className="space-y-4 pr-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${
                          message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <Avatar className={message.sender === "user" ? "bg-primary" : "bg-data-teal"}>
                          {message.sender === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                        </Avatar>
                        <div
                          className={`p-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        <Avatar className="bg-data-teal">
                          <Bot className="h-5 w-5" />
                        </Avatar>
                        <div className="p-3 rounded-lg bg-muted h-10 flex items-center">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                            <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full items-center space-x-2">
                <Textarea
                  placeholder="Ask a question about your data..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-h-[60px] max-h-[120px]"
                />
                <Button size="icon" onClick={handleSend} disabled={!inputValue.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
        
        <div className="hidden lg:block">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Suggestions</CardTitle>
              <CardDescription>
                Try asking these questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestionPrompts.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto py-3 px-4 whitespace-normal text-left"
                  onClick={() => applySuggestion(suggestion)}
                >
                  <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{suggestion}</span>
                </Button>
              ))}
            </CardContent>
            <CardFooter className="flex-col items-start space-y-4">
              <div className="w-full">
                <h3 className="text-sm font-medium mb-2">Available Tools</h3>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Database className="h-4 w-4 mr-2 text-data-blue" />
                    <span>Data Analysis</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BarChart4 className="h-4 w-4 mr-2 text-data-green" />
                    <span>Visualization</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <RefreshCw className="h-4 w-4 mr-2 text-data-purple" />
                    <span>Prediction</span>
                  </div>
                </div>
              </div>
              
              <Button variant="link" className="px-0">
                <span>Learn more about AI capabilities</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
