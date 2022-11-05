import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import FavoriteGroup from "../FavoriteGroup/FavoriteGroup";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import "./FavoriteResults.css";

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteGroups, setFavoriteGroups] = useState([]);
  const favoriteGroupsState = useSelector((state) => state.items.favoriteGroups);

  useEffect(() => {
    setIsLoading(true);
    let groupsStorage = loadLocalStorage("favoriteGroups");
    if (!groupsStorage || groupsStorage.length === 0) {
      saveLocalStorage("favoriteGroups", []);
    } else {
      setFavoriteGroups(groupsStorage);
    }
    setIsLoading(false);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (favoriteGroupsState.length) saveLocalStorage("favoriteGroups", favoriteGroupsState);
  }, [favoriteGroupsState]);

  return (
    <div className="favorite-results">
      {isLoading ? (
        <SkeletonLoader type="result" />
      ) : favoriteGroups.length ? (
        favoriteGroups.map((group) => <FavoriteGroup key={group.id} data={group} />)
      ) : (
        <div className="no-items">
          <p>
            No hay publicaciones marcadas como favoritas aún. Marque alguna publicación como
            favorita para verla aquí.
          </p>
          <Link to="/">Ir a inicio</Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
