import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Clock, CheckCircle, Play, Code } from "lucide-react";

const lessons = [
  {
    id: "1",
    title: "Introduction to HTML",
    description: "Learn HTML document structure, common tags, and semantic elements",
    duration: "30 min",
    topics: ["HTML Document Structure", "Basic Tags", "Semantic Elements", "Attributes"],
    completed: false,
  },
  {
    id: "2", 
    title: "CSS Basics",
    description: "Understand CSS selectors, properties, and styling fundamentals",
    duration: "35 min",
    topics: ["CSS Selectors", "Properties & Values", "Colors & Typography", "Basic Styling"],
    completed: false,
  },
  {
    id: "3",
    title: "Box Model & Layout",
    description: "Master the CSS box model and layout techniques",
    duration: "40 min", 
    topics: ["Box Model", "Margin & Padding", "Display Properties", "Positioning"],
    completed: false,
  },
  {
    id: "4",
    title: "Responsive Design",
    description: "Create responsive layouts that work on all devices",
    duration: "45 min",
    topics: ["Media Queries", "Flexible Grid", "Responsive Images", "Mobile-First Design"],
    completed: false,
  },
];

export default function HtmlCssProgramPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Program Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center mb-4">
            <Code className="h-10 w-10 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">Learning HTML & CSS</h1>
              <p className="text-orange-100">Master the fundamentals of web development</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>4 Interactive Lessons</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>~2.5 Hours Total</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Beginner Friendly</span>
            </div>
          </div>
        </div>

        {/* Program Overview */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>What You&apos;ll Learn</CardTitle>
                <CardDescription>
                  This program covers everything you need to know to start building websites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">HTML Skills</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Document structure and DOCTYPE</li>
                      <li>• Semantic HTML5 elements</li>
                      <li>• Forms and input validation</li>
                      <li>• Accessibility best practices</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">CSS Skills</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Selectors and specificity</li>
                      <li>• Box model and layout</li>
                      <li>• Flexbox and Grid basics</li>
                      <li>• Responsive design principles</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Program Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completed</span>
                      <span>0/4 lessons</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "0%" }}></div>
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/programs/html-css/lessons/${lessons[0].id}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Start First Lesson
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Lessons List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Lessons</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded mr-3">
                          Lesson {lesson.id}
                        </span>
                        {lesson.completed && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{lesson.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{lesson.duration}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {lesson.topics.map((topic) => (
                          <span
                            key={topic}
                            className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ml-6">
                      <Button asChild variant={lesson.completed ? "outline" : "default"}>
                        <Link href={`/programs/html-css/lessons/${lesson.id}`}>
                          {lesson.completed ? "Review" : "Start Lesson"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Program Completion */}
        <div className="mt-12 bg-white rounded-lg p-8 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Complete this program to earn your certificate!
          </h2>
          <p className="text-gray-600 mb-6">
            Finish all lessons and pass the final project to demonstrate your HTML & CSS skills.
          </p>
          <div className="text-sm text-gray-500">
            Certificate will be available after completing all lessons
          </div>
        </div>
      </div>
    </div>
  );
}