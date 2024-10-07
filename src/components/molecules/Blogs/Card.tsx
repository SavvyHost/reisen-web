import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import DefaultImage from "../../../../public/assets/pyr.jpeg";

interface CardProps {
  imageSrc: string | StaticImageData;
  title: string;
  content: string;
  created_at: string;
  id: string;
}

const Card: React.FC<CardProps> = ({
  imageSrc,
  title,
  content,
  created_at,
  id,
}) => {
  // Fallback to default image if imageSrc is undefined, null, or an empty string
  const imageToUse = imageSrc && imageSrc !== "" ? imageSrc : DefaultImage;

  return (
    <div className="flex-shrink-0 mb-6 max-w-md mx-2 rounded-3xl overflow-hidden shadow-lg bg-[#FAFAFA] h-80">
      <Link href={`/blogs/${id}`}>
        <div className="flex flex-col h-full">
          {/* Image Section - 1/2 of the card height */}
          <div className="relative h-1/2">
            <Image
              src={imageToUse}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section - 1/2 of the card height */}
          <div className="flex flex-col justify-between h-1/2 p-4 bg-white">
            <div>
              <h2 className="text-base md:text-xl font-segoe ">{title}</h2>
            </div>

            {/* Content limited to 1.5 lines */}
            <p
              className="text-gray-700 font-light line-clamp-3 overflow-hidden"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Created Date */}
            <p className="text-xs text-gray-500">
              {new Date(created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
