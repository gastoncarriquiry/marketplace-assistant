import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setRecentSearches } from "../../features/searchSlice";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import TabBar from "../TabBar/TabBar";
import "./UI.css";

const UI = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let recentSearchesStorage = loadLocalStorage("recentSearches");
    if (!recentSearchesStorage || recentSearchesStorage.length === 0) {
      saveLocalStorage("recentSearches", []);
    } else {
      dispatch(setRecentSearches(recentSearchesStorage));
    }
  }, []);

  return (
    <>
      <main className="content">
        <Outlet />
      </main>
      <TabBar />
    </>
  );
};

export default UI;
