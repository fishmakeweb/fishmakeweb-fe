"use client";

import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, RotateCcw, Check, X, Eye, Code, Split, Maximize2 } from "lucide-react";

interface TestCaseResult {
  testName: string;
  passed: boolean;
  message: string;
  points: number;
}

interface SubmissionResult {
  submissionId: string;
  score: number;
  maxScore: number;
  isCompleted: boolean;
  feedback: string;
  submittedAt: string;
}

interface CodeEditorProps {
  initialCode?: string;
  language?: "html" | "css" | "javascript";
  height?: string;
  onCodeChange?: (code: string) => void;
  onSubmit?: (code: string) => Promise<SubmissionResult>;
  exerciseId?: string;
  showPreview?: boolean;
  splitView?: boolean;
}

type ViewMode = "split" | "editor" | "preview";

export default function CodeEditor({
  initialCode = "",
  language = "html",
  height = "500px",
  onCodeChange,
  onSubmit,
  exerciseId,
  showPreview = true,
  splitView = true,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(splitView ? "split" : "editor");
  const [previewKey, setPreviewKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update preview when code changes (debounced)
  useEffect(() => {
    if (!showPreview || !code.trim()) return;
    
    const timer = setTimeout(() => {
      setPreviewKey(prev => prev + 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [code, showPreview]);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || "";
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleSubmit = async () => {
    if (!onSubmit) return;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(code);
      setSubmissionResult(result);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    onCodeChange?.(initialCode);
    setSubmissionResult(null);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case "html":
        return "HTML";
      case "css":
        return "CSS";
      case "javascript":
        return "JavaScript";
      default:
        return "Code";
    }
  };

  const getPreviewContent = () => {
    if (language === "html") {
      return code;
    } else if (language === "css") {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .preview-container { border: 1px solid #ddd; border-radius: 4px; padding: 20px; }
            ${code}
          </style>
        </head>
        <body>
          <div class="preview-container">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <p>This is a paragraph for testing CSS styles.</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
              <li>List item 3</li>
            </ul>
            <button>Sample Button</button>
          </div>
        </body>
        </html>
      `;
    } else if (language === "javascript") {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .container { border: 1px solid #ddd; border-radius: 4px; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 id="title">Hello World</h1>
            <button onclick="changeTitle()">Click me</button>
            <p id="output">Output will appear here</p>
          </div>
          <script>
            ${code}
          </script>
        </body>
        </html>
      `;
    }
    return "";
  };

  const renderTestResults = () => {
    if (!submissionResult) return null;

    let testResults: TestCaseResult[] = [];
    try {
      const feedback = JSON.parse(submissionResult.feedback);
      testResults = feedback.TestDetails || [];
    } catch {
      // If feedback is not JSON, show basic result
      testResults = [{
        testName: "Submission",
        passed: submissionResult.isCompleted,
        message: "Code submitted successfully",
        points: submissionResult.score
      }];
    }

    return (
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Test Results</span>
            <Badge 
              className={submissionResult.isCompleted ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
            >
              {submissionResult.score}/{submissionResult.maxScore} points
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testResults.map((test, index) => (
              <div 
                key={index}
                className={`p-3 rounded-md border-l-4 ${
                  test.passed 
                    ? "border-l-green-500 bg-green-50" 
                    : "border-l-red-500 bg-red-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  {test.passed ? (
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`font-medium ${
                      test.passed ? "text-green-800" : "text-red-800"
                    }`}>
                      {test.testName} ({test.points} points)
                    </p>
                    <p className={`text-sm mt-1 ${
                      test.passed ? "text-green-700" : "text-red-700"
                    }`}>
                      {test.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{getLanguageLabel()} Editor</CardTitle>
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              {showPreview && (
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="split" className="flex items-center gap-1">
                      <Split className="h-3 w-3" />
                      Split
                    </TabsTrigger>
                    <TabsTrigger value="editor" className="flex items-center gap-1">
                      <Code className="h-3 w-3" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !onSubmit}
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-1" />
                  {isSubmitting ? "Submitting..." : "Submit Code"}
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Area */}
      <div className={`${
        viewMode === "split" ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : ""
      }`}>
        {/* Code Editor */}
        {(viewMode === "editor" || viewMode === "split") && (
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md overflow-hidden">
                <Editor
                  height={viewMode === "split" ? "400px" : height}
                  language={language}
                  value={code}
                  onChange={handleEditorChange}
                  theme="vs-light"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: "on",
                    folding: true,
                    bracketMatching: "always",
                    autoIndent: "full",
                  }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Preview */}
        {showPreview && (viewMode === "preview" || viewMode === "split") && (
          <Card className="h-fit">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                Live Preview
                <Badge variant="outline" className="text-xs">
                  Real-time
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md bg-white overflow-hidden">
                <iframe
                  key={previewKey}
                  ref={iframeRef}
                  srcDoc={getPreviewContent()}
                  className={`w-full border-0 ${
                    viewMode === "split" ? "h-[400px]" : "h-[500px]"
                  }`}
                  title="Live Preview"
                  sandbox="allow-scripts allow-same-origin"
                  style={{ backgroundColor: "white" }}
                />
              </div>
              {!code.trim() && (
                <p className="text-center text-gray-500 mt-4 text-sm">
                  Start coding to see the live preview
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Test Results */}
      {renderTestResults()}
    </div>
  );
}