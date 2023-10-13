import React from "react";

const Header = () => {
  return (
    <div className="text-center py-4 px-2 flex justify-between items-center bg-purple-950">
      <h1 className="title text-2xl font-bold text-white">
        HackOn with Amazon - Season 3
      </h1>
      <div className="flex gap-4 text-white font-bold">
        <a
          href="https://github.com/Debraj550"
          className="transition-all hover:scale-95 "
          target="_blank"
          rel="noreferrer"
        >
          Debraj Dhar
        </a>
        <a
          href="https://github.com/srjsunny"
          className="transition-all hover:scale-95"
          target="_blank"
          rel="noreferrer"
        >
          Suraj P
        </a>
        <a
          href="https://github.com/SRIJON2000"
          className="transition-all hover:scale-95"
          target="_blank"
          rel="noreferrer"
        >
          Srijon Mallick
        </a>
        <a
          href="https://github.com/ras5014"
          className="transition-all hover:scale-95"
          target="_blank"
          rel="noreferrer"
        >
          Ramananda Samantaray
        </a>
      </div>
    </div>
  );
};

export default Header;
