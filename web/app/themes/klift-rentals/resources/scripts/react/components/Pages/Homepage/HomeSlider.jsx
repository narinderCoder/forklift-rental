import React, { useState,useEffect } from 'react';
import Background from './background'
import Middle from './middle'
import Top from './top'
import Slider from "react-slick";
import EnvProvider from '../../EnvContext'; 
import { Carousel } from 'react-bootstrap';
// import { Carousel } from 'bootstrap';
 
export default function HomeSlider() {
   
    const [sliders,setSliders] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${EnvProvider.baseUrl}custom-posts/home-slider`);
            const jsonData = await response.json(); 
            setSliders(jsonData.data); 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }; 
        fetchData();
      }, []);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <div className="slider-container">
       
       <Carousel>
     
      
    
     {sliders.map((s, index) => (
          
          <Carousel.Item>
          <img
              className="d-block w-100"
              src={s.thumbnail}
              alt="First slide"
          />
          <Carousel.Caption>
              <h3 className="text-4xl leading-[50px] md:text-7xl md:leading-[100px] text-white font-bold mb-7">{s.title}</h3>
              <p className="text-white p1"dangerouslySetInnerHTML={{ __html: s.content }}></p>
          </Carousel.Caption>
      </Carousel.Item>
     ))}
  
 
 
</Carousel>
       {/* <div className="image-container">
        <div className='topImage'> <Top/></div>
        <div className='middleImage'> <Middle/></div> 
       </div> */}
    </div>

//      <main>
        
//         <div className="slider-container">

//         {/* <Middle className={'absolute transform translate-y-1/2  -bottom-[45%] -z-3'}/>
//                 <Top className={'absolute transform translate-y-1/2  -bottom-[45%] -z-2'}/> */}
//           {/* <Slider {...settings}>
//                 {sliders.map((s, index) => (
//                     <div>
//                         <img src={s.thumbnail} alt="" />
//                         <h1 className="text-4xl leading-[50px] md:text-7xl md:leading-[100px] text-white font-bold mb-7">
//                             {s.title}
//                         </h1>
//                         <div className="text-white p1" dangerouslySetInnerHTML={{ __html: s.content }}></div>
//                     </div>
//                 ))}
//           </Slider> */}

// {/* <Slider {...settings}>
//       <div>
//         <h3>1</h3>
//       </div>
//       <div>
//         <h3>2</h3>
//       </div>
//       <div>
//         <h3>3</h3>
//       </div>
//       <div>
//         <h3>4</h3>
//       </div>
//       <div>
//         <h3>5</h3>
//       </div>
//       <div>
//         <h3>6</h3>
//       </div>
//     </Slider> */}



//                 {/* <Middle className={'absolute transform translate-y-1/2  -bottom-[45%] -z-3'}/>
//                 <Top className={'absolute transform translate-y-1/2  -bottom-[45%] -z-2'}/>
//                 <Slider {...settings}>
//             <div className="relative w-full h-[800px] bg-center bg-cover bg-home-banner flex justify-center items-end">
//                 <Background className={'absolute transform translate-y-1/2 -bottom-[45%] -z-4'}/>
               
//                 <div className="absolute text-center transform max-w-[720px] translate-y-1/2 bottom-[30%] z-1 px-2">

//                 <h1 className="text-4xl leading-[50px] md:text-7xl md:leading-[100px] text-white font-bold mb-7">
//                     Lorem Ipsum is simply dummy text
//                 </h1>
//                 <p className="text-white p1">
//                     {`Lorem Ipsum is simply dummy text of the printing and typesetting
//                     industry. Lorem Ipsum has been the industry's standard dummy text
//                     ever since the 1500s, when an unknown printer took a galley of type
//                     and scrambled it to make a type specimen book.`}
//                 </p>
//                 </div>
//             </div>
//            </Slider> */}
//     </div>
      
//     </main>
  )
}