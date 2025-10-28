import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import categories from "../data/contentCategories";

const ContentSuggestions = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <section style={{ fontFamily: "'Roboto', sans-serif" }}>
      <h2 className="text-3xl font-bold mb-4 text-center text-blue-400">
        Content Suggestion to Writers
      </h2>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-gray-900/80 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <button
              onClick={() =>
                setOpenCategory(openCategory === cat.name ? null : cat.name)
              }
              className="w-full flex justify-between items-center text-left text-xl font-semibold text-white hover:text-blue-300 transition-colors"
            >
              {cat.name}
              {openCategory === cat.name ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openCategory === cat.name && (
              <ul className="mt-3 list-disc list-inside text-gray-200 space-y-1">
                {cat.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContentSuggestions;
