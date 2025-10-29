import React, { useState, useEffect } from "react";

const ContributePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    category: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Local Storage User Data Retrieval
  useEffect(() => {
    const savedUser = localStorage.getItem("camblog_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setFormData((prev) => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/blog/submission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          blog_title: formData.title,
          category: formData.category,
          blog_content: formData.content,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      // Reset only fields except name & email
      const savedUser = localStorage.getItem("camblog_user");
      let userData = { name: "", email: "" };
      if (savedUser) userData = JSON.parse(savedUser);

      setFormData({
        name: userData.name,
        email: userData.email,
        title: "",
        category: "",
        content: "",
      });

      setPopupVisible(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
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
            placeholder="Your amazing title"
          />
        </div>

        <div>
          <label className="block text-white mb-2 font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder="Write the category of your blog"
          />
        </div>

        <div>
          <label className="block text-white mb-2 font-medium">
            Blog Content (Google Docs Link)
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Paste the Google Docs link of your article."
          />
        </div>

        {errorMessage && (
          <p className="text-red-400 text-center">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          } text-white py-3 rounded-lg font-semibold transition-all duration-300`}
        >
          {loading ? "Submitting..." : "Submit Article"}
        </button>
      </form>

      {/* Success Popup */}
      {popupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="bg-gray-900 border border-blue-600 rounded-2xl shadow-lg p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">
              🎉 Congratulations!
            </h2>
            <p className="text-gray-200 leading-relaxed mb-6">
              Your blog has been submitted successfully! <br />
              Thanks for your contribution to the field of astronomy and for
              collaborating with{" "}
              <span className="text-blue-400 font-semibold">CAM-SUST</span> to
              spread astronomy all over Bangladesh.
            </p>
            <button
              onClick={() => setPopupVisible(false)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributePage;
