import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";

type DetailBlogsType = {
  content: string;
};

type BlogDataProps = {
  DetailBlogs: DetailBlogsType;
};

const BlogData: React.FC<BlogDataProps> = ({ DetailBlogs }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize((prevSize) => prevSize + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize((prevSize) => prevSize - 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Sidebar for mobile (top) and desktop (left) */}
      <div className="md:hidden mb-4 flex justify-center">
        <SidebarContent
          increaseFontSize={increaseFontSize}
          decreaseFontSize={decreaseFontSize}
        />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar for desktop */}
        <div className="hidden md:block w-16 mr-4">
          <SidebarContent
            increaseFontSize={increaseFontSize}
            decreaseFontSize={decreaseFontSize}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="">
            <p
              className="text-gray-700"
              style={{ fontSize: `${fontSize}px` }}
              dangerouslySetInnerHTML={{ __html: DetailBlogs?.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Separate component for sidebar content
const SidebarContent: React.FC<{
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}> = ({ increaseFontSize, decreaseFontSize }) => (
  <div className="flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-6">
    {/* Zoom controls */}
    <div className="flex md:flex-col items-center space-x-2 md:space-x-0 md:space-y-2 bg-gray-100 p-2 rounded-lg">
      <button
        onClick={increaseFontSize}
        className="p-2 hover:bg-gray-200 rounded-full"
      >
        <ZoomIn size={20} />
      </button>
      <span className="text-sm font-bold">Aa</span>
      <button
        onClick={decreaseFontSize}
        className="p-2 hover:bg-gray-200 rounded-full"
      >
        <ZoomOut size={20} />
      </button>
    </div>

    {/* Social sharing */}
    <div className="flex md:flex-col items-center space-x-4 md:space-x-0 md:space-y-4">
      <Share2 size={20} className="text-gray-500" />
      <Facebook size={20} className="text-blue-600 cursor-pointer" />
      <Twitter size={20} className="text-blue-400 cursor-pointer" />
      <Linkedin size={20} className="text-blue-700 cursor-pointer" />
      <Instagram size={20} className="text-pink-600 cursor-pointer" />
      <Mail size={20} className="text-gray-600 cursor-pointer" />
    </div>
  </div>
);

export default BlogData;
