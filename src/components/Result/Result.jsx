import { Link } from "react-router-dom";
import { transformImageUrl } from "../../utils/utils";
import "./Result.css";

const Result = ({ data }) => {
  const { id, title, price, currency_id, location, attributes, thumbnail, condition } = data;
  const totalArea = attributes.find((attribute) => attribute.id === "TOTAL_AREA");
  const bathrooms = attributes.find((attribute) => attribute.id === "FULL_BATHROOMS");
  const bedrooms = () => {
    const bedrooms = attributes.find((attribute) => attribute.id === "BEDROOMS");
    const rooms = attributes.find((attribute) => attribute.id === "ROOMS");
    if (bedrooms) return Number(bedrooms.value_name);
    else return Number(rooms.value_name);
  };

  return (
    <article className="result">
      <Link to={`/inmueble/${id}`}>
        <div className="img">
          {condition === "new" ? <span className="tag">A estrenar</span> : <></>}
          <img src={transformImageUrl(thumbnail)} alt={`Imagen de ${title}`} />
        </div>
        <div className="info">
          <small>
            {totalArea.value_name} totales | {bathrooms.value_name} baños{" "}
            {bedrooms() !== 0 ? <>| {bedrooms()} dormitorios</> : <></>}
          </small>
          <h2 className="price">
            {currency_id} {price}
          </h2>
          <h2 className="title">{title}</h2>
          {location ? (
            <p className="location">
              {location.address_line}, {location.city.name}, {location.country.name}
            </p>
          ) : (
            <></>
          )}
        </div>
      </Link>
    </article>
  );
};

export default Result;
