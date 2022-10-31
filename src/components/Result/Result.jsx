import { transformImageUrl } from "../../utils/utils";
import "./Result.css";

const Result = ({ data }) => {
  const { title, price, currency_id, location, attributes, thumbnail } = data;
  return (
    <article className="result">
      <img src={transformImageUrl(thumbnail)} alt="" />
      <h2>{title}</h2>
      <p>
        {price} {currency_id}
      </p>
      <p>
        {location.address_line}, {location.city.name}, {location.country.name}
      </p>
    </article>
  );
};

export default Result;
