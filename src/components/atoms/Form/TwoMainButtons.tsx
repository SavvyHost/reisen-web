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
      setIsMobile(window.innerWidth <= 768); // Adjust based on your mobile breakpoint
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize(); // Initial check

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
          <Link href="/inquire" passHref>
            <button className="w-48 bg-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all hover:bg-green-600 flex items-center justify-center space-x-2">
              <span>Explore Tours</span>
              <BsArrowRight className="text-lg" />
            </button>
          </Link>

          <Link href="/top-packages" passHref>
            <button className="w-48 border border-white text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all hover:bg-white hover:text-black flex items-center justify-center space-x-2">
              <span className="text-nowrap">Book Excursions</span>
              <div>
                <BsArrowRight className="text-lg" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroOverlay;
