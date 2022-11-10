import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
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
  const preventReload = useSelector((state) => state.items.preventReload);

  useEffect(() => {
    setIsLoading(true);
    let groupsStorage = loadLocalStorage("favoriteGroups");
    if (!groupsStorage || groupsStorage.length === 0) {
      saveLocalStorage("favoriteGroups", []);
    } else {
      setFavoriteGroups(groupsStorage);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (preventReload) saveLocalStorage("favoriteGroups", favoriteGroupsState);
  }, [favoriteGroupsState]);

  return (
    <section className="favorite-results">
      <header>
        <Link to="/">
          <button>
            <IoChevronBack />
            Volver al inicio
          </button>
        </Link>
        <hr />
        <h1>Favoritos</h1>
      </header>
      <h2>Colecciones</h2>
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
    </section>
  );
};

export default Favorites;
