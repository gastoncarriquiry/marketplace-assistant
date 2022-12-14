import { useRef } from "react";
import { IoHeart, IoHeartOutline, IoMenuOutline, IoSearch, IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleMenuState } from "../../features/menuSlice";
import Menu from "../Menu/Menu";
import "./TabBar.css";

const TabBar = () => {
  const dispatch = useDispatch();
  const menuState = useSelector((state) => state.menu.menuState);
  const menuButton = useRef(null);

  const toggleMenu = () => {
    dispatch(toggleMenuState(!menuState));
  };

  return (
    <>
      <nav className="tab-bar">
        <NavLink to="favoritos">
          <IoHeartOutline />
          <IoHeart />
        </NavLink>
        <NavLink to="resultados" className="search">
          <IoSearchOutline />
          <IoSearch />
        </NavLink>
        <button ref={menuButton} className="menu" onClick={toggleMenu}>
          <IoMenuOutline />
        </button>
      </nav>
      <Menu ref={menuButton} />
    </>
  );
};

export default TabBar;
