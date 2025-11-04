import React from "react";
import { RefreshCw } from "lucide-react";

const BlogListControls = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onRefresh,
  isRefreshing,
}) => {
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="px-2 mb-2 mt-10 text-gray-300 text-sm">
      {totalItems > 0 &&
        `Showing ${startItem} - ${endItem} of ${totalItems} blogs`}
    </div>
  );
};

export default BlogListControls;
