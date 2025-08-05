import Link from "next/link";
import LessonContent from "./lesson-content";

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

const lessonsData: Record<string, LessonData> = {
  "1": {
    id: "1",
    title: "Introduction to HTML",
    description: "Learn HTML document structure, common tags, and semantic elements",
    theory: {
      title: "HTML Fundamentals",
      content: [
        "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure and content of a web page using elements and tags.",
        "Every HTML document starts with a DOCTYPE declaration and contains a structured hierarchy of elements including <html>, <head>, and <body> sections.",
        "HTML elements are defined by tags, which are keywords enclosed in angle brackets. Most elements have opening and closing tags, like <p>content</p>.",
      ],
      examples: [
        {
          title: "Basic HTML Structure",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
</head>
<body>
    <h1>Welcome to HTML!</h1>
    <p>This is a paragraph of text.</p>
</body>
</html>`,
          explanation: "This shows the basic structure every HTML document should have, including the DOCTYPE, html, head, and body elements."
        },
        {
          title: "Common HTML Elements",
          code: `<h1>Main Heading</h1>
<h2>Subheading</h2>
<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<ul>
    <li>First list item</li>
    <li>Second list item</li>
</ul>
<a href="https://example.com">This is a link</a>`,
          explanation: "These are some of the most commonly used HTML elements for headings, paragraphs, text formatting, lists, and links."
        }
      ]
    },
    exercise: {
      title: "Create Your First HTML Page",
      description: "Create a simple HTML page with a heading, paragraph, and list. Make sure to include the proper HTML document structure.",
      initialCode: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <!-- Add your content here -->
    
</body>
</html>`,
      language: "html",
    },
    nextLessonId: "2",
  },
  "2": {
    id: "2",
    title: "CSS Basics",
    description: "Understand CSS selectors, properties, and styling fundamentals",
    theory: {
      title: "Introduction to CSS",
      content: [
        "CSS (Cascading Style Sheets) is used to style and layout web pages. It controls the visual presentation of HTML elements.",
        "CSS works by selecting HTML elements and applying styling properties to them. Selectors determine which elements to style, and properties define how they should look.",
        "CSS can be applied in three ways: inline styles, internal stylesheets, and external stylesheets. External stylesheets are generally preferred for better organization.",
      ],
      examples: [
        {
          title: "Basic CSS Selectors",
          code: `/* Element selector */
p {
    color: blue;
    font-size: 16px;
}

/* Class selector */
.highlight {
    background-color: yellow;
    padding: 10px;
}

/* ID selector */
#main-title {
    text-align: center;
    color: red;
}`,
          explanation: "These are the three most basic CSS selectors: element (selects all elements of a type), class (selects elements with a specific class), and ID (selects a single element with a specific ID)."
        }
      ]
    },
    exercise: {
      title: "Style Text with CSS",
      description: "Use CSS to style text elements. Apply different colors, fonts, and sizes to create an attractive layout.",
      initialCode: `/* Add your CSS styles here */
body {
    font-family: Arial, sans-serif;
}

/* Style the heading */

/* Style the paragraph */

/* Style the list */`,
      language: "css",
    },
    nextLessonId: "3",
    prevLessonId: "1",
  },
  // Add more lessons as needed
};

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = lessonsData[lessonId];

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
            <Link 
              href="/programs/html-css"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Program
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <LessonContent lesson={lesson} />;
}