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
      <Skeleton width={350} />
      <Skeleton width={150} />
      <br />
      <Skeleton width={325} />
    </div>
  ) : (
    <div className="item-skeleton">
      <Skeleton width={375} height={50} />
      <br />
      <Skeleton height={315} />
      <Skeleton height={50} />
      <br />
      <Skeleton width={175} height={50} />
    </div>
  );
};

export default SkeletonLoader;
