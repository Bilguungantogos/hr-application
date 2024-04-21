"use client";
import React, { useContext } from "react";

import Header from "@/components/header";
import { JobContext } from "@/components/context/job";
import JobCard from "@/components/jobCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/auth";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export const ClientDashboard = (props: Props) => {
  const { jobs, loading } = useContext(JobContext);
  const { loginuser, logout } = useAuth();
  const router = useRouter();
  return (
    <>
      <Header />
      <div className="flex h-full w-full mt-10">
        <div className="mx-auto flex flex-col gap-6 mb-10">
          <div className="flex justify-between items-center px-2">
            <h1 className="text-lg font-bold">Нээлттэй ажлын байрууд</h1>
            {loginuser ? (
              <Button
                onClick={() => {
                  logout();
                }}
              >
                Бүртгэлээс гарах
              </Button>
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
          {loading == true ? (
            <div className="flex flex-col gap-10">
              <Skeleton className="border-2 border-slate-300 p-6 rounded-[20px] w-[600px] h-[164px]" />
              <Skeleton className="border-2 border-slate-300 p-6 rounded-[20px] w-[600px] h-[164px]" />
              <Skeleton className="border-2 border-slate-300 p-6 rounded-[20px] w-[600px] h-[164px]" />
            </div>
          ) : (
            ""
          )}
          {jobs.map((job, key) => {
            return <JobCard job={job} key={job._id} />;
          })}
        </div>
      </div>
    </>
  );
};
