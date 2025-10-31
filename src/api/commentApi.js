const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const fetchComments = async (id, page, limit) => {
  const response = await fetch(
    `${API_BASE_URL}/api/blog/${id}/comments?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};

export const submitComment = async ({ id, commentData }) => {
  const response = await fetch(`${API_BASE_URL}/api/blog/${id}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit comment");
  }
  return response.json();
};
