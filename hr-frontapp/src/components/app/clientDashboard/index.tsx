"use client";
import React, { useContext } from "react";

import Header from "@/components/header";
import { JobContext } from "@/components/context/job";
import JobCard from "@/components/jobCard";

type Props = {};

export const ClientDashboard = (props: Props) => {
  const { jobs } = useContext(JobContext);
  return (
    <>
      <Header />
      <div className="flex h-full w-full mt-10">
        <div className="mx-auto flex flex-col gap-6 mb-10">
          <h1 className="text-lg font-bold">Нээлттэй ажлын байрууд</h1>
          {jobs.map((job, key) => {
            return <JobCard job={job} key={job._id} />;
          })}
        </div>
      </div>
    </>
  );
};
