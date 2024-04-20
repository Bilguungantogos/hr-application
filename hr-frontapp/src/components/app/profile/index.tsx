"use client";

import { useAuth } from "@/components/context/auth";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import * as Yup from "yup";

import { useFormik } from "formik";

const Profile = () => {
  const { loginuser, token, logout } = useAuth();

  const formik = useFormik({
    onSubmit: (values) => {
      console.log("Submitted values:", values);
    },
    initialValues: {
      firstName: "",
      lastName: "",
      passportId: "",
      birthDate: "",
      phone: "",
      email: "",
      address: "",
      jobField: "",
      salaryExpectation: "",
      employmentType: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema,
  });
  const [applicationForm, setApplicationForm] = useState({
    firstName: "",
    lastName: "",
    passportId: "",
    birthDate: "",
    phone: "",
    email: "",
    address: "",
    jobField: "",
    salaryExpectation: "",
    employmentType: "",
  });
  return (
    <>
      <Header />
      <div className="flex justify-center max-w-[1200px] h-full mx-auto gap-4">
        <div className="flex flex-col items-center justify-center bg-slate-300 rounded-[32px] gap-4 h-[300px] px-12">
          {loginuser?.avatar ? (
            <img src={loginuser.avatar} />
          ) : (
            <div className="w-20">
              <CgProfile size="80px" />
            </div>
          )}
          <p>{loginuser?.name ? loginuser.name : "Нэр"}</p>
          <p>{loginuser?.email}</p>
          <Button
            onClick={() => {
              logout();
            }}
          >
            logout
          </Button>
        </div>
        <div className="w-full flex flex-col gap-8 bg-slate-300 rounded-[32px] p-10 h-full">
          <h1 className="font-bold text-[24px]">Миний анкет</h1>
          <div className="flex justify-center gap-4">
            <div className="h-full bg-slate-100 rounded-[32px] p-6">
              <h1 className="rounded-[32px] bg-white p-2 text-center font-bold">
                Ерөнхий мэдээлэл
              </h1>
              <div className="">
                <div className="">
                  <div className="flex gap-4">
                    <p className="text-sm">Нэр:</p>
                    <p className="text-red-500">{formik.errors.firstName}</p>
                  </div>
                  <Input
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <p className="text-sm">Овог:</p>
                    <p className="text-red-500">{formik.errors.lastName}</p>
                  </div>
                  <Input
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <p className="text-sm">Регистрийн дугаар:</p>
                    <p className="text-red-500">{formik.errors.passportId}</p>
                  </div>
                  <Input
                    name="passportId"
                    value={formik.values.passportId}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <p className="text-sm">Төрсөн он сар өдөр:</p>
                    <p className="text-red-500">{formik.errors.birthDate}</p>
                  </div>
                  <Input
                    name="birthDate"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
              </div>
            </div>
            <div className="h-full bg-slate-100 rounded-[32px] p-6">
              <h1 className="rounded-[32px] bg-white p-2  text-center font-bold">
                Холбоо барих мэдээлэл
              </h1>
              <div className="">
                <div>
                  <div className="flex gap-4">
                    <p>Утас:</p>
                    <p className="text-red-500">{formik.errors.phone}</p>
                  </div>
                  <Input
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <p>И-мэйл:</p>
                    <p className="text-red-500">{formik.errors.email}</p>
                  </div>
                  <Input
                    name="email"
                    defaultValue={loginuser?.email}
                    className="w-[400px]"
                    type="email"
                    value={loginuser?.email}
                  />
                </div>
                <div>
                  <div className="flex gap-4">
                    <p>Хаяг:</p>
                    <p className="text-red-500">{formik.errors.address}</p>
                  </div>
                  <Input
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="h-full bg-slate-200 rounded-[32px] p-6">
              <h1>Ажиллахаар төлөвлөж буй ажлын байр</h1>
              <div className="">
                <div>
                  <p>Ажиллахаар төлөвлөж буй чиглэл:</p>
                  <Input
                    name="jobField"
                    value={formik.values.jobField}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
                <div>
                  <p>Цалингийн хүлээлт:</p>
                  <Input
                    name="salaryExpectation"
                    value={formik.values.salaryExpectation}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
                <div>
                  <p>Ажиллах төрөл:</p>
                  <Input
                    name="employmentType"
                    value={formik.values.employmentType}
                    onChange={formik.handleChange}
                    className="w-[400px]"
                  />
                </div>
              </div>
            </div>
            <div className="h-full bg-slate-200 rounded-[32px] p-6">
              <h1>CV, Resume, Cover Letter хавсаргах</h1>
              <Input type="file" className="w-[400px]" />
            </div>
          </div>
          <Button
            onClick={() => {
              formik.handleSubmit();
            }}
            className="w-40 mx-auto"
          >
            Анкет илгээх
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;

const validationSchema = Yup.object({
  firstName: Yup.string().required("Заавал бөглөсөн байх шаардлагатай"),
  lastName: Yup.string().required("Заавал бөглөсөн байх шаардлагатай"),
  passportId: Yup.string().required("Заавал бөглөсөн байх шаардлагатай"),
  birthDate: Yup.date().required("Заавал бөглөсөн байх шаардлагатай"),
  phone: Yup.string().required("Заавал бөглөсөн байх шаардлагатай"),
  address: Yup.string().required("Заавал бөглөсөн байх шаардлагатай"),
  jobField: Yup.string().required("Заавал бөглөсөн байх шаардлагатай"),
  salaryExpectation: Yup.number()
    .required("Заавал бөглөсөн байх шаардлагатай")
    .min(0, "Эерэг тоо байх ёстой"),
  employmentType: Yup.string().required("Заавал бөглөсөн байх шаардлагатай"),
});
