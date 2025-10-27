export const fetchComments = async (id, page, limit) => {
  const response = await fetch(
    `http://localhost:5000/api/blog/${id}/comments?page=${page}&limit=${limit}`
  );
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};

export const submitComment = async ({ id, commentData }) => {
  const response = await fetch(`http://localhost:5000/api/blog/${id}/comment`, {
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
