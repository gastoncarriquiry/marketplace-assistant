import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiToJson, buildUrl, loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import Result from "../Result/Result";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import "./ResultsList.css";

const ResultsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const query = useSelector((state) => state.search.query);
  const favoriteItems = useSelector((state) => state.items.favoriteItems);
  const discardedItems = useSelector((state) => state.items.discardedItems);

  useEffect(() => {
    setIsLoading(true);
    const resultsStorage = loadLocalStorage("results");
    if (resultsStorage === null || resultsStorage.length === 0) {
      saveLocalStorage("results", []);
      if (query !== "") fetchResults(0, []);
    } else {
      setResults(resultsStorage);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (favoriteItems && discardedItems) {
      const mergedArray = [...favoriteItems, ...discardedItems];
      const resultsArray = loadLocalStorage("results");
      for (let i = resultsArray.length - 1; i >= 0; i--) {
        for (let j = 0; j < mergedArray.length; j++) {
          if (resultsArray[i] && resultsArray[i].id === mergedArray[j].id) {
            resultsArray.splice(i, 1);
          }
        }
      }
      setResults(resultsArray);
    }
  }, [favoriteItems, discardedItems]);

  const fetchResults = (offset, arr) => {
    const url = "https://api.mercadolibre.com/sites/MLU/search?";
    const params = {
      q: query,
      offset,
    };

    fetch(buildUrl(url, params))
      .then(apiToJson)
      .then((r) => {
        let total = r.paging.total;
        let current = r.paging.limit + r.paging.offset;
        let currentArray = [...arr, ...r.results];
        //TODO: work on offset limit
        if (current < total && r.paging.offset < 100) {
          fetchResults(current, currentArray);
        } else {
          setResults(currentArray);
          saveLocalStorage("results", currentArray);
          setIsLoading(false);
        }
      })
      .catch(console.error);
  };

  return (
    <div className="results">
      {isLoading ? (
        <SkeletonLoader type="result" />
      ) : results.length ? (
        results.map((result) => <Result key={result.id} data={result} />)
      ) : (
        <div className="no-search">
          <p>No ha realizado ninguna búsqueda aún. Vuelva al inicio para realizar una búsqueda.</p>
          <Link to="/">Ir a inicio</Link>
        </div>
      )}
    </div>
  );
};

export default ResultsList;
