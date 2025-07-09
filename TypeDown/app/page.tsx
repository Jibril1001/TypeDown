"use client";

import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import { Download, Eye, Code, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features
- Live Preview
- Export as Markdown or HTML

### Example Code
\`\`\`js
console.log("Hello!");
\`\`\`
`);

  const [html, setHtml] = useState('');

  useEffect(() => {
    setHtml(marked(markdown));
  }, [markdown]);

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html><head><title>Markdown</title></head><body>${html}</body></html>`;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">TypeDown</h1>

        {/* Toolbar */}
        <div className="flex gap-2 mb-4">
          <Button onClick={downloadMarkdown} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Download MD
          </Button>
          <Button onClick={downloadHTML} variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-1" />
            Download HTML
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Markdown Editor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code className="h-5 w-5" />
                Markdown Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Type your Markdown here..."
                className="w-full h-96 resize-none font-mono text-sm"
              />
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Eye className="h-5 w-5" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;