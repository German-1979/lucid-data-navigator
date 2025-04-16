
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, FileSpreadsheet, FileJson, File, X, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UploadedFile {
  name: string;
  type: string;
  size: number;
  data: any;
}

const FileUpload = ({ onFileUploaded }: { onFileUploaded: (file: UploadedFile) => void }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("csv") || fileType.includes("excel") || fileType.includes("spreadsheet")) {
      return <FileSpreadsheet className="h-6 w-6 text-data-green" />;
    } else if (fileType.includes("json")) {
      return <FileJson className="h-6 w-6 text-data-orange" />;
    } else {
      return <File className="h-6 w-6 text-data-blue" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  const processFile = async (file: File) => {
    setIsLoading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const result = e.target?.result;
        let parsedData: any = null;
        
        // Parse the file based on its type
        if (file.type === "application/json") {
          try {
            parsedData = JSON.parse(result as string);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            toast({
              title: "Error parsing JSON file",
              description: "The file could not be parsed correctly",
              variant: "destructive",
            });
            setIsLoading(false);
            return;
          }
        } else if (
          file.type === "text/csv" || 
          file.name.endsWith(".csv")
        ) {
          // Simple CSV parsing (in a real app, use a proper CSV parser library)
          const lines = (result as string).split("\n");
          const headers = lines[0].split(",");
          
          parsedData = lines.slice(1).map(line => {
            const values = line.split(",");
            const row: Record<string, string> = {};
            
            headers.forEach((header, index) => {
              row[header.trim()] = values[index]?.trim() || "";
            });
            
            return row;
          });
        } else {
          // For Excel files, we'd typically use a library like xlsx
          // For this demo, we'll just store the raw text
          parsedData = result;
        }
        
        const uploadedFile: UploadedFile = {
          name: file.name,
          type: file.type || (file.name.endsWith(".csv") ? "text/csv" : "application/octet-stream"),
          size: file.size,
          data: parsedData
        };
        
        // Call the callback with the uploaded file
        onFileUploaded(uploadedFile);
        
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been processed`,
          variant: "default",
        });
        
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "Could not read the selected file",
          variant: "destructive",
        });
        setIsLoading(false);
      };
      
      if (file.type === "application/json" || file.type === "text/csv" || file.name.endsWith(".csv")) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Error processing file",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      processFile(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload Data File</CardTitle>
        <CardDescription>
          Upload CSV, Excel, or JSON files to analyze
        </CardDescription>
      </CardHeader>
      <CardContent>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls,.json"
          onChange={handleFileChange}
        />
        
        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-md ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
            } p-8 flex flex-col items-center justify-center gap-2 transition-all`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <FileUp className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground text-center">
              Drag and drop your file here, or{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={handleButtonClick}
              >
                click to browse
              </span>
            </p>
            <p className="text-xs text-muted-foreground/75">
              Supports CSV, Excel, and JSON files
            </p>
          </div>
        ) : (
          <div className="border rounded-md p-4">
            <div className="flex items-center">
              {getFileIcon(selectedFile.type)}
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full" />
              ) : (
                <button 
                  onClick={clearSelectedFile}
                  className="text-muted-foreground/50 hover:text-destructive"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            {isLoading && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-1 h-1 bg-muted overflow-hidden rounded-full">
                  <div className="h-full bg-primary w-2/3 animate-pulse" />
                </div>
                <span className="text-xs text-muted-foreground">Processing...</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={clearSelectedFile} disabled={!selectedFile || isLoading}>
          Clear
        </Button>
        <Button onClick={handleButtonClick} disabled={isLoading}>
          {selectedFile ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <FileUp className="mr-2 h-4 w-4" />
          )}
          {selectedFile ? "Change File" : "Select File"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileUpload;
