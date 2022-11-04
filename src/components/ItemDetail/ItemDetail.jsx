import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { apiToJson } from "../../utils/utils";
import Item from "../Item/Item";
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader";
import "./ItemDetail.css";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([{}, {}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getItemDetails = async () => {
      return fetch(`https://api.mercadolibre.com/items/${id}`).then(apiToJson);
    };

    const getItemDescription = async () => {
      return fetch(`https://api.mercadolibre.com/items/${id}/description`).then(apiToJson);
    };

    Promise.all([getItemDetails(), getItemDescription()])
      .then((r) => {
        setData(r);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <section className="item-detail">
      <header>
        <button onClick={() => navigate("/resultados")}>
          <IoChevronBack />
          Atrás
        </button>
      </header>
      <div className="container">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <Item key={data[0].id} data={data[0]} description={data[1].plain_text} />
        )}
      </div>
    </section>
  );
};

export default ItemDetail;
