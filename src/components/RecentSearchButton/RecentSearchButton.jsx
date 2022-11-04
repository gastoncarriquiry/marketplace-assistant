import "./RecentSearchButton.css";
import { VscHistory } from "react-icons/vsc";
import { formatDate, saveLocalStorage } from "../../utils/utils";
import { setQuery, setRecentSearches } from "../../features/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const RecentSearchButton = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recentSearches = useSelector((state) => state.search.recentSearches);

  const deleteSearch = (e) => {
    e.stopPropagation();
    dispatch(setRecentSearches(recentSearches.filter((search) => search.id !== data.id)));
  };

  const handleSearch = () => {
    saveLocalStorage("results", []);
    dispatch(setQuery(data.query));
    navigate("/resultados");
  };

  return (
    <button className="search-button" onClick={handleSearch}>
      <VscHistory />
      <span>
        <p>"{data.query}"</p>
        <small>{formatDate(data.date)}</small>
      </span>
      <button className="delete" onClick={deleteSearch}>
        <IoClose />
      </button>
    </button>
  );
};

export default RecentSearchButton;
