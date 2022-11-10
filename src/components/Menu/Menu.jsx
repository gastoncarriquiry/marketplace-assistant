import { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetItemsSlice } from "../../features/itemsSlice";
import { toggleMenuState } from "../../features/menuSlice";
import { resetSearchSlice } from "../../features/searchSlice";
import Button from "../Button/Button";
import "./Menu.css";

const Menu = forwardRef((props, ref) => {
  const menuState = useSelector((state) => state.menu.menuState);
  const menu = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const toggleModal = () => setIsVisible(!isVisible);
  const handleClick = () => dispatch(toggleMenuState(false));
  const deleteData = () => {
    dispatch(toggleMenuState(false));
    localStorage.clear();
    setIsVisible(false);
    navigate("/");
    dispatch(resetItemsSlice());
    dispatch(resetSearchSlice());
  };

  return (
    <div ref={menu} className={`menu-list ${menuState ? "deployed" : "retracted"}`}>
      <ul>
        <li>
          <Link to="/" onClick={handleClick}>
            Ir a inicio
          </Link>
        </li>
        <li>
          <Link to="/descartados" onClick={handleClick}>
            Lista de descartados
          </Link>
        </li>
        <li onClick={toggleModal}>Eliminar datos</li>
      </ul>
      <div className={`modal-container ${isVisible ? "visible" : "hidden"}`}>
        <div className="modal">
          <h2>Usted está a un paso de eliminar todos los datos almacenados. ¿Desea continuar?</h2>
          <div className="buttons">
            <button onClick={toggleModal}>Cancelar</button>
            <Button text="confirmar" type="primary" onClick={deleteData} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Menu;
