import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import Result from "../Result/Result";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import "./IgnoredResults.css";

const IgnoredResults = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [discardedItems, setDiscardedItems] = useState([]);
  const discardedItemsState = useSelector((state) => state.items.discardedItems);
  const preventReload = useSelector((state) => state.items.preventReload);

  useEffect(() => {
    if (preventReload) saveLocalStorage("discardedItems", discardedItemsState);
  }, [discardedItemsState]);

  useEffect(() => {
    setIsLoading(true);
    let discardedStorage = loadLocalStorage("discardedItems");
    if (!discardedStorage || discardedStorage.length === 0) {
      saveLocalStorage("discardedItems", []);
      setDiscardedItems([]);
    } else {
      setDiscardedItems(discardedStorage);
    }
    setIsLoading(false);
  }, [discardedItemsState]);

  return (
    <section className="ignored-results">
      <header>
        <Link to="/">
          <button>
            <IoChevronBack />
            Volver al inicio
          </button>
        </Link>
        <hr />
        <h1>Descartados</h1>
      </header>
      {isLoading ? (
        <SkeletonLoader type="result" />
      ) : discardedItems.length ? (
        discardedItems.map((item) => <Result key={item.id} data={item} />)
      ) : (
        <div className="no-items">
          <p>
            No hay publicaciones marcadas como descartadas aún. Marque alguna publicación como
            descartada para verla aquí.
          </p>
          <Link to="/">Ir a inicio</Link>
        </div>
      )}
    </section>
  );
};

export default IgnoredResults;
