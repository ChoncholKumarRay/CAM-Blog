// src/components/blog-editor/editorConfig.js
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),
  Image.configure({
    inline: true,
    HTMLAttributes: {
      class: "max-w-[60%] h-auto rounded-lg mx-auto block",
    },
  }),
  Link.configure({
    openOnClick: false,
    HTMLAttributes: {
      class: "text-blue-500 underline",
    },
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Placeholder.configure({
    placeholder: "Start writing your blog content here...",
  }),
  Table.configure({
    resizable: true,
    HTMLAttributes: {
      class: "border-collapse table-auto w-full my-4",
    },
  }),
  TableRow,
  TableHeader.configure({
    HTMLAttributes: {
      class: "border border-gray-600 bg-gray-800 font-bold p-2",
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: "border border-gray-600 p-2",
    },
  }),
];

export const editorProps = {
  attributes: {
    class: "prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4",
  },
};
