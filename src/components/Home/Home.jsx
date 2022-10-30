import Datalist from "../Datalist/Datalist";
import "./Home.css";

const Home = () => {
  return (
    <section className="intro">
      <div className="search-form">
        <div>
          <label>
            Hola
            <input type="text" />
          </label>
          <Datalist />
        </div>
      </div>
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
