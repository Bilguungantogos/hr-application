"use client";

import AllUserApplicationComp from "@/components/adminItems/allApplications";
import { useAuth } from "@/components/context/auth";
import { UserApplicationContext } from "@/components/context/userApplication";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";

type Props = {};

export const UserApplicationPage = (props: Props) => {
  const { loginuser, logout } = useAuth();
  const { setUserApplication } = useContext(UserApplicationContext);
  return (
    <>
      <div className="w-full py-4 flex justify-around items-center border-b-2 border-b-slate-200 h-[86px]">
        <div className="w-40">
          <img src="../logo.png" sizes="full" />
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
      <div className="flex flex-col h-full w-full text-black mt-10">
        <div className="w-full h-20">
          <div className="flex justify-start items-center mb-6 px-40 gap-10">
            <h1 className="text-lg font-bold ">Админ хэсэг</h1>
            <Button
              onClick={() => {
                logout();
                setUserApplication({});
              }}
            >
              Бүртгэлээс гарах
            </Button>
          </div>
          <div className="flex justify-center gap-40">
            <a
              href="./userapplication"
              className="font-bold text-lg text-green-600"
            >
              Анкет
            </a>
            <a href="./" className="font-bold text-lg">
              Хэрэглэгч
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6 my-10">
          <div className="px-40">
            <AllUserApplicationComp />
          </div>
        </div>
      </div>
    </>
  );
};
