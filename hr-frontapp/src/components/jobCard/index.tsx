"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { JobContext } from "../context/job";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth";
import { UserApplicationContext } from "../context/userApplication";

const JobCard = ({ job }: any) => {
  const { setSelectedJobId } = useContext(UserApplicationContext);
  const { loginuser } = useAuth();
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-4 border p-4">
      <div>
        <p className="text-lg font-bold">{job.jobTitle}</p>
        <p>{job.field}</p>
        <p>{job.location}</p>
      </div>
      <Button
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
  );
};

export default JobCard;
