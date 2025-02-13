import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const slideImages = [
  {
    url: "https://i.ibb.co.com/cgtcvkz/markus-winkler-ti-Kn62s3-HLs-unsplash.jpg",
    caption: "Your Gateway to the World: Explore Visa Options Today",
  },
  {
    url: "https://i.ibb.co.com/FmCn7WV/rocio-ramirez-ms-BJyzd-XZ1-Q-unsplash.jpg",
    caption: "Seamless Visa Applications: Simplifying Your Travel Dreams",
  },
  {
    url: "https://i.ibb.co.com/0sn6rk3/nicola-styles-Wr-Iq-O6-X51-Hs-unsplash.jpg",
    caption: "Your Adventure Begins Here: Find the Right Visa for You",
  },
];

const ImageSlider = () => {
  // Custom Tailwind Arrow Button
  const customArrow = (direction) => (
    <div
      className={`w-10 h-10 bg-gray-800 text-white flex items-center justify-center rounded-full cursor-pointer 
      ${
        direction === "prev"
          ? "absolute top-1/2 left-4 transform -translate-y-1/2"
          : "absolute top-1/2 right-4 transform -translate-y-1/2"
      }`}
    >
      {direction === "prev" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="slide-container relative">
      <Slide
        prevArrow={customArrow("prev")}
        nextArrow={customArrow("next")}
        autoplay={true}
      >
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              className="relative w-full h-96 bg-cover bg-center"
              style={{ backgroundImage: `url(${slideImage.url})` }}
            >
              <span className="absolute bottom-4 left-4 text-white font-bold bg-black bg-opacity-50 px-3 py-1 rounded">
                {slideImage.caption}
              </span>
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
