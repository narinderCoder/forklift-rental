import { useState, useEffect } from "react";
import TestimonialSlider from "../../../components/testimonial-slider";

export default function Testimonials(props) {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    if (props.data !== undefined && props.data !== null && props.data !== "") {
      setTestimonials(props.data);
    }
  }, [props]);

  return (
    <section className="section bg-tertiary px-2">
      <div className="container mx-auto">
        <h3 className="text-center h3 mb-custom text-break">TESTIMONIALS</h3>
        <TestimonialSlider data={testimonials} />
      </div>
    </section>
  );
}
