import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import ResultsList from "../ResultsList/ResultsList";
import "./SearchResults.css";

const SearchResults = () => {
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
          Mostrando resultados para: <br /> <span>"casa en punta gorda"</span>
        </h1>
      </header>
      <ResultsList />
    </section>
  );
};

export default SearchResults;
