import React from "react";
import Blog from "../molecules/Blogs/Blog";

type BlogData = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image: string;
};

type Props = {
  blogData: { data: BlogData[] }; // Adjusted structure to match data coming from server
};

const BlogSection: React.FC<Props> = ({ blogData }) => {
  return (
    <div className="">
      <Blog blogData={blogData.data} />{" "}
    </div>
  );
};

export default BlogSection;
