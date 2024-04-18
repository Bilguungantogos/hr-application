import React from "react";

const Header = () => {
  return (
    <div className="w-full py-4 px-10 flex justify-between items-center">
      <div className="w-40">
        <img src="./logo.png" sizes="full" />
      </div>
      <a href="/">Нүүр</a>
      <a href="/profile">Миний анкет</a>
    </div>
  );
};

export default Header;
