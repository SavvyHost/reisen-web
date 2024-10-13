import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sampleAttractions } from "@/data";
import Link from "next/link";

type Attraction = {
  id: number;
  name: string;
  imageSrc: StaticImageData;
  toursCount: number;
};

const AttractionCard: React.FC<Attraction> = ({
  name,
  imageSrc,
  toursCount,
}) => {
  return (
    <Link href="/attractions">
      <div className="flex shadow-sm hover:shadow-xl mb-3 items-center cursor-pointer rounded-lg overflow-hidden w-full max-w-xs  h-20 sm:h-24 transition-transform duration-300 ease-in-out hover:border border-gray-200 hover:bg-white">
        <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex-shrink-0 overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
        <div className="flex-grow p-2 sm:p-4 flex flex-col justify-center">
          <h2 className="text-xs sm:text-sm font-semibold text-gray-800 truncate font-segoe">
            {name}
          </h2>
          <p className="text-sm text-gray-600 truncate font-segoe">
            {toursCount} Tours and Activities
          </p>
        </div>
      </div>
    </Link>
  );
};

const Attractions: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    rows: 2,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container w-full overflow-hidden p-0">
      {isMobile ? (
        <Slider {...sliderSettings}>
          {sampleAttractions.map((attraction) => (
            <div className="px-2" key={attraction.id}>
              <AttractionCard {...attraction} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sampleAttractions.map((attraction) => (
            <div key={attraction.id}>
              <AttractionCard {...attraction} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Attractions;
