import { Link } from "react-router-dom";
import "./Error404.css";

const Error404 = () => {
  return (
    <section className="error404">
      <h1>Error 404</h1>
      <h2>Lo sentimos. No encontramos lo que está buscando.</h2>
      <div className="useful-links">
        <p>Links útiles:</p>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/resultados">Resultados de búsqueda</Link>
          </li>
          <li>
            <Link to="/favoritos">Lista de favoritos</Link>
          </li>
          <li>
            <Link to="/descartados">Lista de descartados</Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Error404;
