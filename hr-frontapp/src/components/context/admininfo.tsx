"use client";

import myAxios from "@/components/utils/axios";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useToast } from "../ui/use-toast";

interface IAdminContext {
  allUserApplication: any[];
  loading: boolean;
  file: any;
  filterValues: any;
  userApplication: any;
  setFile: (e: any) => void;
  allUserInfo: any[];
  setFilterValues: (value: any) => void;
  handleFilter: () => void;
}

export const AdminContext = createContext({} as IAdminContext);

export const AdminProvider = ({ children }: PropsWithChildren) => {
  const { token, loginuser } = useAuth();
  const { toast } = useToast();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File>();
  const [userApplication, setUserApplication] = useState({});
  const [allUserApplication, setAllUserApplication] = useState([]);
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [filterValues, setFilterValues] = useState({
    jobField: "",
    salaryExpectation: "",
    cv: "",
  });

  const handleFilter = () => {
    if (filterValues.jobField !== "") {
      const filteredApplications = allUserApplication.filter(
        (userApp: any) => userApp.jobPosition.jobField === filterValues.jobField
      );
      if (filterValues.salaryExpectation === "minToMax") {
        filteredApplications.sort((a: any, b: any) => {
          return a.jobPosition.salary - b.jobPosition.salary;
        });
      } else if (filterValues.salaryExpectation === "maxToMin") {
        filteredApplications.sort((a: any, b: any) => {
          return b.jobPosition.salary - a.jobPosition.salary;
        });
      }
      console.log(filteredApplications);
    }
  };

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await myAxios.get("/application/admin", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAllUserInfo(data.allUser);
      console.log(data, "adasdasdsadadsadsaadsdasads");
    } catch (error) {
      // toast({
      //   description: `Алдаа гарлаа`,
      // });
    } finally {
      setLoading(false);
    }
  };

  const getAllUsersApplication = async () => {
    try {
      setLoading(true);
      const { data } = await myAxios.get("/application/adminapp", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setAllUserApplication(data.allUserApp);
      console.log(data, "adasdasdsadadsadsaadsdasads");
    } catch (error) {
      toast({
        description: `Алдаа гарлаа`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loginuser?.role == "Admin") {
      getAllUsers();
      getAllUsersApplication();
    }
  }, [loginuser]);

  return (
    <AdminContext.Provider
      value={{
        loading,
        allUserApplication,
        setFile,
        file,
        allUserInfo,
        userApplication,
        setFilterValues,
        filterValues,
        handleFilter,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
