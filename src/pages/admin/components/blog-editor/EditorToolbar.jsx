// src/components/blog-editor/EditorToolbar.jsx
import React from "react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Table as TableIcon,
  Columns,
  Rows,
  X,
} from "lucide-react";
import EditorMenuButton from "./EditorMenuButton";

const EditorToolbar = ({ editor, onImageClick }) => {
  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="bg-gray-800 rounded-t-lg border border-gray-700 p-2 flex flex-wrap gap-1">
      {/* Text Formatting */}
      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        title="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
        title="Strikethrough"
      >
        <Strikethrough className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive("code")}
        title="Code"
      >
        <Code className="w-4 h-4" />
      </EditorMenuButton>

      <div className="w-px h-8 bg-gray-700 mx-1" />

      {/* Headings */}
      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive("heading", { level: 1 })}
        title="Heading 1"
      >
        <Heading1 className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive("heading", { level: 2 })}
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </EditorMenuButton>

      <div className="w-px h-8 bg-gray-700 mx-1" />

      {/* Lists */}
      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive("blockquote")}
        title="Quote"
      >
        <Quote className="w-4 h-4" />
      </EditorMenuButton>

      <div className="w-px h-8 bg-gray-700 mx-1" />

      {/* Alignment */}
      <EditorMenuButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </EditorMenuButton>

      <div className="w-px h-8 bg-gray-700 mx-1" />

      {/* Media */}
      <EditorMenuButton
        onClick={setLink}
        isActive={editor.isActive("link")}
        title="Add Link"
      >
        <LinkIcon className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton onClick={onImageClick} title="Add Image">
        <ImageIcon className="w-4 h-4" />
      </EditorMenuButton>

      <div className="w-px h-8 bg-gray-700 mx-1" />

      {/* Table */}
      <EditorMenuButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        title="Insert Table"
      >
        <TableIcon className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().addColumnAfter().run()}
        title="Add Column"
      >
        <Columns className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().addRowAfter().run()}
        title="Add Row"
      >
        <Rows className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().deleteTable().run()}
        title="Delete Table"
      >
        <X className="w-4 h-4" />
      </EditorMenuButton>

      <div className="w-px h-8 bg-gray-700 mx-1" />

      {/* History */}
      <EditorMenuButton
        onClick={() => editor.chain().focus().undo().run()}
        title="Undo"
      >
        <Undo className="w-4 h-4" />
      </EditorMenuButton>

      <EditorMenuButton
        onClick={() => editor.chain().focus().redo().run()}
        title="Redo"
      >
        <Redo className="w-4 h-4" />
      </EditorMenuButton>
    </div>
  );
};

export default EditorToolbar;
