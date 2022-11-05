import { useEffect } from "react";
import { useRef } from "react";
import {
  addDiscardedItem,
  addFavoriteItem,
  removeDiscardedItem,
  removeFavoriteItem,
  setPreventReload,
} from "../../features/itemsSlice";
import { IoBan, IoBanOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import "./ActionButtons.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import FavoriteGroupsModal from "../FavoriteGroupsModal/FavoriteGroupsModal";
import { loadLocalStorage } from "../../utils/utils";

const ActionButtons = ({ data }) => {
  const favoriteBtn = useRef(null);
  const notInterestedBtn = useRef(null);
  const actionBar = useRef(null);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDiscarded, setIsDiscarded] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400)
        actionBar.current.classList.add("fixed-top");
      else actionBar.current.classList.remove("fixed-top");
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [actionBar]);

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
      <div className="actions-container">
        <div className="actions" ref={actionBar}>
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
      </div>
      <FavoriteGroupsModal data={data} isVisible={isVisible} />
    </>
  );
};

export default ActionButtons;
