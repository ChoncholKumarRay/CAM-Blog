const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// api/blogApi.js
export const fetchAllBlogs = async (
  page = 1,
  limit = 6,
  category = null,
  search = "",
  sortBy = "latest"
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
  });

  if (category) {
    params.append("category", category);
  }

  if (search) {
    params.append("search", search);
  }

  const response = await fetch(`${API_BASE_URL}/api/blog?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return response.json();
};

export const fetchDetailedBlog = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/blog/${id}`);
  if (!response.ok)
    throw new Error("Failed to fetch the blog data. Please contact with us!");
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/api/blog/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};
