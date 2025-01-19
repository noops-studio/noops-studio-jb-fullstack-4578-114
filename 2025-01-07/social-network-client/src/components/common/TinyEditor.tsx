import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

export default function TinyEditor({
  value,
  onChange,
  placeholder = 'Type your content here...',
  height = 300,
}: TinyEditorProps) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_KEY}
      value={value}
      init={{
        height,
        menubar: false,
        plugins: ['lists', 'link', 'emoticons'],
        toolbar: 'undo redo | bold italic | bullist numlist outdent indent | emoticons',
        placeholder,
        content_style: `
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
          }
        `,
      }}
      onEditorChange={onChange}
    />
  );
}
