import PlaceholderImage from "../../assets/placeholder.jpg";
const BlogImage = ({ featuredImage, title }) => {
  if (!featuredImage) return null;

  return (
    <img
      src={
        featuredImage.public_id
          ? `https://res.cloudinary.com/${
              import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your-cloud-name"
            }/image/upload/w_1024,c_fill,f_auto,q_auto,dpr_auto/${
              featuredImage.public_id
            }`
          : { PlaceholderImage }
      }
      alt={title}
      className="w-full rounded-lg object-cover max-h-[500px]"
    />
  );
};

export default BlogImage;
