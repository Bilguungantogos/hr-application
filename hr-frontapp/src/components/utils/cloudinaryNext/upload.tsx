"use client";

import React, { FC, useState } from "react";
import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  setFunction: (e: any) => void;
};

export const Cloudinary = ({ setFunction }: Props) => {
  const handleSuccess = (result: any) => {
    console.log("handle success", result.info.url);
    setFunction(result.info.url);
    setUrl(result.info.url);
  };
  const [url, setUrl] = useState<any>(null);

  return (
    <div className="z-[100000000001]">
      <CldUploadWidget uploadPreset="adminCinema" onSuccess={handleSuccess}>
        {({ open }) => {
          function handleOnClick() {
            open();
          }
          return (
            <button
              onClick={handleOnClick}
              disabled={url ? true : false}
              className={`flex items-center gap-4 ${
                url ? "text-slate-400" : ""
              }`}
            >
              Зураг {url ? "орсон" : "оруулах"}{" "}
              <div className="overflow-hidden">
                {url ? <FaCheckCircle size="20" color="green" /> : ""}
              </div>
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
