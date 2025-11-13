// src/components/blog-editor/BlogEditor.jsx
import React, { useState, useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { editorExtensions, editorProps } from "./editorConfig";
import EditorToolbar from "./EditorToolbar";
import ImageUploadDialog from "./ImageUploadDialog";

const BlogEditor = ({ content = "", onChange }) => {
  const [showImageDialog, setShowImageDialog] = useState(false);

  useEffect(() => {
    if (content === "") {
      editor?.commands.clearContent(true);
    }
  }, [content]);

  const editor = useEditor({
    extensions: editorExtensions,
    content,
    editorProps,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleInsertImage = (src, caption) => {
    if (!editor) return;

    const imageHtml = caption
      ? `<figure><img src="${src}" alt="${caption}" class="max-w-full h-auto rounded-lg" /><figcaption class="text-center text-sm text-gray-400 italic mt-2">${caption}</figcaption></figure>`
      : `<img src="${src}" alt="Blog image" class="max-w-full h-auto rounded-lg" />`;

    editor.chain().focus().insertContent(imageHtml).run();
  };

  if (!editor) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-800 rounded-lg">
        <div className="text-white">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
      <label className="block text-white mb-3 font-medium">Blog Content</label>

      {/* Toolbar */}
      <EditorToolbar
        editor={editor}
        onImageClick={() => setShowImageDialog(true)}
      />

      {/* Editor Content */}
      <div className="bg-gray-800 border border-t-0 border-gray-700 rounded-b-lg">
        <EditorContent editor={editor} />
      </div>

      <p className="text-gray-400 text-sm mt-2">
        Use the toolbar above to format your content. You can add images with
        captions, tables, links, and rich formatting.
      </p>

      {/* Image Upload Dialog */}
      <ImageUploadDialog
        isOpen={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        onInsertImage={handleInsertImage}
      />
    </div>
  );
};

export default BlogEditor;
