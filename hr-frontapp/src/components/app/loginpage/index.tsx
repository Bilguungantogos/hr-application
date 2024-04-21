"use client";

import React from "react";
import { useAuth } from "@/components/context/auth";

import Login from "@/components/login";
import SignUp from "@/components/signup";

const LoginPage = () => {
  const { loginSignUpSwitch } = useAuth();

  return (
    <div className="flex h-screen w-full">
      <div
        style={{ backgroundImage: "url('./wallpaper.jpg')" }}
        className="bg-cover bg-no-repeat bg-fixed bg-opacity-10 flex-1 flex justify-center items-center"
      >
        <div className="flex flex-col items-center justify-center p-10 text-white bg-slate-800 bg-opacity-60  h-60 rounded-[32px] gap-4">
          <h1 className="text-slate-100 text-xl">
            Хүний нөөцийн анкет хүлээн авах веб-д тавтай морилно уу?
          </h1>
          <p>Та анкетаа илгээхийн тулд эхлээд нэвтрэх шаардлагатай</p>
        </div>
      </div>
      <div className="bg-slate-900 flex-1 flex justify-center items-center">
        {loginSignUpSwitch ? <Login /> : <SignUp />}
      </div>
    </div>
  );
};

export default LoginPage;
