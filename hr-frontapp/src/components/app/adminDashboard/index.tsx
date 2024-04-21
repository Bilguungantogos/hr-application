"use client";
import AllUserApplicationComp from "@/components/adminItems/allApplications";
import AllUserItem from "@/components/adminItems/allUser";
import { AdminContext } from "@/components/context/admininfo";
import { useAuth } from "@/components/context/auth";
import { UserApplicationContext } from "@/components/context/userApplication";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";

type Props = {};

export const AdminDashboard = (props: Props) => {
  const { allUserApplication, allUserInfo } = useContext(AdminContext);
  const { setUserApplication } = useContext(UserApplicationContext);
  const { logout } = useAuth();
  return (
    <>
      <Header />
      <div className="flex flex-col h-screen w-full text-black mt-10">
        <div className=" w-full h-20">
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
              href="./admindashboard/userapplication"
              className="font-bold text-lg "
            >
              Анкет
            </a>
            <a
              href="./admindashboard"
              className="font-bold text-lg text-green-600"
            >
              Хэрэглэгч
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6 my-10">
          <div className="px-40">
            <AllUserItem />
          </div>
        </div>
      </div>
    </>
  );
};
