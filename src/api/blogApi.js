export const fetchDetailedBlog = async (id) => {
  const response = await fetch(`http://localhost:5000/api/blog/${id}`);
  if (!response.ok)
    throw new Error("Failed to fetch the blog data. Please contact with us!");
  return response.json();
};
