"use client";
import React, { useState } from "react";
import { useAuth } from "@/components/context/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CgLogIn } from "react-icons/cg";
import Login from "@/components/login";
import SignUp from "@/components/signup";

type Props = {};

export const ClientDashboard = (props: Props) => {
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
          <p>Та анкетаа илгээхийн тулд эхлээд нэвтрэх шаардлатай</p>
        </div>
      </div>
      <div className="bg-slate-900 flex-1 flex justify-center items-center">
        {loginSignUpSwitch ? <Login /> : <SignUp />}
      </div>
    </div>
  );
};

const validationSchema = yup.object({
  email: yup
    .string()
    .max(100, "Имэйл хаяг тэмдэгт ихдээ")
    .required("Имэйл хаягыг заавал бөглөнө үү")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Хүчинтэй имэйл хаяг байх ёстой"
    ),
  password: yup
    .string()
    .required("Нууц үгээ заавал бөглөнө үү.")
    .min(6, "Хамгийн багадаа 6 тэмдэгт байх ёстой."),
});
