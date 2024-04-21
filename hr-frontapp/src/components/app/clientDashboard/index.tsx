"use client";
import React, { useContext } from "react";

import Header from "@/components/header";
import { JobContext } from "@/components/context/job";
import JobCard from "@/components/jobCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/auth";

type Props = {};

export const ClientDashboard = (props: Props) => {
  const { jobs } = useContext(JobContext);
  const { loginuser } = useAuth();
  const router = useRouter();
  return (
    <>
      <Header />
      <div className="flex h-full w-full mt-10">
        <div className="mx-auto flex flex-col gap-6 mb-10">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-lg font-bold">Нээлттэй ажлын байрууд</h1>
            {loginuser ? (
              ""
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
          {jobs.map((job, key) => {
            return <JobCard job={job} key={job._id} />;
          })}
        </div>
      </div>
    </>
  );
};
