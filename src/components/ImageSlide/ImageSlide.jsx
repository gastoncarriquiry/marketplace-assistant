import "./ImageSlide.css";

const ImageSlide = ({ pic, i, length }) => {
  return (
    <>
      <img src={pic.secure_url} alt={`Imagen ${i}/${length}`} className="swiper-lazy" />
      <div className="swiper-lazy-preloader"></div>
    </>
  );
};

export default ImageSlide;
