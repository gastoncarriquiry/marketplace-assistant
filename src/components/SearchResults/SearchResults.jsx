import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ResultsList from "../ResultsList/ResultsList";
import "./SearchResults.css";

const SearchResults = () => {
  const query = useSelector((state) => state.search.query);

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
