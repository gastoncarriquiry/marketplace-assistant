import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { selectZone } from "../../features/searchSlice";
import { zonesList } from "../../utils/zones";
import "./Datalist.css";

const Datalist = () => {
  const dispatch = useDispatch();
  const query = useRef(null);
  const [open, setOpen] = useState(false);
  const [zones, setZones] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuery, setFilteredQuery] = useState([]);

  useEffect(() => {
    if (query.current.value === "") dispatch(selectZone(""));
  }, []);

  useEffect(() => {
    setZones(zonesList);
  }, [zones]);

  const searchResults = () => {
    setSearchQuery(query.current.value);
    let keyword = query.current.value.toLowerCase();
    setFilteredQuery(
      zones.filter((zone) => {
        if (zone.name.toLowerCase().includes(keyword)) return zone;
      })
    );
  };

  const toggleListbox = () => {
    setTimeout(() => setOpen(!open), 100);
  };

  const selectItem = (zone) => {
    query.current.value = zone.name;
    dispatch(selectZone(zone.name.toLowerCase()));
  };

  return (
    <div className="combobox">
      <div>
        <label htmlFor="zone">Barrio</label>
        <input
          id="zone"
          className="input"
          type="text"
          placeholder="Ingrese un barrio"
          ref={query}
          onKeyUp={searchResults}
          onChange={() => dispatch(selectZone(query.current.value.toLowerCase()))}
          onFocus={toggleListbox}
          onBlur={toggleListbox}
        />
      </div>
      <div className={`listbox ${open ? "open" : "closed"}`}>
        {searchQuery === ""
          ? zones
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((zone) => (
                <li key={zone.id} onClick={() => selectItem(zone)} className="list-item">
                  <p>{zone.name}</p>
                </li>
              ))
          : filteredQuery.map((zone) => (
              <li key={zone.id} onClick={() => selectItem(zone)} className="list-item">
                <p>{zone.name}</p>
              </li>
            ))}
      </div>
    </div>
  );
};

export default Datalist;
