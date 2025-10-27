import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image"; // Also change this
import { Link } from "@tiptap/extension-link"; // And this
import { Underline } from "@tiptap/extension-underline"; // And this
import { TextAlign } from "@tiptap/extension-text-align"; // And this
import { Placeholder } from "@tiptap/extension-placeholder"; // And this
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
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
  Upload,
  X,
  Table as TableIcon,
  Columns,
  Rows,
} from "lucide-react";

const NewBlogUploadPage = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    published_date: new Date().toISOString().split("T")[0],
    category: "",
    authors: "",
    featured_image: null,
  });
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
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
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[400px] p-4",
      },
    },
  });

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "featured_image") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setBlogData({ ...blogData, featured_image: reader.result });
          setFeaturedImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setBlogData({ ...blogData, [name]: value });
    }
  };

  const removeFeaturedImage = () => {
    setBlogData({ ...blogData, featured_image: null });
    setFeaturedImagePreview(null);
  };

  const MenuButton = ({ onClick, isActive, children, title }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-700 transition-colors ${
        isActive ? "bg-gray-700 text-blue-400" : "text-gray-300"
      }`}
      title={title}
    >
      {children}
    </button>
  );

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageHtml = imageCaption
          ? `<figure><img src="${reader.result}" alt="${imageCaption}" /><figcaption class="text-center text-sm text-gray-400 italic mt-2">${imageCaption}</figcaption></figure>`
          : `<img src="${reader.result}" alt="Blog image" />`;

        editor.chain().focus().insertContent(imageHtml).run();
        setShowImageDialog(false);
        setImageFile(null);
        setImageCaption("");
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImageUrl = () => {
    if (imageUrl) {
      const imageHtml = imageCaption
        ? `<figure><img src="${imageUrl}" alt="${imageCaption}" /><figcaption class="text-center text-sm text-gray-400 italic mt-2">${imageCaption}</figcaption></figure>`
        : `<img src="${imageUrl}" alt="Blog image" />`;

      editor.chain().focus().insertContent(imageHtml).run();
      setShowImageDialog(false);
      setImageUrl("");
      setImageCaption("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editor) {
      alert("Editor not initialized");
      return;
    }

    const body = editor.getHTML();
    const authorsArray = blogData.authors
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a);

    const submitData = {
      title: blogData.title,
      published_date: blogData.published_date,
      category: blogData.category,
      authors: authorsArray,
      featured_image: blogData.featured_image,
      body: body,
    };

    try {
      // Update the URL to point to your backend server
      const response = await fetch("http://localhost:5000/api/blog/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const result = await response.json();
      console.log("Blog created:", result);

      alert(`✅ Blog post published successfully!\nBlog ID: ${result.blogId}`);

      // Reset form
      setBlogData({
        title: "",
        published_date: new Date().toISOString().split("T")[0],
        category: "",
        authors: "",
        featured_image: null,
      });
      setFeaturedImagePreview(null);
      editor.commands.setContent("");

      // Optional: Navigate to the blog list or view the created blog
      // navigate("/admin");
      // or
      // navigate(`/${result.blogId}`);
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert(`❌ Failed to publish blog: ${error.message}`);
    }
  };

  if (!editor) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Create New Blog Post
          </h1>
          <p className="text-gray-400">
            Fill in the details and write your content below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Compact Form Fields */}
          <div className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-gray-800 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-white mb-2 font-medium text-sm">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter an engaging title"
                required
              />
            </div>

            {/* Date, Category, Authors in one row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Published Date
                </label>
                <input
                  type="date"
                  name="published_date"
                  value={blogData.published_date}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={blogData.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Technology"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium text-sm">
                  Authors
                </label>
                <input
                  type="text"
                  name="authors"
                  value={blogData.authors}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                  placeholder="John Doe, Jane Smith"
                  required
                />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-white mb-2 font-medium text-sm">
                Featured Image
              </label>

              {!featuredImagePreview ? (
                <label className="flex flex-col items-center justify-center w-[480px] h-[270px]   hover:bg-gray-750  mx-auto border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750 transition-colors">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                  </div>
                  <input
                    type="file"
                    name="featured_image"
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative w-[480px] h-[270px] mx-auto">
                  <img
                    src={featuredImagePreview}
                    alt="Featured preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeFeaturedImage}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
            <label className="block text-white mb-3 font-medium">
              Blog Content
            </label>

            {/* Toolbar */}
            <div className="bg-gray-800 rounded-t-lg border border-gray-700 p-2 flex flex-wrap gap-1">
              <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive("underline")}
                title="Underline"
              >
                <UnderlineIcon className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive("strike")}
                title="Strikethrough"
              >
                <Strikethrough className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                isActive={editor.isActive("code")}
                title="Code"
              >
                <Code className="w-4 h-4" />
              </MenuButton>

              <div className="w-px h-8 bg-gray-700 mx-1" />

              <MenuButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                isActive={editor.isActive("heading", { level: 1 })}
                title="Heading 1"
              >
                <Heading1 className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={editor.isActive("heading", { level: 2 })}
                title="Heading 2"
              >
                <Heading2 className="w-4 h-4" />
              </MenuButton>

              <div className="w-px h-8 bg-gray-700 mx-1" />

              <MenuButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive("bulletList")}
                title="Bullet List"
              >
                <List className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive("orderedList")}
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive("blockquote")}
                title="Quote"
              >
                <Quote className="w-4 h-4" />
              </MenuButton>

              <div className="w-px h-8 bg-gray-700 mx-1" />

              <MenuButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                isActive={editor.isActive({ textAlign: "left" })}
                title="Align Left"
              >
                <AlignLeft className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                isActive={editor.isActive({ textAlign: "center" })}
                title="Align Center"
              >
                <AlignCenter className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                isActive={editor.isActive({ textAlign: "right" })}
                title="Align Right"
              >
                <AlignRight className="w-4 h-4" />
              </MenuButton>

              <div className="w-px h-8 bg-gray-700 mx-1" />

              <MenuButton
                onClick={setLink}
                isActive={editor.isActive("link")}
                title="Add Link"
              >
                <LinkIcon className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => setShowImageDialog(true)}
                title="Add Image"
              >
                <ImageIcon className="w-4 h-4" />
              </MenuButton>

              <div className="w-px h-8 bg-gray-700 mx-1" />

              <MenuButton
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
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                title="Add Column"
              >
                <Columns className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().addRowAfter().run()}
                title="Add Row"
              >
                <Rows className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().deleteTable().run()}
                title="Delete Table"
              >
                <X className="w-4 h-4" />
              </MenuButton>

              <div className="w-px h-8 bg-gray-700 mx-1" />

              <MenuButton
                onClick={() => editor.chain().focus().undo().run()}
                title="Undo"
              >
                <Undo className="w-4 h-4" />
              </MenuButton>

              <MenuButton
                onClick={() => editor.chain().focus().redo().run()}
                title="Redo"
              >
                <Redo className="w-4 h-4" />
              </MenuButton>
            </div>

            {/* Editor Content */}
            <div className="bg-gray-800 border border-t-0 border-gray-700 rounded-b-lg">
              <EditorContent editor={editor} />
            </div>

            <p className="text-gray-400 text-sm mt-2">
              Use the toolbar above to format your content. You can add images
              with captions, tables, links, and rich formatting.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Publish Blog Post
            </button>
          </div>
        </form>

        {/* Image Upload Dialog */}
        {showImageDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Add Image</h3>

              <div className="space-y-4">
                {/* Caption Input */}
                <div>
                  <label className="block text-white mb-2 text-sm">
                    Image Caption (optional)
                  </label>
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter image caption..."
                  />
                </div>

                {/* URL Input */}
                <div>
                  <label className="block text-white mb-2 text-sm">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    onClick={insertImageUrl}
                    className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Insert from URL
                  </button>
                </div>

                <div className="text-center text-gray-400">OR</div>

                {/* File Upload */}
                <div>
                  <label className="block text-white mb-2 text-sm">
                    Upload Image
                  </label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-750 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-400">
                      Click to upload image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowImageDialog(false);
                  setImageUrl("");
                  setImageCaption("");
                  setImageFile(null);
                }}
                className="w-full mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewBlogUploadPage;
