"use client";

import React, { useContext } from "react";
import { AdminContext } from "../context/admininfo";
import { v4 as uuidv4 } from "uuid";

const AllUserItem = () => {
  const { allUserInfo } = useContext(AdminContext);

  return (
    <div className="rounded-sm border border-stroke bg-white">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black">
          Хэрэглэгчдийн жагсаалт
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke py-6 px-8 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 text-black">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">И-мэйл</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Эрх</p>
        </div>
        <div className="col-span-2 flex items-center text-center">
          <p className="font-medium">Баталгаажсан</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Бүртгүүлсэн цаг</p>
        </div>
      </div>

      {allUserInfo?.map((user) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-6 px-8 dark:border-strokedark sm:grid-cols-8 md:px-6 "
          key={uuidv4()}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row items-center text-black">
              <div className="">{user.email}</div>
              <p className="text-sm text-black"></p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black ">{user.role ? user.role : ""}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black ">
              {user.isVerified == false ? "Баталгаажаагүй" : "Баталгаажсан"}
            </p>
          </div>

          <div className="col-span-2 flex items-center gap-8 text-black">
            <p className="text-sm text-meta-3">
              {formatTimestamp(user.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUserItem;

const formatTimestamp = (timestamp: any) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and pad with zero if necessary
  const day = ("0" + date.getDate()).slice(-2); // Pad with zero if necessary
  const hour = ("0" + date.getHours()).slice(-2); // Pad with zero if necessary
  const minute = ("0" + date.getMinutes()).slice(-2); // Pad with zero if necessary

  return `${year}-${month}-${day} ${hour}:${minute}`;
};
