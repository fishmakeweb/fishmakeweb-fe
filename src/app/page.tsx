import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Play, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Programming
              <span className="text-blue-600"> Step by Step</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Master HTML, CSS, and more through interactive lessons, hands-on exercises, 
              and real-time code evaluation. Start your programming journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/programs">
                  <Play className="mr-2 h-5 w-5" />
                  Start Learning
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                View Programs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose FishMakeWeb?
            </h2>
            <p className="text-lg text-gray-600">
              Our platform offers a comprehensive learning experience for aspiring programmers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Code className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Interactive Code Editor</CardTitle>
                <CardDescription>
                  Write and test your code in real-time with our built-in Monaco editor
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Structured Lessons</CardTitle>
                <CardDescription>
                  Learn through carefully crafted lessons with theory, examples, and practice
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-purple-600 mb-4" />
                <CardTitle>Instant Feedback</CardTitle>
                <CardDescription>
                  Get immediate results and feedback on your code through automated testing
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Programs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Programs
            </h2>
            <p className="text-lg text-gray-600">
              Start with our foundational programs and build your skills progressively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-orange-600" />
                  Learning HTML & CSS
                </CardTitle>
                <CardDescription>
                  Master the fundamentals of web development with HTML structure and CSS styling
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>• Introduction to HTML</p>
                  <p>• CSS Basics & Styling</p>
                  <p>• Box Model & Layout</p>
                  <p>• Responsive Design</p>
                </div>
                <Button asChild className="w-full">
                  <Link href="/programs/html-css">
                    Start Program
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-yellow-600" />
                  JavaScript Fundamentals
                </CardTitle>
                <CardDescription>
                  Coming soon - Learn the language that powers the web
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>• Variables & Data Types</p>
                  <p>• Functions & Scope</p>
                  <p>• DOM Manipulation</p>
                  <p>• Event Handling</p>
                </div>
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="opacity-60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5 text-blue-600" />
                  React Basics
                </CardTitle>
                <CardDescription>
                  Coming soon - Build modern web applications with React
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>• Components & JSX</p>
                  <p>• State & Props</p>
                  <p>• Event Handling</p>
                  <p>• Hooks & Effects</p>
                </div>
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
