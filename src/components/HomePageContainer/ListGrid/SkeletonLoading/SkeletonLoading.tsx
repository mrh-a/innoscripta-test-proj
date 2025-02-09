import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


interface ISkeletonLoadingProps {}

const SkeletonLoading: FC<ISkeletonLoadingProps> = () => {

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-[20px]">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded h-[504px]"
          >
            <Skeleton height={160} className="mb-4" />
            <Skeleton height={24} width="75%" className="mb-2" />
            <Skeleton height={16} width="50%" className="mb-2" />
            <Skeleton height={16} width="100%" />
            <Skeleton height={50} width="100%" />
            <Skeleton className="mt-[100px]" height={50} width="100%" />

          </div>
        ))}
    </div>
  );
};

export default SkeletonLoading;
