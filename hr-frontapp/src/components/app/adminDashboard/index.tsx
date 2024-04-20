"use client";
import AllUserItem from "@/components/adminItems/allUser";
import { AdminContext } from "@/components/context/admininfo";
import Header from "@/components/header";
import React, { useContext } from "react";

type Props = {};

export const AdminDashboard = (props: Props) => {
  const { allUserApplication, allUserInfo } = useContext(AdminContext);
  return (
    <>
      <Header />
      <div className="flex flex-col h-full w-full text-white">
        <div className="w-full h-20">
          <h1 className="text-lg font-bold px-40">Админ хэсэг</h1>
          <div className="flex justify-center gap-40">
            <h1 className="font-bold text-lg">Анкет</h1>
            <h1 className="font-bold text-lg">Хэрэглэгч</h1>
          </div>
        </div>
        <div className="flex flex-col gap-6 mb-10">
          <div className="px-40">
            <AllUserItem />
          </div>
        </div>
      </div>
    </>
  );
};
