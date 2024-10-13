import React, { useState } from "react";
import { Calendar, Globe, Heart, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";
import Pagination from "../Pagination"; // Import the Pagination component
// Define the types
interface Tour {
  id: number;
  title: string;
  destination: string;
  duration: number;
  age_range: string;
  run: string;
  min_price: number;
  main_image: {
    url: string;
  } | null;
}

interface ToursData {
  data: Tour[];
}

interface TravelPackagePageProps {
  toursData: ToursData;
}

const TravelPackagePage: React.FC<TravelPackagePageProps> = ({ toursData }) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const toursPerPage = 6;

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const indexOfLastTour = (currentPage + 1) * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = toursData.data.slice(indexOfFirstTour, indexOfLastTour);
  const pageCount = Math.ceil(toursData.data.length / toursPerPage);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1  lg:grid-cols-1 gap-4 mt-3">
        {currentTours.map((pkg) => (
          <Link href={`/top-packages/${pkg.id}`} key={pkg.id}>
            <div className="w-full hover:border-green-500 bg-white rounded-md border-gray-300 border overflow-hidden transition-shadow duration-300 hover:shadow-xl cursor-pointer">
              {/* Card layout for mobile */}
              <div className="flex flex-row md:hidden">
                {/* Image Section */}
                <div className="w-1/3 h-52 sm:h-40 relative">
                  <Image
                    src={pkg?.main_image?.url || "/path/to/default/image.jpg"}
                    alt={pkg.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-md"
                  />
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-segoe rounded-sm shadow-md">
                    20% Off
                  </div>
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 group">
                    <Heart className="w-4 h-4 text-gray-600 group-hover:text-green-500" />
                  </button>
                </div>

                {/* Content Section */}
                <div className="w-2/3 p-3 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold mb-1 text-gray-800 line-clamp-2">
                      {pkg.title}
                    </h2>
                    <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600 truncate">
                          {pkg.destination}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-gray-500" />
                        <span className="text-gray-600">
                          {pkg.duration} Days
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs mb-2">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Age range: </p>
                          <p className="font-segoe text-gray-800">
                            {pkg.age_range}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Run: </p>
                          <p className="font-segoe text-gray-800">{pkg.run}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-black font-semibold text-lg">
                        ${pkg.min_price}
                      </p>
                      <p className="text-xs text-gray-600">Per Person</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button className="bg-black text-white text-xs py-1 px-3 rounded-sm hover:bg-gray-800">
                        View
                      </Button>
                      <Button className="bg-green-300 text-green-900 text-xs py-1 px-3 rounded-sm hover:bg-green-400 flex items-center">
                        <FaWhatsapp className="mr-1" size={12} />
                        Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card layout for desktop */}
              <div className="hidden md:flex md:flex-row">
                {/* Larger Image Section */}
                <div className="w-2/5 h-auto relative">
                  <Image
                    src={pkg?.main_image?.url || "/path/to/default/image.jpg"}
                    alt={pkg.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-l-md"
                  />
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 text-sm font-segoe rounded-sm shadow-md">
                    Special Offer 20%
                  </div>
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 group">
                    <Heart className="w-5 h-5 text-gray-600 group-hover:text-green-500" />
                  </button>
                </div>

                {/* More detailed Content Section */}
                <div className="w-3/5 p-5 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                      {pkg.title}
                    </h2>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Destination: </p>
                          <p className="font-segoe text-gray-800">
                            {pkg.destination}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Duration: </p>
                          <p className="font-segoe text-gray-800">
                            {pkg.duration} Days
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Age range: </p>
                          <p className="font-segoe text-gray-800">
                            {pkg.age_range}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-600">Run: </p>
                          <p className="font-segoe text-gray-800">{pkg.run}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-black font-bold text-3xl">
                        ${pkg.min_price}
                      </p>
                      <p className="text-sm text-gray-600">Per Person</p>
                    </div>
                    <div className="flex space-x-3">
                      <Button className="bg-black text-white text-sm py-2 px-5 rounded-sm hover:bg-gray-800">
                        View Tour
                      </Button>
                      <Button className="bg-green-300 text-green-900 text-sm py-2 px-5 rounded-sm hover:bg-green-400 flex items-center">
                        <FaWhatsapp className="mr-2" size={16} />
                        Chat Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
    </div>
  );
};

export default TravelPackagePage;
