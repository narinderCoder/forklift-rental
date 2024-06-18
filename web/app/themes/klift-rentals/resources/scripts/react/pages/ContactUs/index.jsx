import { Phone } from "lucide-react";
import { AtSign } from "lucide-react";
import { MapPin } from "lucide-react";
import Instagram from "../../icons/instagram";
import Linkedin from "../../icons/linkedin";
import Facebook from "../../icons/facebook";
import Twitter from "../../icons/twitter";
import "./contact-us.scss";
import Checkbox from "@scripts/react/components/checkbox";
import { useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Banner from "@scripts/react/components/banner";

const required_error = 'This field is required';

// const schema = z.object({
//   first_name: z.string({ required_error }).min(1, required_error),
//   last_name: z.string({ required_error }).min(1, required_error),
//   email: z.string({ required_error }).email({ message: 'Enter a valid email' }),
//   phone: z
//     .string({ required_error })
//     .min(10, 'Enter a valid phone number')
//     .max(10, 'Enter a valid phone number'),
//   message: z.string({ required_error }).min(1, required_error),
//   accept_terms: z.boolean().refine((val) => val === true, { message: 'You must accept the terms and conditions' })
// });

const schema = z.object({
  first_name: z.string().min(1, { message: required_error }),
  last_name: z.string().min(1, { message: required_error }),
  email: z.string().email({ message: 'Enter a valid email' }).min(1, { message: required_error }),
  phone: z
    .string()
    .min(10, { message: 'Enter a valid phone number' })
    .max(10, { message: 'Enter a valid phone number' })
    .regex(/^\d{10}$/, { message: 'Enter a valid phone number' }),
  message: z.string().min(1, { message: required_error }),
  accept_terms: z.boolean().refine((val) => val === true, { message: 'You must accept the terms and conditions' })
});
const ContactUs = () => {
 
  const [pageData,setPageData] = useState([]);

  const [nonce,setNonce] = useState([]);

  
  const [solutions,setSolutions] = useState([]);
  const [loading,setLoading] = useState(false);
  const handleLoading = (e) => setLoading(e);

  const [terms, setTerms] = useState(false)
  // const [errors, setErrors] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    handleLoading(true);
    const response = await axios.post(`${EnvProvider.baseUrl}custom-form-submission/post-contact-us`, data);    
  
      if (response.status === 200) {
        alert('Form submission successful!');
         reset();
      } else {
        alert('Form submission failed.');
      }
     
      handleLoading(false);
  }
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        var divElement = document.getElementById('contactPageReactApp');
        let $_ID = parseInt(divElement.getAttribute('data-id')); 

        let $nonce = parseInt(divElement.getAttribute('data-nonce')); 
        setNonce($nonce);
 
        const response = await fetch(
          `${EnvProvider.baseUrl}custom-page/${$_ID}`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data; 
        setPageData(data1);
        setSolutions(data1.custom_fields?.sections?.section_items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="contact-us-page">
      {/* <div className="position-relative w-100" style={{ height: "90vh" }}>
        <div
          className="w-100 bg-tertiary bg-opacity-100"
          style={{
            backgroundImage: `url(${pageData.custom_fields?.banner_image})`,
            zIndex: 10,
            height: "90vh",
          }}
        ></div>
        <div
          className="position-absolute d-flex flex-column align-items-center"
          style={{
            
            zIndex: 20,
            transform: "translateX(-50%) translateY(-50%)",
            top: "50%",
            left: "50%",
          }}
        >
          <h3
            className="h3 text-secondary text-center"
            style={{ marginBottom: "1.75rem" }}
          >
           {pageData?.title}
          </h3>
          <p className="p1 text-center text-secondary text-opacity-80" dangerouslySetInnerHTML={{ __html: pageData?.content }}>
          </p>
        </div>
      </div> */}
  <Banner height="80vh" filter="none" image={pageData.custom_fields?.banner_image}>
  <h3
            className="h3 text-white text-center"
            style={{ marginBottom: "1.75rem" }}
          >
           {pageData?.title}
          </h3>
          <p className="p1 text-center text-white text-opacity-80" dangerouslySetInnerHTML={{ __html: pageData?.content }}>
          </p>
      </Banner>
      <div className="container mx-auto section-alt">
        <div className="row g-4">
          <div className="col-md-5 col-12">
            <div
              className="d-flex flex-column justify-content-center h-100 p-4"
              style={{ gap: "3.75rem" }}
            >
              <div>
                <h3 className="h3">Get In Touch</h3>
                <p className="p1 text-secondary text-opacity-60">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="d-flex flex-column" style={{ gap: "2.5rem" }}>
                <div className="d-flex gap-4 align-items-start">
                  <div className="bg-primary text-white p-3 rounded-4 d-flex align-items-center justify-content-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h6 className="h6">Location</h6>
                    <p className="p2 text-opacity-60 text-secondary">
                      Lorem Ipsum is simply dummy text
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-4 align-items-start">
                  <div className="bg-primary text-white p-3 rounded-4 d-flex align-items-center justify-content-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h6 className="h6">Phone</h6>
                    <p className="p2 text-opacity-60 text-secondary">
                      Lorem Ipsum is simply dummy text
                    </p>
                  </div>
                </div>
                <div className="d-flex gap-4 align-items-start">
                  <div className="bg-primary text-white p-3 rounded-4 d-flex align-items-center justify-content-center">
                    <AtSign size={18} />
                  </div>
                  <div>
                    <h6 className="h6">Email</h6>
                    <p className="p2 text-opacity-60 text-secondary">
                      Lorem Ipsum is simply dummy text
                    </p>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-4 text-primary text-opacity-80">
                <Instagram />
                <Linkedin />
                <Facebook />
                <Twitter />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 offset-md-1">
            <div className="contact-card">
              <h2 className="h2">Send a Message</h2>
              <form className="d-flex flex-column gap-3 w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column flex-md-row gap-3 w-full">
                  <div>
                    <label className="p1">First Name*</label>
                    <input className="contact-form-input"  
                    {...register("first_name")}
                    // name="first_name"
                    // value={formData.first_name}
                    // onChange={handleChange}
                    />
                      {errors.first_name && <p className="error text-danger">{errors.first_name.message}</p>}
                  </div>
                  <div>
                    <label className="p1">Last Name*</label>
                    <input className="contact-form-input"  
                     {...register("last_name")}
                    // name="last_name"
                    // value={formData.last_name}
                    // onChange={handleChange}
                    />
                      {errors.last_name && <p className="error text-danger">{errors.last_name.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="p1">Email Address*</label>
                  <input className="contact-form-input"   {...register("email")} 
                  //  name="email"
                  //   value={formData.email}
                  //   onChange={handleChange}
                    />
                      {errors.email && <p className="error text-danger">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="p1">Phone Number*</label>
                  <input type="tel" className="contact-form-input"   {...register("phone")} 
                  //  name="phone"
                  //   value={formData.phone}
                  //   onChange={handleChange}
                    />
                      {errors.phone && <p className="error text-danger">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="p1">Your Message*</label>
                  <textarea style={{ height: "10rem", resize: "none" }}   {...register("message")} 
                  //  name="message"
                  //   value={formData.message}
                  //   onChange={handleChange}
                    />
                      {errors.message && <p className="error text-danger">{errors.message.message}</p>}
                </div>
                <div className="d-flex mb-4">
                  <Checkbox
                    val={true}
                    label="By submitting this form, you agree to the Terms of Use & our Privacy Policy"
                    reverse
                    {...register("accept_terms")}
                    checkboxClass={"border-secondary border-opacity-50 mt-1"}
                    className={"align-items-start p-0"}
                  />
                  {errors.accept_terms && <p className="error text-danger">{errors.accept_terms.message}</p>}
                </div>
                <div className="d-flex">
                  <button className="btn-primary bg-primary text-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <iframe
          title="Google Maps"
          width="100%"
          height="600"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=7520%20Eagle%20Pass%20St,%20Houston,%20TX%2077020,%20USA+(Best%20Forklift)&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          style={{ border: 0 }}
        >
          <a href="https://www.gps.ie/">gps trackers</a>
        </iframe>
      </div>
    </div>
  );
};

export default ContactUs;
