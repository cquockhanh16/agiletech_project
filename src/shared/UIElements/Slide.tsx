import React from "react";
import Slider from "react-slick";
import "./Slide.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowLongLeft } from "react-icons/hi2";

import { HiArrowLongRight } from "react-icons/hi2";
import { Gallery } from "../../interface/gallery";

interface GalleryComponentProps {
  slides: Gallery[];
}

const Slide: React.FC<GalleryComponentProps> = ({ slides }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <HiArrowLongRight className='icon-arrow' />,
    prevArrow: <HiArrowLongLeft className='icon-arrow' />,
  };
  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={"slide" + index} className='slide'>
          <div className='slide-image'>
            <img
              src={
                "data:image/png;base64,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"
              }
              alt={slide.id}
              className='slide-image'
            />
          </div>
          <div className='slide-content'>
            <h3>{"John Fang"}</h3>
            <span className='email'>{"wordfaang.com"}</span>
            <p>{slide.desctiption}</p>
          </div>
          <div className='slide-shadow '></div>
        </div>
      ))}
    </Slider>
  );
};

export default Slide;
