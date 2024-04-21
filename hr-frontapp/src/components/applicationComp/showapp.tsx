"use client";

import React, { useContext, useState } from "react";
import { Input } from "../ui/input";
import { UserApplicationContext } from "../context/userApplication";
import { Button } from "../ui/button";
import { useAuth } from "../context/auth";

const ShowApplication = ({ setSwitchToEdit, switchToEdit }: any) => {
  const { userApplication, createUserApplication, loading } = useContext(
    UserApplicationContext
  );
  const { loginuser } = useAuth();
  const [applicationForm, setApplicationForm] = useState({
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
                <p className="text-red-500 text-sm"></p>
              </div>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.generalInfo?.firstName}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Овог:</p>
                <p className="text-red-500 text-sm"></p>
              </div>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.generalInfo?.lastName}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Регистрийн дугаар:</p>
                <p className="text-red-500 text-sm "></p>
              </div>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.generalInfo?.passportId}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Төрсөн он сар өдөр:</p>
                <p className="text-red-500 text-sm"></p>
              </div>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.generalInfo?.birthDate}
              </div>
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
                <p className="text-red-500 text-sm"></p>
              </div>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.contactInfo?.phone}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">И-мэйл:</p>
                <p className="text-red-500 text-sm"></p>
              </div>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.contactInfo?.email}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
                <p className="text-sm">Хаяг:</p>
                <p className="text-red-500 text-sm"></p>
              </div>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.contactInfo?.address}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <div className="w-full bg-slate-200 rounded-[32px] p-6">
          <h1 className="rounded-[32px] bg-white p-2  text-center font-bold">
            Ажиллахаар төлөвлөж буй ажлын байр
          </h1>
          <div className="">
            <div className="flex flex-col gap-2 mt-4">
              <p className="text-sm">Ажиллахаар төлөвлөж буй чиглэл:</p>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.jobPosition?.jobField}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Цалингийн хүлээлт:</p>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.jobPosition?.salaryExpectation}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Ажиллах төрөл:</p>
              <div className="w-[400px] bg-white px-3 py-2 rounded-md h-[40px]">
                {userApplication?.jobPosition?.employmentType}
              </div>
            </div>
          </div>
        </div>
        <div className="h-full bg-slate-200 rounded-[32px] p-6">
          <h1 className="rounded-[32px] bg-white p-2  text-center font-bold">
            CV, Resume, Cover Letter хавсаргах
          </h1>
          <div className="w-[400px] bg-white px-3 py-2 rounded-md mt-8 h-[40px]">
            {userApplication?.user?.cv == "" ? (
              <div>CV Хавсаргаагүй байна.</div>
            ) : (
              <a
                href={`${userApplication?.user?.cv}`}
                className="text-green-600"
              >
                CV Хавсаргасан байна.
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Button
          disabled={loading}
          onClick={() => {
            createUserApplication(applicationForm);
          }}
          className="w-40 "
        >
          Анкет илгээх
        </Button>
        <Button
          onClick={() => {
            setSwitchToEdit(!switchToEdit);
          }}
          className="w-40 bg-orange-500"
        >
          Анкет засах
        </Button>
      </div>
    </div>
  );
};

export default ShowApplication;
