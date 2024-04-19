"use client";

import React, { useContext } from "react";
import { Button } from "../ui/button";
import { JobContext } from "../context/job";

const JobCard = ({ job }: any) => {
  const { setSelectedJobId } = useContext(JobContext);
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
        }}
      >
        Анкет илгээх
      </Button>
    </div>
  );
};

export default JobCard;
