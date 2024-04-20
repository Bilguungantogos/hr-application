"use client";

import myAxios from "@/components/utils/axios";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useAuth } from "./auth";

interface ApplicationForm {
  firstName: string;
  lastName: string;
  passportId: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  jobField: string;
  salaryExpectation: string;
  employmentType: string;
}

interface IUserApplicationContext {
  allUserApplication: ApplicationForm[];
  loading: boolean;
  file: any;
  userApplication: any;
  setFile: (e: any) => void;
  setSelectedJobId: (id: string) => void;
  createUserApplication: (applicationForm: ApplicationForm) => void;
}

export const UserApplicationContext = createContext(
  {} as IUserApplicationContext
);

export const UserApplicationProvider = ({ children }: PropsWithChildren) => {
  const { token, authLogged, loginuser } = useAuth();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState("");

  const [file, setFile] = useState<File>();
  const [userApplication, setUserApplication] = useState({});
  const [allUserApplication, setAllUserApplication] = useState([]);

  const createUserApplication = async (applicationForm: ApplicationForm) => {
    try {
      setLoading(true);
      const data = await myAxios.post(
        "/application",
        { applicationForm, selectedJobId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      console.log(data, "aaaaa");
    } catch (error) {
      //   toast({
      //     description: `There was a problem with your request. ${error} `,
      //     action: <ToastAction altText="Try again">Try again</ToastAction>,
      //   });
    } finally {
      setLoading(false);
    }
  };

  const getUserApplication = async () => {
    try {
      setLoading(true);
      const {
        data: { userApp },
      } = await myAxios.get("/application", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUserApplication(userApp);
      console.log(userApp, "userapplication");
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
  }, [loginuser]);

  return (
    <UserApplicationContext.Provider
      value={{
        loading,
        allUserApplication,
        createUserApplication,
        setFile,
        file,
        setSelectedJobId,
        userApplication,
      }}
    >
      {children}
    </UserApplicationContext.Provider>
  );
};

// const [applicationForm, setApplicationForm] = useState({
//   firstName: "",
//   lastName: "",
//   passportId: "",
//   birthDate: "",
//   phone: "",
//   email: "",
//   address: "",
//   jobField: "",
//   salaryExpectation: "",
//   employmentType: "",
// });
