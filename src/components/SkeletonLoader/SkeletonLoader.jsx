import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./SkeletonLoader.css";

const SkeletonLoader = ({ type }) => {
  return type === "result" ? (
    <div className="result-skeleton">
      <Skeleton height={225} />
      <br />
      <Skeleton width={250} />
      <br />
      <Skeleton width={200} height={35} />
      <br />
      <Skeleton />
      <Skeleton width={150} />
      <br />
      <Skeleton />
    </div>
  ) : (
    <div className="item-skeleton">
      <Skeleton height={50} />
      <br />
      <Skeleton height={315} />
      <Skeleton height={50} />
      <br />
      <Skeleton width={175} height={50} />
    </div>
  );
};

export default SkeletonLoader;
