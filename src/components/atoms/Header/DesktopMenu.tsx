import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const DesktopMenu = ({ navLinks }) => {
  const router = useRouter();

  return (
    <nav className="hidden lg:block">
      <ul className="flex space-x-6">
        {navLinks.map(({ href, label }) => (
          <li
            key={href}
            className={`relative transition-transform duration-500 ${
              router.pathname === href ? "transform -translate-y-1" : ""
            }`}
          >
            <Link
              href={href}
              className={`font-semibold text-sm ${
                router.pathname === href
                  ? "text-green-500 before:content-['•'] after:content-['•'] before:absolute after:absolute before:-left-4 after:-right-4 before:text-green-500 after:text-green-500"
                  : "text-green-700 hover:text-green-400"
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopMenu;
