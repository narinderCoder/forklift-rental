import React, { useState } from "react";
import Slider from "react-slick";

export default function ProductSlider({
  data,
  className
}) {

const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_, next) => setSlideIndex(next),
    dotsClass: "slick-dots overflow-x-scroll w-full",
    customPaging: (i) => {
      if (!data.images) return <></>;
      return (
        <div className="w-28 h-28">
          <img
            src={data.images[i]}
            alt={data.images[i]}
            className={`object-cover mx-auto aspect-square rounded-lg transition-all duration-300 ${
              slideIndex === i
                ? "h-[6.5rem] w-[6.5rem]"
                : "h-24 w-24 brightness-75"
            }`}
          />
        </div>
      );
    },
  };
  
  

  return (
    <div className={`w-full md:w-2/5 pb-32 ${className}`}>
      <Slider {...settings}>
        {data.images &&
          data.images.map((product, index) => (
            <img
              key={index}
              src={product}
              alt={data.title}
              className="w-full h-full"
            />
          ))}
      </Slider>
    </div>
  );
}
