import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import Result from "../Result/Result";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import "./ResultsList.css";

const ResultsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const query = useSelector((state) => state.search.query);

  useEffect(() => {
    setIsLoading(true);
    let resultsStorage = loadLocalStorage("results");
    console.log(resultsStorage);
    if (resultsStorage === null || resultsStorage.length === 0) {
      saveLocalStorage("results", []);
      if (query !== undefined) fetchResults(0, []);
    } else {
      setResults(resultsStorage);
      setIsLoading(false);
    }
    //eslint-disable-next-line
  }, []);

  const fetchResults = (offset, arr) => {
    fetch(`https://api.mercadolibre.com/sites/MLU/search?q=${query}&offset=` + offset)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        let total = r.paging.total;
        let current = r.paging.limit + r.paging.offset;
        let currentArray = [...arr, ...r.results];
        if (current < total && r.paging.offset < 100) {
          fetchResults(current, currentArray);
        } else {
          setResults(currentArray);
          setIsLoading(false);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (results.length) saveLocalStorage("results", results);
  }, [results]);

  return (
    <div className="results">
      {isLoading ? (
        <SkeletonLoader />
      ) : query ? (
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
