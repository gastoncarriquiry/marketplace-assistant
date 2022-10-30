import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = () => {
  return (
    <div>
      <Skeleton width={300} />
      <Skeleton height={300} />
    </div>
  );
};

export default SkeletonLoader;
