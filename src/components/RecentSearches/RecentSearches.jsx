import { useSelector } from "react-redux";
import { FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import RecentSearchButton from "../RecentSearchButton/RecentSearchButton";
import "./RecentSearches.css";

const RecentSearches = () => {
  const recentSearches = useSelector((state) => state.search.recentSearches);

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
      <div className="history"></div>
    </div>
  ) : (
    <></>
  );
};

export default RecentSearches;
