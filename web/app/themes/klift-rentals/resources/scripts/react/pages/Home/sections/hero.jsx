import Banner from '@scripts/react/icons/banner';
import React,{ useEffect, useState} from 'react'
import Slider from 'react-slick';
import EnvContext from '../../../EnvVar';
const Hero = () => {
  const [sliders,setSliders] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              `${EnvContext.baseUrl}custom-posts/home-slider`
            );
            const jsonData = await response.json();
             
            setSliders(jsonData.data);
             
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);


   
      return (
        <div className="position-relative">
        <video loop autoPlay muted playsInline className="w-100" height="auto">
          <source
            src={
              "https://static.vecteezy.com/system/resources/previews/003/612/345/forklift-operator-at-work-in-storehouse-video.webm"
            }
            type="video/webm"
          />
          Your browser does not support the video tag. I suggest you upgrade your
          browser.
        </video>
      </div>
      );
}

export default Hero