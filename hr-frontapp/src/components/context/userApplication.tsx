"use client";

import myAxios from "@/components/utils/axios";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

interface IApplication {
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
  getUserApplication: () => Promise<void>;
  application: IApplication[];
  loading: boolean;
  file: any;
  setFile: (e: any) => void;
}

export const UserApplicationContext = createContext({} as IJobContext);

export const UserApplicationProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");

  const [file, setFile] = useState<File>();

  const [application, setApplication] = useState([]);

  const getUserApplication = async () => {
    try {
      setLoading(true);
      const {
        data: { allJobs },
      } = await myAxios.get("/job");
      setApplication(allJobs);
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
    getUserApplication();
  }, []);

  return (
    <UserApplicationContext.Provider
      value={{
        loading,
        application,
        getUserApplication,

        setFile,
        file,
      }}
    >
      {children}
    </UserApplicationContext.Provider>
  );
};
