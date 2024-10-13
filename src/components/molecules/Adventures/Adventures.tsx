import React, { useRef, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { cardData } from "@/data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"; // Importing icons
import Link from "next/link";
import { useRouter } from "next/router";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute -top-8 lg:block hidden right-4 transform -translate-y-1/2 cursor-pointer rounded-full p-2 bg-white shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out"
    onClick={onClick}
  >
    <FiChevronRight size={24} /> {/* Right arrow icon */}
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute -top-8 right-20 lg:block hidden transform -translate-y-1/2 cursor-pointer rounded-full p-2 bg-white shadow-md hover:shadow-lg hover:bg-gray-200 transition-all duration-300 ease-in-out"
    onClick={onClick}
  >
    <FiChevronLeft size={24} /> {/* Left arrow icon */}
  </div>
);
export default function Adventures() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    centerMode: false,
    centerPadding: "0",
    arrows: false, // Disable default arrows
    draggable: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [clickStartX, setClickStartX] = useState<number | null>(null);
  const [clickStartY, setClickStartY] = useState<number | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setClickStartX(e.clientX);
    setClickStartY(e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (clickStartX !== null && clickStartY !== null) {
      const deltaX = Math.abs(e.clientX - clickStartX);
      const deltaY = Math.abs(e.clientY - clickStartY);

      // If the mouse has moved less than a certain threshold, consider it a click
      if (deltaX < 5 && deltaY < 5) {
        router.push(`top-excursions`);
      }
    }
    setClickStartX(null);
    setClickStartY(null);
  };

  return (
    <div className="relative">
      {/* Custom Arrows */}
      <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
      <NextArrow onClick={() => sliderRef.current?.slickNext()} />

      <Slider ref={sliderRef} {...settings} className="flex justify-start">
        {cardData.map((card) => (
          <div key={card.id} className="flex justify-start ">
            <div className="flex flex-col  items-start hover:rounded-lg relative group">
              {/* Card Container */}

              <div
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                ref={cardRef}
                className="flex pr-2 flex-col items-start group relative cursor-pointer"
              >
                <div className="relative hover:shadow-xl bg-white  overflow-hidden transition-all duration-500 rounded-md group-hover:rounded-lg">
                  {/* Image Container */}
                  <div className="relative">
                    <Image
                      className="w-80 h-40 object-cover transition-transform transform group-hover:scale-110 duration-500"
                      src={card.image}
                      alt={card.title}
                    />
                    {/* Overlay Text */}
                    <div className="absolute inset-0 flex flex-col font-segoe justify-center items-center text-center p-4 text-white bg-black bg-opacity-30 hover:bg-opacity-40 hover:transition-all transition-opacity duration-500 opacity-100 group-hover:opacity-100">
                      <h2 className="text-xl font-bold text-white text-shadow-custom">
                        {card.title}
                      </h2>
                      <div className="absolute bottom-4 rounded-lg w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-opacity-75 p-2">
                        <p className="text-sm">{card.hoverText}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
