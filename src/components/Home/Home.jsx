import RecentSearches from "../RecentSearches/RecentSearches";
import SearchForm from "../SearchForm/SearchForm";
import "./Home.css";

const Home = () => {
  return (
    <section className="intro">
      <SearchForm />
      <RecentSearches />
      <div className="about">
        <h1>Viví MVD</h1>
        <p>
          Consectetur ullamco irure minim excepteur consequat nulla excepteur enim reprehenderit
          veniam commodo. Duis veniam voluptate irure dolore nostrud non mollit est consectetur amet
          aute consectetur occaecat ut. Consectetur dolor nisi laboris ex fugiat aliqua labore
          cillum sit Lorem fugiat.
        </p>
      </div>
    </section>
  );
};

export default Home;
