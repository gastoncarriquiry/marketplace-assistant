import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRecentSearch, setPreventReload, setQuery } from "../../features/searchSlice";
import { buildQuery, loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import Button from "../Button/Button";
import Datalist from "../Datalist/Datalist";
import "./SearchForm.css";

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const zone = useSelector((state) => state.search.selectedZone);
  const recentSearchesState = useSelector((state) => state.search.recentSearches);
  const [isDisabled, setIsDisabled] = useState(false);
  const opType = useRef(null);
  const propType = useRef(null);

  useEffect(() => {
    zone !== "" ? setIsDisabled(false) : setIsDisabled(true);
  }, [zone]);

  const handleSearch = () => {
    if (!isDisabled) {
      dispatch(setPreventReload(true));
      saveLocalStorage("results", []);
      const recentSearchesStorage = loadLocalStorage("recentSearches");
      if (recentSearchesStorage && recentSearchesStorage.length !== 0) {
        let existingSearch = recentSearchesStorage.find(
          (search) =>
            search.query === buildQuery(opType.current.value, propType.current.value, zone)
        );
        if (!existingSearch) {
          dispatch(
            addRecentSearch({
              id: recentSearchesStorage.length + 1,
              date: new Date().getTime(),
              query: buildQuery(opType.current.value, propType.current.value, zone),
            })
          );
        }
      } else {
        dispatch(
          addRecentSearch({
            id: recentSearchesState.length + 1,
            date: new Date().getTime(),
            query: buildQuery(opType.current.value, propType.current.value, zone),
          })
        );
      }
      dispatch(setQuery(buildQuery(opType.current.value, propType.current.value, zone)));
      navigate("/resultados");
    }
  };

  return (
    <div className="search-form">
      <div>
        <h2>Encontrá el inmueble que buscás</h2>
        <div>
          <label htmlFor="operation-type">Tipo de operación</label>
          <select className="input" id="operation-type" ref={opType}>
            <option defaultValue="venta">Venta</option>
            <option defaultValue="alquiler">Alquiler</option>
            <option defaultValue="alquiler por temporada">Alquiler por temporada</option>
          </select>
        </div>
        <div>
          <label htmlFor="property-type">Tipo de inmueble</label>
          <select className="input" id="property-type" ref={propType}>
            <option defaultValue="apartamentos">Apartamentos</option>
            <option defaultValue="casas">Casas</option>
            <option defaultValue="chacras">Chacras</option>
            <option defaultValue="cocheras">Cocheras</option>
            <option defaultValue="depositos y galpones">Depósitos y galpones</option>
            <option defaultValue="terrenos y lotes">Terrenos y lotes</option>
          </select>
        </div>
        <Datalist />
        <Button type="primary" text="Buscar" onClick={handleSearch} disabled={isDisabled} />
      </div>
    </div>
  );
};

export default SearchForm;
