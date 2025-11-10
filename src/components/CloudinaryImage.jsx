import React from "react";
import placeholderImage from "../assets/placeholder.jpg";

const CloudinaryImage = ({
  imageData,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
}) => {
  // If no image data, show placeholder
  if (!imageData || !imageData.public_id) {
    return <img src={placeholderImage} alt={alt} className={className} />;
  }

  const { public_id, width, height } = imageData;

  const cloudName =
    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your-cloud-name";

  // Generate Cloudinary URL with transformations
  const generateUrl = (transformations) => {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${public_id}`;
  };

  // Responsive image sizes for different devices
  const imageSizes = [
    { width: 400, transformation: "w_400,c_fill,f_auto,q_auto,dpr_auto" }, // Mobile
    { width: 640, transformation: "w_640,c_fill,f_auto,q_auto,dpr_auto" }, // Mobile landscape
    { width: 768, transformation: "w_768,c_fill,f_auto,q_auto,dpr_auto" }, // Tablet
    { width: 1024, transformation: "w_1024,c_fill,f_auto,q_auto,dpr_auto" }, // Desktop
    { width: 1280, transformation: "w_1280,c_fill,f_auto,q_auto,dpr_auto" }, // Large desktop
  ];

  // Create srcSet for responsive images
  const srcSet = imageSizes
    .map((size) => `${generateUrl(size.transformation)} ${size.width}w`)
    .join(", ");

  // Default src (optimized for medium screens)
  const defaultSrc = generateUrl("w_768,c_fill,f_auto,q_auto,dpr_auto");

  return (
    <img
      src={defaultSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={className}
      loading="lazy"
      width={width}
      height={height}
      onError={(e) => (e.target.src = placeholderImage)}
    />
  );
};

export default CloudinaryImage;
