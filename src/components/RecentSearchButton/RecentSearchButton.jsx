import "./RecentSearchButton.css";
import { VscHistory } from "react-icons/vsc";
import { formatDate } from "../../utils/utils";

const RecentSearchButton = ({ data }) => {
  return (
    <button className="search-button">
      <VscHistory />
      <span>
        <p>"{data.query}"</p>
        <small>{formatDate(data.date)}</small>
      </span>
    </button>
  );
};

export default RecentSearchButton;
