// import { useState } from "react";
// import Slider from "react-slick";

// const ProductSlider = ({ data, className = "" }) => {
//   const [slideIndex, setSlideIndex] = useState(0);
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     dotsClass: "slick-product-dots",
//     beforeChange: (_, next) => setSlideIndex(next),
//     customPaging: (i) => {
//       if (!data.images) return <></>;
//       return (
//         <div
//           style={{ transition: "all 0.3s" }}
//           className="product-slider-extra-container"
//         >
//           <img
//             src={data.images[i]}
//             alt={data.images[i]}
//             style={{
//               transition: "all 0.3s",
//               objectFit: "cover",
//             }}
//             className={`mx-auto rounded-4 ${
//               slideIndex === i
//                 ? "product-slider-extra-selected"
//                 : "product-slider-extra"
//             }`}
//           />
//         </div>
//       );
//     },
//   };

//   return (
//     <div className={`product-slider-container ${className}`}>
//       <Slider {...settings}>
//         {data.images &&
//           data.images.map((product, index) => (
//             <img
//               key={index}
//               src={product}
//               alt={data.title}
//               width={"100%"}
//               height={"100%"}
//               className="rounded-4"
//             />
//           ))}
//       </Slider>
//     </div>
//   );
// };

// export default ProductSlider;

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductSlider = ({ data, className = ""  }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef(null);

  const documentRef = useRef(null);

  const scrollToCenter = (index) => {
    const pager = documentRef.current;
    const dot = pager.children[index];

    const pagerRect = pager.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();

    const scrollLeft = dot.offsetLeft - pagerRect.width / 2 + dotRect.width / 2;

    pager.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  };

  const settings = {
    dots: true,
    infinite: data.images && data.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: "slick-product-dots",
    appendDots: (dots) => <ul ref={documentRef}>{dots}</ul>,
    beforeChange: (_, next) => {
      setSlideIndex(next);
      scrollToCenter(next);
    },
    customPaging: (i) => {
      if (!data.images) return <></>;
      return (
        <div
          style={{ transition: "all 0.3s" }}
          className="product-slider-extra-container"
        >
          <img
            src={data.images[i]}
            alt={data.images[i]}
            style={{
              transition: "all 0.3s",
              objectFit: "cover",
            }}
            className={`mx-auto rounded-4 ${
              slideIndex === i
                ? "product-slider-extra-selected"
                : "product-slider-extra"
            }`}
          />
        </div>
      );
    },
  };
  console.log(data, "working")

  return (
    <div className={`product-slider-container position-relative ${className}`}>
      <div
        className="position-absolute start-0 bottom-0 bg-white px-2 slider-chevron"
        style={{ zIndex: 99999 }}
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <ChevronLeft />
      </div>
      <Slider {...settings} ref={sliderRef}>
        {data.images && data.images.map((product, index) => (
          <img
            key={index}
            src={product}
            alt={data.title}
            width={"100%"}
            height={"100%"}
            className="rounded-4"
          />
        ))}
       
      </Slider>
      <div
        className="position-absolute end-0 bottom-0 bg-white px-2 slider-chevron"
        style={{ zIndex: 99999 }}
        onClick={() => sliderRef.current?.slickNext()}
      >
        <ChevronRight />
      </div>
    </div>
  );
};

export default ProductSlider;