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
      <div className="flex h-screen w-full">
        <div>
          {jobs.map((job, key) => {
            return <JobCard job={job} key={job._id} />;
          })}
        </div>
      </div>
    </>
  );
};
