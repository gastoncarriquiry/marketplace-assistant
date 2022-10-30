import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveLocalStorage } from "../../utils/utils";
import Result from "../Result/Result";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import "./ResultsList.css";

const ResultsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const query = useSelector((state) => state.search.query);

  useEffect(() => {
    let resultsStorage = localStorage.getItem("results");
    if (resultsStorage === null) {
      saveLocalStorage("results", []);
    } else {
      setResults(JSON.parse(resultsStorage));
    }

    fetchResults(0, []);
  }, []);

  const fetchResults = (offset, arr) => {
    setIsLoading(true);
    fetch("https://api.mercadolibre.com/sites/MLU/search?q=venta casa palermo&offset=" + offset)
      .then((r) => r.json())
      .then((r) => {
        let total = r.paging.total;
        let current = r.paging.limit + r.paging.offset;
        let currentArray = [...arr, ...r.results];
        if (current < total) {
          fetchResults(current, currentArray);
        } else {
          setResults(currentArray);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (results.length) saveLocalStorage("results", results);
  }, [results]);

  return (
    <div className="results">
      {isLoading ? (
        <SkeletonLoader />
      ) : results.length ? (
        results.map((result) => <Result data={result} />)
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
