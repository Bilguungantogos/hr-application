import React from "react";
import { useAuth } from "@/components/context/auth";
import { useFormik } from "formik";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CgLogIn } from "react-icons/cg";

const SignUp = () => {
  const { signup, SetLoginSignUpSwitch, loginSignUpSwitch } = useAuth();

  const formik = useFormik({
    onSubmit: ({ email, password }) => {
      signup(email, password);
    },
    initialValues: { email: "", password: "", rePassword: "" },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema,
  });

  return (
    <div className="w-[300px]">
      <div className="flex items-center justify-center gap-8 mb-4">
        <CgLogIn size={80} className="text-white border p-2 rounded-[20px]" />
        <h1 className="text-white text-lg">Бүртгүүлэх</h1>
      </div>
      <div className="grid gap-4 py-4">
        <Input
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Е-майл хаяг"
          className="bg-slate-400 border-none"
        />
        <h1 className="text-white"> {formik.errors.email}</h1>
        <Input
          id="current_password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className="bg-slate-400 border-none"
          placeholder="Нууц үг"
        />
        <h1 className="text-white"> {formik.errors.password}</h1>
        <Input
          id="current_rePassword"
          name="rePassword"
          type="password"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          className="bg-slate-400 border-none"
          placeholder="Нууц үг"
        />
        <h1 className="text-white"> {formik.errors.rePassword}</h1>
        <a href="/forgotpassword" className="text-white text-end text-[13px]">
          Нууц үг мартсан
        </a>
      </div>
      <Button
        onClick={() => {
          formik.handleSubmit();
        }}
        className="w-full py-4 bg-[#1f4682]"
      >
        Бүртгүүлэх
      </Button>
      <button
        className="text-white mt-4"
        onClick={() => {
          SetLoginSignUpSwitch(!loginSignUpSwitch);
        }}
      >
        Нэвтрэх
      </button>
    </div>
  );
};

export default SignUp;

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
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "нууц үг хоорондоо таарахгүй байна.")
    .required("Нууц үгээ заавал бөглөнө үү.")
    .min(6, "Хамгийн багадаа 6 тэмдэгт байх ёстой."),
});
