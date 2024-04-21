"use client";

import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { AdminContext } from "../context/admininfo";
import { FilterUnitedComp } from "./searchSelects";

const AllUserApplicationComp = () => {
  const { filteredAllUserApplication } = useContext(AdminContext);
  return (
    <div className="rounded-sm border border-stroke bg-white">
      <div className="flex items-center justify-between py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black">Анкетын жагсаалт</h4>
        <FilterUnitedComp />
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-6 px-8 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-black">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">И-мэйл</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Нэр</p>
        </div>
        <div className="col-span-2 flex items-center text-center">
          <p className="font-medium">Мэргэжлийн чиглэл</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Цалингийн хүлээлт</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">CV</p>
        </div>
      </div>

      {filteredAllUserApplication?.map((anket: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-6 px-8 dark:border-strokedark sm:grid-cols-8 md:px-6 "
          key={uuidv4()}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row items-center text-black">
              <div className="">{anket?.user?.email}</div>
              <p className="text-sm text-black"></p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black ">
              {anket?.generalInfo?.lastName +
                " " +
                anket?.generalInfo?.firstName}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black ">
              {anket?.jobPosition?.jobField}
            </p>
          </div>

          <div className="col-span-1 flex items-center gap-8 text-black">
            <p className="text-sm text-meta-3">
              {anket?.jobPosition?.salaryExpectation}
            </p>
          </div>
          <div className="col-span-1 flex items-center gap-8 text-black">
            {anket?.user?.cv == "" ? (
              <p>CV Хавсаргаагүй</p>
            ) : (
              <a href={`${anket?.user?.cv}`} className="text-green-600">
                CV Хавсаргасан
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUserApplicationComp;
