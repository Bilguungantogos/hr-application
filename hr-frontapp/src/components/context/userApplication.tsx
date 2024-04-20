"use client";

import myAxios from "@/components/utils/axios";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useToast } from "../ui/use-toast";

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
  loading: boolean;
  file: any;
  userApplication: any;
  setFile: (e: any) => void;
  createUserApplication: (applicationForm: ApplicationForm) => void;
}

export const UserApplicationContext = createContext(
  {} as IUserApplicationContext
);

export const UserApplicationProvider = ({ children }: PropsWithChildren) => {
  const { token, authLogged, loginuser, selectedJobId } = useAuth();
  const { toast } = useToast();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File>();
  const [userApplication, setUserApplication] = useState({});

  const createUserApplication = async (applicationForm: ApplicationForm) => {
    try {
      setLoading(true);
      if (selectedJobId == "") {
        return toast({
          variant: "default",
          title: `Илгээх ажлыг заавал сонгоно уу`,
          duration: 1500,
        });
      }
      const data = await myAxios.post(
        "/application",
        { applicationForm, selectedJobId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast({
        variant: "default",
        title: `Анкет амжилттай илгээлээ`,
        duration: 1500,
      });
      router.push("./");
      console.log(data, "aaaaa");
    } catch (error) {
      toast({
        variant: "destructive",
        description: `Анкет илгээхэд алдаа гарлаа.`,
        duration: 1500,
      });
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
      // toast({
      //   description: `Алдаа гарлаа`,
      // });
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
        createUserApplication,
        setFile,
        file,
        userApplication,
      }}
    >
      {children}
    </UserApplicationContext.Provider>
  );
};
