import RecentSearches from "../RecentSearches/RecentSearches";
import SearchForm from "../SearchForm/SearchForm";
import "./Home.css";

const Home = () => {
  return (
    <section className="intro">
      <h1>Viví MVD</h1>
      <SearchForm />
      <RecentSearches />
      <div className="about">
        <p>
          Viví MVD es una app que ayuda a sus usuarios a la hora de buscar dónde vivir, descansar,
          guardar sus cosas o invertir en Montevideo, Uruguay.
        </p>
        <p>
          Al buscar inmuebles, uno rápidamente se da cuenta si le interesa o no. Viví MVD permite
          marcar publicaciones como favoritas o descartadas para que no aparezcan en futuras
          búsquedas y reducir la sobrecarga de información.
        </p>
        <p>
          Viví MVD te permite guardar publicaciones en distintas colecciones para que puedas tener
          todo ordenado y revisitarlas mucho más fácil.
        </p>
      </div>
    </section>
  );
};

export default Home;
