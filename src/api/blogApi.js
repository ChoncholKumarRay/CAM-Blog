export const fetchAllBlogs = async (page, limit = 6) => {
  const response = await fetch(
    `http://localhost:5000/api/blog?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
};

export const fetchDetailedBlog = async (id) => {
  const response = await fetch(`http://localhost:5000/api/blog/${id}`);
  if (!response.ok)
    throw new Error("Failed to fetch the blog data. Please contact with us!");
  return response.json();
};
