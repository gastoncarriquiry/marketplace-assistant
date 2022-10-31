import { Link } from "react-router-dom";
import { transformImageUrl } from "../../utils/utils";
import "./Result.css";

const Result = ({ data }) => {
  const { title, price, currency_id, location, attributes, thumbnail, condition } = data;
  const totalArea = attributes.find((attribute) => attribute.id === "TOTAL_AREA");
  const bathrooms = attributes.find((attribute) => attribute.id === "FULL_BATHROOMS");
  const spaces = () => {
    let total = 0;
    const rooms = attributes.find((attribute) => attribute.id === "ROOMS");
    const bedrooms = attributes.find((attribute) => attribute.id === "BEDROOMS");

    if (rooms) total += Number(rooms.value_name);
    else total += 0;

    if (bedrooms) total += Number(bedrooms.value_name);
    else total += 0;

    return total;
  };

  return (
    <article className="result">
      <Link to="">
        <div className="img">
          {condition === "new" ? <span className="tag">A estrenar</span> : <></>}
          <img src={transformImageUrl(thumbnail)} alt={`Imagen de ${title}`} />
        </div>
        <div className="info">
          <small>
            {totalArea.value_name} totales | {bathrooms.value_name} baños{" "}
            {spaces() !== 0 ? <>| {spaces()} ambientes</> : <></>}
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
