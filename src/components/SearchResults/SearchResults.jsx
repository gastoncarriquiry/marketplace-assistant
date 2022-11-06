import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import ResultsList from "../ResultsList/ResultsList";
import "./SearchResults.css";

const SearchResults = () => {
  const queryState = useSelector((state) => state.search.query);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (queryState !== "") {
      saveLocalStorage("query", queryState);
    }
    setQuery(loadLocalStorage("query"));
  }, [queryState]);

  return (
    <section className="search-results">
      <header>
        <Link to="/">
          <button>
            <IoChevronBack />
            Volver al inicio
          </button>
        </Link>
        <hr />
        <h1>
          {query ? (
            <>
              Mostrando resultados para: <br /> <span>"{query}"</span>
            </>
          ) : (
            ""
          )}
        </h1>
      </header>
      <ResultsList />
    </section>
  );
};

export default SearchResults;
