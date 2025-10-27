const BlogImage = ({ featuredImage, title }) => {
  if (!featuredImage) return null;

  const imageSrc = featuredImage.startsWith("data:image")
    ? featuredImage
    : `data:image/jpeg;base64,${featuredImage}`;

  return (
    <img
      src={imageSrc}
      alt={title}
      className="w-full rounded-lg object-cover max-h-[500px]"
    />
  );
};

export default BlogImage;
