"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage: React.FC = () => {
  return (
    <div className="w-full h-screen">
      {/* Carousel - Full Screen */}
      <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={2500} // Faster movement (1.5s per slide)
      transitionTime={1500} // Smoother transition
      swipeable={true} // Enable touch gestures
      dynamicHeight={true} // Adjust height dynamically
      stopOnHover={false} // Keep autoplay running
      showArrows={true} // Show navigation arrows
      className="w-full h-full"
      >
        <div>
          <img
            src="https://steptodown.com/istock-downloader/images/steptodown.com435213.jpg"
            alt="Homemade Product 1"
            className="w-full h-screen object-cover"
          />
        </div>
        <div>
          <img
            src="https://steptodown.com/istock-downloader/images/steptodown.com825878.jpg"
            alt="Homemade Product 2"
            className="w-full h-screen object-cover"
          />
        </div>
        <div>
          <img
            src="https://steptodown.com/istock-downloader/images/steptodown.com499001.jpg"
            alt="Homemade Product 3"
            className="w-full h-screen object-cover"
          />
        </div>
      </Carousel>

      {/* Call to Action */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Welcome to Our Homemade Products Store!
        </h1>
        <p className="text-xl text-white mt-4 drop-shadow-lg">
          Discover the finest homemade products crafted with love and care.
        </p>
        <a
          href="/shop"
          className="mt-6 inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Explore Products
        </a>
      </div>
    </div>
  );
};

export default HomePage;
