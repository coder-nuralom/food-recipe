import React from "react";
import designer from "../assets/nuralom.png";

const Footer = () => {
  return (
    <footer className="py-5 bg-gray-950/90 backdrop-blur-md shadow-2xl shadow-black/50 border-t border-blue-900/50">
      <div className="container mx-auto px-4">
        <div className="flex max-[575px]:flex-col max-[575px]:space-y-1  items-center justify-between">
          <div>
            <span>© 2024 Edusity. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Designed By Nuralom Rana</span>
            <div className="img_wrapper overflow-hidden w-10 h-10 rounded-full">
              <img
                src={designer}
                alt="Desinger Nuralom"
                className="w-full h-full rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
