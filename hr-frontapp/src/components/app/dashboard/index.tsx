"use client";
import React from "react";
import { useAuth } from "@/components/context/auth";
import { useFormik } from "formik";
import * as yup from "yup";
type Props = {};

export const Dashboard = (props: Props) => {
  const { loginuser, login } = useAuth();

  const formik = useFormik({
    onSubmit: ({ email, password }) => {
      login(email, password);
    },
    initialValues: { email: "", password: "" },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema,
  });
  return (
    <div className="h-screen w-full">
      <div className="max-w-[400px] mx-auto pt-40">
        <div className="grid gap-4 py-4">
          <a href="">d123456</a>
          <input
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Е-майл хаяг"
            className="bg-slate-400 border-none"
          />
          <h1 className="text-white"> {formik.errors.email}</h1>
          <input
            id="current_password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="bg-slate-400 border-none"
            placeholder="Нууц үг"
          />
          <h1 className="text-white"> {formik.errors.password}</h1>
          <a href="/forgotpassword" className="text-white text-end text-[13px]">
            Нууц үг мартсан
          </a>
        </div>
        <button
          onClick={() => {
            formik.handleSubmit();
          }}
          className="w-full py-4 bg-[#1f4682]"
        >
          Нэвтрэх
        </button>
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
