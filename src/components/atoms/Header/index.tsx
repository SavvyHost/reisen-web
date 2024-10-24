import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Menu,
  Heart,
  User,
} from "lucide-react";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export const Header = ({ header, className }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px is typically the breakpoint for lg in Tailwind
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    if (!isDesktop) return; // Only apply scroll behavior on desktop

    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, isDesktop]);

  const handleLanguageChange = () => {
    alert("Language change button clicked!");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/top-packages", label: "Tour Packages" },
    { href: "/top-excursions", label: "Short Excursions" },
    { href: "/nile-cruises", label: "Nile Cruises" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 px-4 sm:px-16 bg-white shadow-md transition-transform duration-300 ${
          isDesktop && !visible ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container mx-auto px-4 lg:py-4 py-5  flex items-center justify-between">
          {/* Logo - Left side */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold text-green-500">
                Egypt Rasain Tours
              </span>
            </Link>
          </div>

          {/* Center - Desktop Menu */}
          <div className="hidden lg:flex justify-center flex-grow">
            <DesktopMenu navLinks={navLinks} />
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <button
              className="hidden lg:block focus:outline-none"
              onClick={handleLanguageChange}
              title="Change Language"
            >
              <Globe className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-gray-600">EN</span>
            <button className="text-gray-600 hover:text-gray-900">
              <Heart className="w-5 h-5" />
            </button>
            <Link
              href="/inquire"
              className=" lg:block hidden text-black border border-gray-400 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200"
            >
              Tailored Made
            </Link>
            <button
              className="lg:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
};
