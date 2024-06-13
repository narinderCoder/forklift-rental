import Slider from "react-slick";

const ProductInfoSlider = ({ data = [] }) => {
  //   const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 3,
    dotsClass: "slick-dots slick-dots-product-info",
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
console.log(data, "console")
  return (
    <div>
      <Slider {...settings}>
        {data && data.map((item, index) => (
          <div key={index} className="mx-auto p-4 mb-4 text-center">
            <img
              src={item.image}
              alt={item.image}
              className="mx-auto mb-4 rounded-4"
              style={{ width: "100%", objectFit: "cover" }}
            />
            <h4 className="mb-1">{item.title}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductInfoSlider;
