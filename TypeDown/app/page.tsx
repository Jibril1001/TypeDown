"use client";

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Download, Eye, Code, FileText, Maximize2, Minimize2, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';


const Home = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features
- **Live Preview** - See your changes in real-time
- **Download Options** - Export as Markdown, HTML, or PDF
- **Syntax Highlighting** - Beautiful code formatting
- **Responsive Design** - Works on all devices

### Example Code Block
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists
1. First item
2. Second item
3. Third item

- Bullet point
- Another bullet
- Last bullet

### Links and Images
[Visit GitHub](https://github.com)

> This is a blockquote
> It can span multiple lines

---

**Bold text** and *italic text* and ~~strikethrough~~

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`);

  const [html, setHtml] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const convertMarkdown = async () => {
      try {
        const htmlContent = await marked(markdown);
        setHtml(htmlContent);
      } catch (error) {
        console.error('Markdown conversion error:', error);
      }
    };
    convertMarkdown();
  }, [markdown]);

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadHTML = () => {
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
${html}
</body>
</html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = async () => {
    const previewElement = document.querySelector('.preview-content');
    if (!previewElement) return;

    try {
      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        margin: 0.5,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(previewElement).save();
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };




  


  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 mt-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-black to-indigo-500 text-transparent bg-clip-text">
                TypeDown
              </h1>
              <p className="text-gray-600">Write Markdown on the left, see the preview on the right</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Live Preview
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="hidden md:flex"
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Ad Space Placeholder */}
        <Card className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 border-dashed border-2 border-green-300">
          <CardContent className="p-4">
            <div className="text-center text-green-700">
              <p className="text-sm font-medium">🎯 Premium Ad Space</p>
              <p className="text-xs text-green-600 mt-1">Reach developers and content creators</p>
            </div>
          </CardContent>
        </Card>
        

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-white rounded-lg shadow-sm border">
          <div className="flex items-center gap-1">
            <Code className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Actions:</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <Button
            variant="outline"
            size="sm"
            onClick={downloadMarkdown}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Download MD
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadHTML}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Download HTML
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadPDF}
            className="flex items-center gap-1"
          >
            <FileDown className="h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Editor Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <Card className="h-[600px] lg:h-[700px]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5" />
                Markdown Input
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-80px)]">
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type your Markdown here..."
                className="w-full h-full resize-none border-0 focus:ring-0 font-mono text-sm p-4 rounded-none"
              />
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card className="h-[600px] lg:h-[700px]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 h-[calc(100%-80px)] overflow-y-auto">
              <div
                className="preview-content prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-code:text-pink-600 prose-pre:bg-gray-100 prose-blockquote:border-l-blue-500"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Footer Ad Space */}
        <Card className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 border-dashed border-2 border-purple-300">
          <CardContent className="p-4">
            <div className="text-center text-purple-700">
              <p className="text-sm font-medium">📢 Advertisement Space</p>
              <p className="text-xs text-purple-600 mt-1">Future ads will appear here</p>
            </div>
          </CardContent>
        </Card>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-900 mb-2">🚀 Real-time Preview</h3>
            <p className="text-sm text-gray-600">See your markdown rendered instantly as you type</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-900 mb-2">📁 Export Options</h3>
            <p className="text-sm text-gray-600">Download as Markdown, HTML, or PDF with styling</p>
          </Card>
          <Card className="p-4 bg-white/80 backdrop-blur-sm">
            <h3 className="font-semibold text-gray-900 mb-2">🎨 Beautiful Design</h3>
            <p className="text-sm text-gray-600">Clean, modern interface built with shadcn/ui</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
