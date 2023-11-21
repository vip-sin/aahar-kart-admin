import Image from "next/image";
import React, { useState } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex items-center justify-center relative">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2"
      >
        Prev
      </button>
      <Image
        width={250}
        height={150}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="mx-auto rounded-md shadow-md"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
