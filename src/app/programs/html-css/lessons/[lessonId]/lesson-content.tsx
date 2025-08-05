"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CodeEditor from "@/components/code-editor";
import { ArrowLeft, ArrowRight, BookOpen, Target } from "lucide-react";

interface LessonData {
  id: string;
  title: string;
  description: string;
  theory: {
    title: string;
    content: string[];
    examples: {
      title: string;
      code: string;
      explanation: string;
    }[];
  };
  exercise: {
    title: string;
    description: string;
    initialCode: string;
    language: "html" | "css" | "javascript";
    expectedOutput?: string;
  };
  nextLessonId?: string;
  prevLessonId?: string;
}

interface LessonContentProps {
  lesson: LessonData;
}

export default function LessonContent({ lesson }: LessonContentProps) {
  const [testResults, setTestResults] = useState<{
    passed: boolean;
    message: string;
    details?: string[];
  } | null>(null);

  const handleCodeSubmit = async (code: string) => {
    // Simulate API call to backend for code evaluation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock test results - in real implementation this would come from backend
    if (lesson.id === "1") {
      const hasHeading = code.includes("<h1>") || code.includes("<h2>");
      const hasParagraph = code.includes("<p>");
      const hasList = code.includes("<ul>") || code.includes("<ol>");
      
      if (hasHeading && hasParagraph && hasList) {
        setTestResults({
          passed: true,
          message: "Great job! Your HTML structure is correct.",
          details: [
            "✓ HTML document structure is valid",
            "✓ Includes heading element",
            "✓ Includes paragraph element", 
            "✓ Includes list element"
          ]
        });
      } else {
        setTestResults({
          passed: false,
          message: "Your HTML is missing some required elements.",
          details: [
            hasHeading ? "✓ Includes heading element" : "✗ Missing heading element (h1, h2, etc.)",
            hasParagraph ? "✓ Includes paragraph element" : "✗ Missing paragraph element",
            hasList ? "✓ Includes list element" : "✗ Missing list element (ul or ol)"
          ]
        });
      }
    } else {
      setTestResults({
        passed: true,
        message: "Code submitted successfully!",
        details: ["This is a mock result. In a real implementation, this would be evaluated by the backend."]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href="/programs/html-css">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Program
            </Link>
          </Button>
          
          <div className="flex items-center space-x-2">
            {lesson.prevLessonId && (
              <Button variant="outline" asChild>
                <Link href={`/programs/html-css/lessons/${lesson.prevLessonId}`}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Link>
              </Button>
            )}
            {lesson.nextLessonId && (
              <Button asChild>
                <Link href={`/programs/html-css/lessons/${lesson.nextLessonId}`}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded mr-3">
              Lesson {lesson.id}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-lg text-gray-600">{lesson.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Theory Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  {lesson.theory.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lesson.theory.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </CardContent>
            </Card>

            {/* Examples */}
            {lesson.theory.examples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{example.title}</CardTitle>
                  <CardDescription>{example.explanation}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Exercise Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Exercise
                </CardTitle>
                <CardDescription>{lesson.exercise.description}</CardDescription>
              </CardHeader>
            </Card>

            <CodeEditor
              initialCode={lesson.exercise.initialCode}
              language={lesson.exercise.language}
              height="500px"
              onSubmit={handleCodeSubmit}
              testResults={testResults}
            />
          </div>
        </div>
      </div>
    </div>
  );
}