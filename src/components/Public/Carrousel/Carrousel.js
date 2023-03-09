import React from "react";

import { Carousel } from "react-bootstrap";
import PlumberImg from '../../../assets/plumber.jpg';

function Carrousel() {
  return (
   


<div className="bgCarousel" style={{ backgroundImage:{PlumberImg}}}>
      
        <Carousel   >  
         
          <Carousel.Item className="slider-item" >
         <div class="overlay"></div>
            <div className="container" >
              <div 
                className="row slider-text align-items-center"
                data-scrollax-parent="true"
              >
            <div  className="animate__zoomIn" style={{display:"flex" , flexWrap:"wrap" , justifyContent:"center",alignItems:"center" }}>
                  <img 
                    src={PlumberImg}
                    width="1200px"
                    height="500px"
                    alt="myimage"
                  /> 
                </div>
              </div>
            </div>
          </Carousel.Item>



          <Carousel.Item className="slider-item">
           {/*<div class="overlay"></div>*/}
            <div className="container">
              <div
                className="row slider-text align-items-center"
                data-scrollax-parent="true"
              >
               <div className="animate__zoomIn" style={{display:"flex" , flexWrap:"wrap" , justifyContent:"center",alignItems:"center" }}>
                  <img
                    src={PlumberImg}
                    width="1200px"
                    height="500px"
                    alt="myimage"
                  /> 
               </div>
              </div>
            </div>
          </Carousel.Item>



          <Carousel.Item className="slider-item">
        
            <div className="container">
              <div
                className="row slider-text align-items-center"
                data-scrollax-parent="true"
              >
             <div className="animate__zoomIn" style={{display:"flex" , flexWrap:"wrap" , justifyContent:"center",alignItems:"center" }}>
                  <img
                    src={PlumberImg}
                    width="1200px"
                    height="500px"
                    alt="myimage"
                  /> 
            </div>
              </div>
            </div>
          </Carousel.Item>


        </Carousel>

     
      
    </div>
  );
};

export default Carrousel;
