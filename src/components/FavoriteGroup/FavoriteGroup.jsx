import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useSelector } from "react-redux";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import Result from "../Result/Result";
import "./FavoriteGroup.css";

const FavoriteGroup = ({ data }) => {
  const favoriteItems = useSelector((state) => state.items.favoriteItems);
  const preventReload = useSelector((state) => state.items.preventReload);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [isDeployed, setIsDeployed] = useState(false);

  useEffect(() => {
    if (preventReload) saveLocalStorage("favoriteItems", favoriteItems);
  }, [favoriteItems]);

  useEffect(() => {
    let favoritesStorage = loadLocalStorage("favoriteItems");
    if (!favoritesStorage || favoritesStorage.length === 0) {
      saveLocalStorage("favoriteItems", []);
      setFilteredFavorites(favoritesStorage);
    } else {
      setFilteredFavorites(favoritesStorage.filter((item) => item.group.id === data.id));
    }
  }, [favoriteItems]);

  const toggleDisplay = () => {
    setIsDeployed(!isDeployed);
  };

  return (
    <div className={`favorite-group ${isDeployed ? "deployed" : "retracted"}`}>
      <button className="dropdown" onClick={toggleDisplay}>
        {data.name} <IoChevronDown />
      </button>
      <div className="group-list">
        {filteredFavorites.length ? (
          filteredFavorites.map((item) => <Result key={item.id} data={item} />)
        ) : (
          <p>Aún no hay publicaciones favoritas en esta colección.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteGroup;
