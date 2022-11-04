import { useEffect } from "react";
import { useRef } from "react";
import { IoBan, IoBanOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import "./ActionButtons.css";

const ActionButtons = () => {
  const favoriteBtn = useRef(null);
  const notInterestedBtn = useRef(null);
  const actionBar = useRef(null);

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

  if (actionBar.current) window.onscroll = () => {};

  const handleClick = (e) => {
    e.target.classList.toggle("selected");
    if (e.target.classList.contains("favorite")) {
      notInterestedBtn.current.classList.remove("selected");
      //TODO: favorite item
    }
    if (e.target.classList.contains("not-interested")) {
      favoriteBtn.current.classList.remove("selected");
      //TODO: item not of interest
    }
  };

  return (
    <div className="actions-container">
      <div className="actions" ref={actionBar}>
        <button className="favorite" ref={favoriteBtn} onClick={handleClick}>
          <IoHeartOutline />
          <IoHeart />
        </button>
        <button className="not-interested" ref={notInterestedBtn} onClick={handleClick}>
          <IoBanOutline />
          <IoBan />
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
