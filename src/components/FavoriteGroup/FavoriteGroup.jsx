import { useEffect } from "react";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useSelector } from "react-redux";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import Result from "../Result/Result";
import "./FavoriteGroup.css";

const FavoriteGroup = ({ data }) => {
  const favoriteItems = useSelector((state) => state.items.favoriteItems);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const preventReload = useSelector((state) => state.items.preventReload);

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

  return (
    <div className="favorite-group">
      <button className="dropdown">
        {data.name} <IoChevronDown />
      </button>
      <div className="group-favorites">
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
