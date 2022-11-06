import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteGroup, addFavoriteItem, removeDiscardedItem } from "../../features/itemsSlice";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import Button from "../Button/Button";
import "./FavoriteGroupsModal.css";

const FavoriteGroupsModal = ({ data, isVisible }) => {
  const favoriteGroups = useSelector((state) => state.items.favoriteGroups);
  const dispatch = useDispatch();
  const input = useRef(null);
  const select = useRef(null);
  const modalContainer = useRef(null);

  useEffect(() => {
    if (favoriteGroups.length) saveLocalStorage("favoriteGroups", favoriteGroups);
  }, [favoriteGroups]);

  const handleClick = () => {
    const favoriteGroups = loadLocalStorage("favoriteGroups");
    if (input.current.value === "") {
      if (Number(select.current.selectedOptions[0].value) === 0) input.current.focus();
      else {
        dispatch(
          addFavoriteItem({
            ...data,
            group: {
              id: Number(select.current.selectedOptions[0].value),
              name: select.current.selectedOptions[0].text,
            },
          })
        );
        dispatch(removeDiscardedItem(data.id));
        modalContainer.current.classList.add("hidden");
        modalContainer.current.classList.remove("visible");
      }
    } else {
      if (favoriteGroups && favoriteGroups.length !== 0) {
        let existingGroup = favoriteGroups.find((group) => group.name === input.current.value);
        if (existingGroup) {
          dispatch(
            addFavoriteItem({
              ...data,
              group: {
                id: existingGroup.id,
                name: existingGroup.name,
              },
            })
          );
        } else {
          dispatch(
            addFavoriteItem({
              ...data,
              group: {
                id: favoriteGroups.length + 1,
                name: input.current.value,
              },
            })
          );
          dispatch(
            addFavoriteGroup({
              id: favoriteGroups.length + 1,
              name: input.current.value,
            })
          );
        }
      } else {
        dispatch(
          addFavoriteItem({
            ...data,
            group: {
              id: favoriteGroups.length + 1,
              name: input.current.value,
            },
          })
        );
        dispatch(
          addFavoriteGroup({
            id: favoriteGroups.length + 1,
            name: input.current.value,
          })
        );
      }
      dispatch(removeDiscardedItem(data.id));
      input.current.value = "";
      modalContainer.current.classList.add("hidden");
      modalContainer.current.classList.remove("visible");
    }
  };

  return (
    <div className={`modal-container ${isVisible ? "visible" : "hidden"}`} ref={modalContainer}>
      <div className="modal">
        <h2>Colecciones</h2>
        <div>
          <label htmlFor="existent-groups">Elija alguna de las colecciones existentes</label>
          <select id="existent-groups" ref={select}>
            <option value={0} selected disabled>
              -- Selecione una colección --
            </option>
            {favoriteGroups.length ? (
              favoriteGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))
            ) : (
              <option value={0} disabled>
                -- No hay colecciones aún --
              </option>
            )}
          </select>
        </div>
        <p>--- o ---</p>
        <div>
          <label htmlFor="">Genere una nueva colección</label>
          <input type="text" placeholder="Nueva Colección" autoFocus ref={input} />
        </div>
        <Button text="Confirmar" onClick={handleClick} type="primary" />
      </div>
    </div>
  );
};

export default FavoriteGroupsModal;
