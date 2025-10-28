import React, { useState } from "react";

const ContributePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    category: "",
    content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your submission! We will review it shortly.");
    setFormData({ name: "", email: "", title: "", category: "", content: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative z-10 container mx-auto px-6 pt-28 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        Contribute to Our Blog
      </h1>
      <p className="text-gray-400 mb-8 text-center">
        Share your knowledge and insights with the CAM-SUST community. Please
        read{" "}
        <a
          href="/tips"
          className="text-blue-400 hover:text-blue-500 hover:underline transition-colors"
        >
          tips
        </a>{" "}
        and{" "}
        <a
          href="/instruction"
          className="text-blue-400 hover:text-blue-500 hover:underline transition-colors"
        >
          instructions
        </a>{" "}
        before submitting your article.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 bg-opacity-60 backdrop-blur-sm rounded-lg p-8 border border-gray-800 space-y-6"
      >
        <div>
          <label className="block text-white mb-2 font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-white mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-white mb-2 font-medium">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="Your amzing title"
          />
        </div>
        <div>
          <label className="block text-white mb-2 font-medium">Category</label>
          <input
            type="text"
            name="title"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="Write the category of your blog"
          />
        </div>

        <div>
          <label className="block text-white mb-2 font-medium">
            Blog Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Paste the gogle docs link of you article. "
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
        >
          Submit Article
        </button>
      </form>
    </div>
  );
};

export default ContributePage;
