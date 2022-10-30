import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { zonesList } from "../../utils/zones";
import { selectZone } from "../../features/searchSlice";
import "./Datalist.css";

const Datalist = () => {
  const dispatch = useDispatch();
  const query = useRef(null);
  const [open, setOpen] = useState(false);
  const [zones, setZones] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuery, setFilteredQuery] = useState([]);

  useEffect(() => {
    setZones(zonesList);
  }, [zones]);

  const searchResults = () => {
    setSearchQuery(query.current.value);
    let keyword = query.current.value.toLowerCase();
    setFilteredQuery(
      //eslint-disable-next-line
      zones.filter((zone) => {
        if (zone.nombre.toLowerCase().includes(keyword)) return zone;
      })
    );
  };

  const toggleListbox = () => {
    setTimeout(() => setOpen(!open), 100);
  };

  const selectItem = (zone) => {
    query.current.value = zone.name;
    dispatch(selectZone(zone));
  };

  return (
    <div className="combobox">
      <label>
        <input
          type="text"
          placeholder="Seleccione un barrio"
          ref={query}
          onKeyUp={searchResults}
          onFocus={toggleListbox}
          onBlur={toggleListbox}
        />
      </label>
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
