import { useRef } from "react";
import { IoBan, IoBanOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadLocalStorage, transformImageUrl } from "../../utils/utils";
import "./Result.css";
import {
  addDiscardedItem,
  addFavoriteItem,
  removeDiscardedItem,
  removeFavoriteItem,
  setPreventReload,
} from "../../features/itemsSlice";
import { useState } from "react";
import { useEffect } from "react";
import FavoriteGroupsModal from "../FavoriteGroupsModal/FavoriteGroupsModal";

const Result = ({ data }) => {
  const { id, title, price, currency_id, location, attributes, thumbnail, condition } = data;
  const favoriteBtn = useRef(null);
  const notInterestedBtn = useRef(null);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDiscarded, setIsDiscarded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const favoriteItems = useSelector((state) => state.items.favoriteItems);
  const discardedItems = useSelector((state) => state.items.discardedItems);

  useEffect(() => {
    const favoriteItems = loadLocalStorage("favoriteItems");
    const discardedItems = loadLocalStorage("discardedItems");

    const isInFavorites = favoriteItems.find((item) => item.id === data.id);
    // const isInDiscarded = discardedItems.find((item) => item.id === data.id);

    if (isInFavorites) setIsFavorite(true);
    else setIsFavorite(false);

    // if (isInDiscarded) setIsDiscarded(true);
    // else setIsDiscarded(false);
  }, [favoriteItems, discardedItems, data.id]);

  const totalArea = attributes.find((attribute) => attribute.id === "TOTAL_AREA");
  const bathrooms = attributes.find((attribute) => attribute.id === "FULL_BATHROOMS");
  const bedrooms = () => {
    const bedrooms = attributes.find((attribute) => attribute.id === "BEDROOMS");
    const rooms = attributes.find((attribute) => attribute.id === "ROOMS");
    if (bedrooms) return Number(bedrooms.value_name);
    else if (rooms) return Number(rooms.value_name);
    else return 0;
  };

  const handleClick = (e) => {
    dispatch(setPreventReload(true));
    if (favoriteBtn.current.contains(e.target)) {
      if (favoriteBtn.current.classList.contains("selected")) {
        dispatch(removeFavoriteItem(data.id));
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      favoriteBtn.current.classList.toggle("selected");
      notInterestedBtn.current.classList.remove("selected");
    }
    if (notInterestedBtn.current.contains(e.target)) {
      if (notInterestedBtn.current.classList.contains("selected")) {
        dispatch(removeDiscardedItem(data.id));
      } else {
        dispatch(addDiscardedItem(data));
        dispatch(removeFavoriteItem(data.id));
      }
      setIsVisible(false);
      notInterestedBtn.current.classList.toggle("selected");
      favoriteBtn.current.classList.remove("selected");
    }
  };

  return (
    <>
      <article className="result">
        <Link to={`/inmueble/${id}`}>
          <div className="img">
            {condition === "new" ? <span className="tag">A estrenar</span> : <></>}
            <img src={transformImageUrl(thumbnail)} alt={`Imagen de ${title}`} />
          </div>
          <div className="info">
            <small>
              {totalArea.value_name} totales{" "}
              {bathrooms ? (
                <>
                  | {bathrooms.value_name} {Number(bathrooms.value_name) > 1 ? "baños" : "baño"}
                </>
              ) : (
                <></>
              )}{" "}
              {bedrooms() !== 0 ? (
                <>
                  | {bedrooms()} {bedrooms() > 1 ? "dormitorios" : "dormitorio"}
                </>
              ) : (
                <></>
              )}
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
        <div className="actions">
          <button
            className={`favorite ${isFavorite ? "selected" : ""}`}
            ref={favoriteBtn}
            onClick={handleClick}
          >
            <IoHeartOutline />
            <IoHeart />
          </button>
          <button
            className={`not-interested ${isDiscarded ? "selected" : ""}`}
            ref={notInterestedBtn}
            onClick={handleClick}
          >
            <IoBanOutline />
            <IoBan />
          </button>
        </div>
      </article>
      <FavoriteGroupsModal data={data} isVisible={isVisible} />
    </>
  );
};

export default Result;
