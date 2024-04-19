"use client";

import { useAuth } from "@/components/context/auth";
import { UserApplicationContext } from "@/components/context/userApplication";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cloudinary } from "@/components/utils/cloudinaryNext/upload";
import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import myAxios from "@/components/utils/axios";

const Profile = () => {
  const { loginuser, token, logout } = useAuth();
  const [file, setFile] = useState<any>();

  const showPdf = () => {
    window.open(`http://localhost:8080/files/${loginuser.cv}`);
  };
  return (
    <>
      <Header />
      <div className="flex justify-center max-w-[1200px] h-full mx-auto gap-4">
        <div className="flex flex-col items-center py-20 w-[300px] bg-slate-300 rounded-[32px] gap-4 h-full">
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
        <div className="w-full flex flex-col gap-8 bg-slate-400 rounded-[32px] p-10 h-screen">
          <h1 className="font-bold text-[24px]">Миний анкет</h1>
          <div className="h-full bg-orange-300 rounded-[32px] p-4">
            <h1>Ерөнхий мэдээлэл</h1>
            <div className="">
              <p>firstName:</p>
              <p>lastName:</p>
              <p>passportId:</p>
              <p>birthDate:</p>
            </div>
          </div>
          <div className="h-full bg-orange-400 rounded-[32px] p-4">
            <h1>Холбоо барих мэдээлэл</h1>
            <div className="">
              <p>phone:</p>
              <p>email:</p>
              <p>address:</p>
            </div>
          </div>
          <div className="h-full bg-orange-500 rounded-[32px] p-4">
            <h1>Ажиллахаар төлөвлөж буй ажлын байр</h1>
            <div className="">
              <p>jobField:</p>
              <p>salaryExpectation:</p>
              <p>employmentType:</p>
            </div>
          </div>
          <div className="h-full bg-orange-600 rounded-[32px] p-4">
            <h1>CV, Resume, Cover Letter хавсаргах</h1>
            {/* <Cloudinary setFunction={setCV} /> */}
            {loginuser?.cv ? (
              <Button onClick={showPdf}>File attached</Button>
            ) : (
              <form>
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={(e) => {
                    setFile(e.target.files?.[0]);
                    console.log(e.target.files?.[0]);
                  }}
                />
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("file", file);
                    console.log(file);
                    try {
                      const result = await myAxios.post(
                        "/upload-files",
                        formData,
                        {
                          headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: "Bearer " + token,
                          },
                        }
                      );
                      console.log(result, "asdlkjasdlkja");
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Submit
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
