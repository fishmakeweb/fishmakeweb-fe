import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Users, Clock } from "lucide-react";

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Programming Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully designed programs to start your programming journey. 
            Each program includes interactive lessons, hands-on exercises, and real-world projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* HTML & CSS Program */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Code className="h-8 w-8 text-orange-600" />
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Available
                </span>
              </div>
              <CardTitle className="text-xl">Learning HTML & CSS</CardTitle>
              <CardDescription>
                Master the fundamentals of web development with HTML structure and CSS styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>4 Lessons</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>~2 hours</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Beginner Level</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-700">
                  <h4 className="font-medium">What you&apos;ll learn:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• HTML document structure and semantic elements</li>
                    <li>• CSS selectors, properties, and styling techniques</li>
                    <li>• Box model and layout fundamentals</li>
                    <li>• Responsive design principles</li>
                  </ul>
                </div>
                
                <Button asChild className="w-full">
                  <Link href="/programs/html-css">
                    Start Program
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* JavaScript Program */}
          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Code className="h-8 w-8 text-yellow-600" />
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>
              <CardTitle className="text-xl">JavaScript Fundamentals</CardTitle>
              <CardDescription>
                Learn the programming language that powers the web and interactive applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>6 Lessons</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>~4 hours</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Beginner to Intermediate</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-700">
                  <h4 className="font-medium">What you&apos;ll learn:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Variables, data types, and operators</li>
                    <li>• Functions and control structures</li>
                    <li>• DOM manipulation and event handling</li>
                    <li>• Asynchronous programming basics</li>
                  </ul>
                </div>
                
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* React Program */}
          <Card className="opacity-75">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Code className="h-8 w-8 text-blue-600" />
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              </div>
              <CardTitle className="text-xl">React Basics</CardTitle>
              <CardDescription>
                Build modern, interactive web applications with React library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>8 Lessons</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>~6 hours</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Intermediate Level</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-700">
                  <h4 className="font-medium">What you&apos;ll learn:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Components and JSX syntax</li>
                    <li>• State management and props</li>
                    <li>• Event handling and user interaction</li>
                    <li>• Hooks and modern React patterns</li>
                  </ul>
                </div>
                
                <Button disabled className="w-full">
                  Coming Soon
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 mb-6">
            Begin with our HTML & CSS program and build a solid foundation for web development.
          </p>
          <Button asChild size="lg">
            <Link href="/programs/html-css">
              Start with HTML & CSS
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}