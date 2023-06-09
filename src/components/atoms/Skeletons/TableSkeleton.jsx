import React from "react";
import Skeleton from "react-loading-skeleton";
const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton width={"100%"} height="50px" />
      <Skeleton width={"100%"} height="70px" />
      <Skeleton width={"100%"} height="70px" />
      <Skeleton width={"100%"} height="70px" />
      <Skeleton width={"100%"} height="70px" />
    </div>
  );
};

export default TableSkeleton;
