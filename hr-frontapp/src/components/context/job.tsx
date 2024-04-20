"use client";

import myAxios from "@/components/utils/axios";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface IJob {
  _id: String;
  location: String;
  jobTitle: string;
  field: string;
  deadline: string;
  requirements: {
    purpose: String;
    employmentType: String;
    jobRequirement: String;
    status: String;
  };
}

interface IJobContext {
  getJobs: () => Promise<void>;
  jobs: IJob[];
  loading: boolean;
}

export const JobContext = createContext({} as IJobContext);

export const JobProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    try {
      setLoading(true);
      const {
        data: { allJobs },
      } = await myAxios.get("/job");
      setJobs(allJobs);
      console.log(allJobs, "aaaaa");
    } catch (error) {
      //   toast({
      //     description: `There was a problem with your request. ${error} `,
      //     action: <ToastAction altText="Try again">Try again</ToastAction>,
      //   });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <JobContext.Provider
      value={{
        getJobs,
        jobs,
        loading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};
