"use client";

import { useAuth } from "@/components/context/auth";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import * as Yup from "yup";

import { useFormik } from "formik";
import { UserApplicationContext } from "@/components/context/userApplication";
import EditApplicationComponent from "@/components/applicationComp/editapp";
import ShowApplication from "@/components/applicationComp/showapp";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { loginuser, token, logout } = useAuth();
  const [switchToEdit, setSwitchToEdit] = useState(true);
  const { setUserApplication } = useContext(UserApplicationContext);
  const router = useRouter();
  return (
    <>
      <Header />
      <div className="flex justify-center max-w-[1200px] h-full mx-auto gap-4 my-10">
        <div className="flex flex-col items-center justify-center bg-slate-300 rounded-[32px] gap-4 w-[210px] h-[300px] px-8 ">
          {loginuser?.avatar ? (
            <img src={loginuser.avatar} />
          ) : (
            <div className="w-20">
              <CgProfile size="80px" />
            </div>
          )}
          <p>{loginuser?.name ? loginuser.name : "Хэрэглэгч"}</p>
          <p>{loginuser?.email}</p>
          {loginuser ? (
            <Button
              onClick={() => {
                logout();
                setUserApplication({});
              }}
            >
              Бүртгэлээс гарах
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/login");
              }}
            >
              Нэвтрэх
            </Button>
          )}
        </div>
        {switchToEdit == false ? (
          <EditApplicationComponent
            setSwitchToEdit={setSwitchToEdit}
            switchToEdit={switchToEdit}
          />
        ) : (
          <ShowApplication
            setSwitchToEdit={setSwitchToEdit}
            switchToEdit={switchToEdit}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
