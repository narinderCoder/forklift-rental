import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Slider from "react-slick";

const TestimonialSlider = (props) => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
  };

  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {props.data !== undefined
          ? props.data.map((t, index) => (
              <div
                key={index}
                className="w-100 d-flex flex-column align-items-center flex-md-row gap-4"
              >
                <img
                  src={t.image}
                  alt={t.image}
                  width={"11rem"}
                  height={"11rem"}
                  className="bg-transparent rounded-circle"
                  style={{ width: "11rem", height: "11rem" }}
                />

                <div
                  className="h-100 w-100 position-relative mt-md-0 "
                  style={{ marginTop: "1rem" }}
                >
                  <svg
                    width="120"
                    height="100"
                    viewBox="0 0 120 102"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="position-absolute testimonial-slider-blockquote"
                  >
                    <g opacity="0.06">
                      <path
                        d="M0 34.649C0.458571 32.1664 0.714738 29.6269 1.40417 27.2138C4.36433 16.8565 10.6072 9.13666 20.1929 4.12717C26.9165 0.610405 34.1176 -0.256135 41.5433 0.0632832C44.358 0.18346 46.1227 2.13476 46.1448 4.95892C46.1701 7.8495 46.1701 10.7401 46.1448 13.6306C46.1195 16.5434 44.1904 18.3808 41.2903 18.5168C38.1436 18.6654 34.9209 18.58 31.8786 19.26C24.5446 20.9014 18.7002 28.384 18.5263 35.8887C18.4851 37.6344 18.4282 39.4339 18.7793 41.1227C19.3801 44.026 21.9703 46.0848 24.9336 46.1322C30.2435 46.2176 35.5534 46.1923 40.8665 46.1828C47.0082 46.1733 51.5813 48.8204 54.1366 54.415C54.9494 56.1955 55.2783 58.3302 55.3036 60.31C55.4238 69.3707 55.3953 78.4314 55.3447 87.4953C55.3004 95.6926 49.5509 101.509 41.3251 101.591C32.2264 101.679 23.1278 101.676 14.0291 101.591C6.75206 101.521 1.54965 97.0494 0.180266 89.9241C0.151803 89.7755 0.0632511 89.6364 0.00316256 89.494C0.00316256 71.2113 0.00316256 52.9317 0.00316256 34.649H0Z"
                        fill="#090808"
                      />
                      <path
                        d="M64.677 61.4519C64.677 52.7833 64.3197 44.0958 64.7593 35.4494C65.4803 21.2621 72.3937 10.7624 84.9617 4.06416C91.6125 0.515768 98.8168 -0.255896 106.198 0.0666849C108.867 0.183699 110.638 1.97371 110.73 4.65555C110.838 7.73588 110.841 10.8289 110.73 13.9092C110.629 16.7365 108.687 18.3874 105.847 18.517C102.742 18.6593 99.56 18.5834 96.5524 19.2476C89.326 20.8384 83.5132 28.0933 83.1622 35.4683C83.0894 36.9864 83.0547 38.517 83.1717 40.0287C83.4278 43.419 86.154 46.0724 89.5853 46.1356C94.9712 46.2305 100.36 46.1609 105.749 46.1926C111.853 46.2305 116.331 48.9977 118.807 54.5607C119.604 56.3475 119.905 58.4823 119.93 60.4652C120.044 69.4057 119.99 78.3494 119.977 87.2931C119.965 95.5569 114.285 101.477 106.024 101.585C96.8908 101.702 87.7511 101.68 78.6176 101.591C71.369 101.518 65.8915 96.8219 64.7814 89.9149C64.6201 88.9187 64.6328 87.8909 64.6296 86.8788C64.6201 78.4063 64.6233 69.9307 64.6233 61.4582C64.6423 61.4582 64.6581 61.4582 64.677 61.4582V61.4519Z"
                        fill="#090808"
                      />
                    </g>
                  </svg>
                  <p className="opacity-80">{t.description}</p>
                </div>
              </div>
            ))
          : null}
      </Slider>
      <div
        className="w-100 justify-content-center align-items-center d-flex justify-content-md-end mt-4"
        style={{ gap: "0.5rem" }}
      >
        <ArrowLeft
          onClick={() => {
            if (currentSlide > 0) {
              sliderRef.current?.slickPrev();
            }
          }}
          className={
            currentSlide === 0
              ? "arrow-not-working"
              : currentSlide > 0
              ? "arrow-working-hover"
              : "arrow-working"
          }
        />
        <ArrowRight
          onClick={() => {
            if (currentSlide < props.data.length - 1) {
              sliderRef.current?.slickNext();
            }
          }}
          className={
            currentSlide === props.data.length - 1
              ? "arrow-not-working"
              : currentSlide < props.data.length - 1
              ? "arrow-working-hover"
              : "arrow-working"
          }
        />
      </div>
    </div>
  );
};

export default TestimonialSlider;
