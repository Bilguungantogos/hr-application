"use client";

import React, { useContext } from "react";
import { useAuth } from "@/components/context/auth";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserApplicationContext } from "@/components/context/userApplication";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditApplicationComponent = ({ setSwitchToEdit, switchToEdit }: any) => {
  const { loginuser } = useAuth();
  const {
    createUserApplication,
    userApplication,
    loading,
    setFile,
    updateUserApplication,
  } = useContext(UserApplicationContext);

  const formik = useFormik({
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      createUserApplication(values);
    },
    initialValues: {
      firstName: userApplication?.generalInfo?.firstName,
      lastName: userApplication?.generalInfo?.lastName,
      passportId: userApplication?.generalInfo?.passportId,
      birthDate: userApplication?.generalInfo?.birthDate,
      phone: userApplication?.contactInfo?.phone,
      email: userApplication?.contactInfo?.email,
      address: userApplication?.contactInfo?.address,
      jobField: userApplication?.jobPosition?.jobField,
      salaryExpectation: userApplication?.jobPosition?.salaryExpectation,
      employmentType: userApplication?.jobPosition?.employmentType,
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema,
  });

  return (
    <div className="w-full flex flex-col gap-8 bg-slate-300 rounded-[32px] p-10 h-full">
      <h1 className="font-bold text-[24px]">Миний анкет</h1>
      <div className="flex justify-center gap-4">
        <div className="h-full bg-slate-100 rounded-[32px] p-6">
          <h1 className="rounded-[32px] bg-white p-2 text-center font-bold">
            Ерөнхий мэдээлэл
          </h1>
          <div className="">
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Нэр:</p>
                <p className="text-red-500 text-sm">
                  {formik.errors.firstName as any}
                </p>
              </div>
              <Input
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className="w-[400px]"
                placeholder="Dorj"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Овог:</p>
                <p className="text-red-500 text-sm">
                  {formik.errors.lastName as any}
                </p>
              </div>
              <Input
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Bat"
                className="w-[400px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Регистрийн дугаар:</p>
                <p className="text-red-500 text-sm ">
                  {formik.errors.passportId as any}
                </p>
              </div>
              <Input
                id="passportId"
                name="passportId"
                placeholder="UK00990099"
                value={formik.values.passportId}
                onChange={formik.handleChange}
                className="w-[400px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Төрсөн он сар өдөр:</p>
                <p className="text-red-500 text-sm">
                  {formik.errors.birthDate as any}
                </p>
              </div>
              <Input
                id="birthDate"
                name="birthDate"
                placeholder="2024-01-31"
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
          <div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Утас:</p>
                <p className="text-red-500 text-sm">
                  {formik.errors.phone as any}
                </p>
              </div>
              <Input
                id="phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="w-[400px]"
                placeholder="99991111"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">И-мэйл:</p>
                <p className="text-red-500 text-sm">
                  {formik.errors.email as any}
                </p>
              </div>
              <Input
                id="email"
                name="email"
                defaultValue={loginuser?.email}
                className="w-[400px]"
                type="email"
                value={loginuser?.email}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Хаяг:</p>
                <p className="text-red-500 text-sm">
                  {formik.errors.address as any}
                </p>
              </div>
              <Input
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                className="w-[400px]"
                placeholder="Одоо оршин суугаа хаяг"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <div className="h-full bg-slate-200 rounded-[32px] p-6">
          <h1 className="rounded-[32px] bg-white p-2  text-center font-bold">
            Ажиллахаар төлөвлөж буй ажлын байр
          </h1>
          <div className="">
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm">Ажиллахаар төлөвлөж буй чиглэл:</p>
              <Select
                defaultValue={formik.values.jobField}
                onValueChange={(value) => {
                  formik.setFieldValue("jobField", value);
                }}
              >
                <SelectTrigger className="w-[400px]">
                  <SelectValue placeholder="Ажиллахаар төлөвлөж буй чиглэл" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Мэдээллийн технологи/Програм хангамж">
                      Мэдээллийн технологи/Програм хангамж
                    </SelectItem>
                    <SelectItem value="Санхүү/Бүртгэл">
                      Санхүү/Бүртгэл
                    </SelectItem>
                    <SelectItem value="Худалдан авалт">
                      Худалдан авалт
                    </SelectItem>
                    <SelectItem value="Тээвэр ложистик">
                      Тээвэр ложистик
                    </SelectItem>
                    <SelectItem value="Хүний нөөц/захиргаа">
                      Хүний нөөц/захиргаа
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Цалингийн хүлээлт:</p>
              <Input
                id="salaryExpectation"
                name="salaryExpectation"
                value={formik.values.salaryExpectation}
                onChange={formik.handleChange}
                className="w-[400px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Ажиллах төрөл:</p>
              <Input
                id="employmentType"
                name="employmentType"
                value={formik.values.employmentType}
                onChange={formik.handleChange}
                className="w-[400px]"
              />
            </div>
          </div>
        </div>
        <div className="h-full bg-slate-200 rounded-[32px] p-6">
          <h1 className="rounded-[32px] bg-white p-2  text-center font-bold">
            CV, Resume, Cover Letter хавсаргах
          </h1>
          <Input
            id="file"
            type="file"
            name="file"
            className="w-[400px] mt-8"
            onChange={(e: any) => {
              setFile(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          type="submit"
          disabled={loading}
          onClick={() => {
            formik.handleSubmit();
          }}
          className="w-40 "
        >
          Анкет илгээх
        </Button>
        <Button
          type="submit"
          disabled={loading}
          onClick={() => {
            updateUserApplication(formik.values);
          }}
          className="w-40 bg-orange-500"
        >
          Анкет хадгалах
        </Button>
      </div>
    </div>
  );
};

export default EditApplicationComponent;

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
