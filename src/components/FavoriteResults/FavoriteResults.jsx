import { useState } from "react";
import { Link } from "react-router-dom";
import Result from "../Result/Result";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import "./FavoriteResults.css";

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteItems, setFavoriteItems] = useState([]);

  return (
    <div className="favorite-results">
      {isLoading ? (
        <SkeletonLoader type="result" />
      ) : favoriteItems.length ? (
        favoriteItems.map((item) => <Result key={item.id} data={item} />)
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
