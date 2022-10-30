import { forwardRef } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuState } from "../../features/menuSlice";
import "./Menu.css";

const Menu = forwardRef((props, ref) => {
  const menuState = useSelector((state) => state.menu.menuState);
  const menu = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (evt) => {
      if (menu.current !== null) {
        let onMenu = menu.current.contains(evt.target);
        let onMenuButton = ref.current.contains(evt.target);

        if (!onMenu && !onMenuButton) {
          dispatch(toggleMenuState(false));
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, [ref]);

  return (
    <div ref={menu} className={`menu-list ${menuState ? "deployed" : "retracted"}`}>
      Menu
    </div>
  );
});

export default Menu;
