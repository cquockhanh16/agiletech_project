import React, { useEffect, useState } from "react";
import { Gallery } from "../../../interface/gallery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";
import Slide from "../../../shared/UIElements/Slide";

const Testimonials: React.FC = () => {
  const [slides, setSlides] = useState<Gallery[]>([]);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await fetch(
          "https://api-test-web.agiletech.vn/galleries"
        );
        const data: Gallery[] = await result.json();
        setSlides(data);
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
      }
    };

    loadUsers();
  }, []);
  return (
    <div className='testimonials'>
      <h1>Testimonials</h1>
      <Slide slides={slides} />
    </div>
  );
};

export default Testimonials;
