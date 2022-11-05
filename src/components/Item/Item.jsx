import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Lazy } from "swiper";
import "swiper/css";
import "swiper/css/lazy";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Item.css";
import ImageSlide from "../ImageSlide/ImageSlide";
import { IoBedOutline, IoExpand } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import Button from "../Button/Button";
import ActionButtons from "../ActionButtons/ActionButtons";

const Item = ({ data, description }) => {
  const { title, price, currency_id, location, attributes, condition } = data;
  const totalArea = attributes.find((attribute) => attribute.id === "TOTAL_AREA");
  const bathrooms = attributes.find((attribute) => attribute.id === "FULL_BATHROOMS");
  const bedrooms = () => {
    const bedrooms = attributes.find((attribute) => attribute.id === "BEDROOMS");
    const rooms = attributes.find((attribute) => attribute.id === "ROOMS");
    if (Number(bedrooms.value_name) !== 0) return Number(bedrooms.value_name);
    else return Number(rooms.value_name);
  };
  return (
    <div className="item">
      <div className="main-info">
        {condition === "new" ? <span className="tag">A estrenar</span> : <></>}
        <h1>{title}</h1>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          lazy={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Lazy, Pagination, Navigation]}
          className="images"
        >
          {data.pictures.map((pic, i) => (
            <SwiperSlide key={pic.id}>
              <ImageSlide pic={pic} i={i} length={data.pictures.length} />
            </SwiperSlide>
          ))}
        </Swiper>
        <ActionButtons data={data} />
        <h2 className="price">
          {currency_id} {price}
        </h2>
        <div className="attributes">
          <p>
            <IoExpand /> {totalArea.value_name} totales
          </p>
          <p>
            <IoBedOutline />{" "}
            {bedrooms() > 1 ? <>{bedrooms()} dormitorios</> : <>{bedrooms()} dormitorio</>}
          </p>
          <p>
            <TbBath />{" "}
            {Number(bathrooms.value_name) > 1 ? (
              <>{bathrooms.value_name} baños</>
            ) : (
              <>{bathrooms.value_name} baño</>
            )}
          </p>
        </div>
        <Button text="contactar" type="primary" />
      </div>
      {location ? (
        <div className="location">
          <h2>Ubicación</h2>
          <p>
            {location.address_line}, {location.city.name}, {location.country.name}
          </p>
        </div>
      ) : (
        <></>
      )}
      {attributes ? (
        <div className="attributes">
          <h2>Características</h2>
          <div className="table">
            {attributes.map((attribute) => (
              <div className="attribute">
                <h3>{attribute.name}</h3>
                <span>{attribute.value_name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="description">
        <h2>Descripción</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Item;
