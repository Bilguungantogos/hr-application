"use client";

import React from "react";
import { useAuth } from "../context/auth";

const Header = () => {
  const { loginuser } = useAuth();
  return (
    <div className="w-full py-4 flex justify-around items-center border-b-2 border-b-slate-200 h-[86px]">
      <div className="w-40">
        <img src="./logo.png" sizes="full" />
      </div>
      <a className="font-bold" href="/">
        Нүүр
      </a>
      <div className="flex gap-10">
        <a className="font-bold" href="/profile">
          Миний анкет
        </a>
        {loginuser?.role == "Admin" ? (
          <a className="font-bold" href="/admindashboard">
            Админ дашбоард
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
