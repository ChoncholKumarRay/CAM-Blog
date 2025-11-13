// src/hooks/useBlogForm.js
import { useState } from "react";

export const useBlogForm = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    published_date: new Date().toISOString().split("T")[0],
    category: "",
    authors: "",
    featured_image: null,
  });

  const [editorContent, setEditorContent] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeaturedImageChange = (file) => {
    setBlogData((prev) => ({
      ...prev,
      featured_image: file,
    }));
  };

  const handleEditorChange = (html) => {
    setEditorContent(html);
  };

  const resetForm = () => {
    setBlogData({
      title: "",
      published_date: new Date().toISOString().split("T")[0],
      category: "",
      authors: "",
      featured_image: null,
    });
    setEditorContent("");
  };

  const getFormData = () => {
    const authorsArray = blogData.authors
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a);

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("published_date", blogData.published_date);
    formData.append("category", blogData.category);
    formData.append("authors", JSON.stringify(authorsArray));
    formData.append("body", editorContent);
    if (blogData.featured_image) {
      formData.append("featured_image", blogData.featured_image);
    }

    return formData;
  };

  return {
    blogData,
    editorContent,
    handleChange,
    handleFeaturedImageChange,
    handleEditorChange,
    resetForm,
    getFormData,
  };
};
