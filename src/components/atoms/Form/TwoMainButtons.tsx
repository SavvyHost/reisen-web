import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

type Props = {};

const HeroOverlay: React.FC<Props> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 620) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="absolute inset-0 flex flex-col justify-center items-center mt-20 p-4">
        <h1 className="text-2xl max-w-4xl sm:text-3xl capitalize text-white font-bold lg:text-6xl font-segoe text-center mb-4 lg:mb-6">
          Egypt Rasain Tours With The Best Locals Ever!
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl capitalize text-white font-bold font-segoe lg:text-2xl text-center mb-8 lg:mb-10">
          Confused? Want to Egypt Raisen your dream package? Enquire here in 1
          min
        </p>

        {/* Buttons Section */}
        <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
          {/* Explore Tours Button */}
          <Link href="/top-packages" passHref>
            <button className="w-36 bg-green-500 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-green-600 hover:w-44 flex items-center justify-center group">
              <span className="mr-2 transition-all text-nowrap duration-300 group-hover:mr-4">
                Explore Tours
              </span>
              <BsArrowRight className="transition-all duration-300 opacity-0 group-hover:opacity-100" />
            </button>
          </Link>

          {/* Book Excursions Button */}
          <Link href="/top-excursions" passHref>
            <button className="w-44 border border-white text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:w-48 flex items-center justify-center group">
              <span className="mr-2 transition-all text-nowrap duration-300 group-hover:mr-4">
                Book Excursions
              </span>
              <BsArrowRight className="transition-all duration-300 opacity-0 group-hover:opacity-100" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroOverlay;
