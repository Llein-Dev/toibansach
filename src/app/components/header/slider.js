"use client";
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Cấu hình cho slider
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

const SliderComponent = () => {
    return (
        <div className="slider-container">
            <Slider {...sliderSettings}>
                <div className="slide w-100">
                    <img src="/images/toi-ban-sach/1.png" alt="Slide 1" className="slider-image w-100" />
               
                </div>
                <div className="slide">
                    <img src="/images/toi-ban-sach/2.png" alt="Slide 2" className="slider-image w-100" />
            
                </div>
                <div className="slide">
                    <img src="/images/toi-ban-sach/3.png" alt="Slide 3" className="slider-image w-100" />
                  
                </div>
            </Slider>
        </div>
    );
};

export default SliderComponent;
