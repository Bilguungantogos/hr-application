"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { JobContext } from "../context/job";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const JobCard = ({ job }: any) => {
  const { setSelectedJobId } = useAuth();
  const { loginuser } = useAuth();
  const router = useRouter();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem
        value="item-1"
        className="border-2 border-slate-300 p-6 rounded-[20px] max-w-[600px]"
      >
        <AccordionTrigger className="flex items-center justify-between gap-4 ">
          <div className="w-[344px]">
            <p className="text-lg font-bold">{job.jobTitle}</p>
            <p>{job.field}</p>
            <p>{job.location}</p>
          </div>
          <div className="flex flex-col items-center justify-between text-sm font-light">
            <h1>Анкет хүлээн авах хугацаа</h1>
            <h1 className="w-[105px] h-[40px]">{job.deadline}</h1>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="border-t-2 pt-2">
            <p className="font-bold">Ажлын байрны зорилго/үүрэг:</p>
            <p>{job?.requirements?.purpose}</p>
          </div>
          <div>
            <p className="font-bold">Тавигдах шаардлага:</p>
            <p>{job?.requirements?.jobRequirement}</p>
          </div>
        </AccordionContent>
      </AccordionItem>
      <div className="flex justify-end w-full bg-slate-300 rounded-[16px]">
        <h1 className=" w-full"></h1>
        <Button
          className="rounded-[14px] bg-slate-700"
          onClick={() => {
            setSelectedJobId(job._id);
            console.log(job._id, "setlelee");
            if (loginuser === null) {
              router.push("/login");
            } else {
              router.push("/profile");
            }
          }}
        >
          Анкет илгээх
        </Button>
      </div>
    </Accordion>
  );
};

export default JobCard;
