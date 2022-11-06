import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { loadLocalStorage, saveLocalStorage } from "../../utils/utils";
import RecentSearchButton from "../RecentSearchButton/RecentSearchButton";
import "./RecentSearches.css";

const RecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState([]);
  const recentSearchesState = useSelector((state) => state.search.recentSearches);
  const preventReload = useSelector((state) => state.search.preventReload);

  useEffect(() => {
    if (preventReload) saveLocalStorage("recentSearches", recentSearchesState);
  }, [recentSearchesState]);

  useEffect(() => {
    const recentSearchesStorage = loadLocalStorage("recentSearches");
    if (!recentSearchesStorage || recentSearchesStorage.length === 0) {
      saveLocalStorage("recentSearches", []);
      setRecentSearches([]);
    } else {
      setRecentSearches(recentSearchesStorage);
    }
  }, [recentSearchesState]);

  return recentSearches.length ? (
    <div className="recent-searches">
      <h2>Búsquedas recientes</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        freeMode={true}
        modules={[FreeMode]}
        className="history"
      >
        {recentSearches.map((search) => (
          <SwiperSlide key={search.id}>
            <RecentSearchButton data={search} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <></>
  );
};

export default RecentSearches;
