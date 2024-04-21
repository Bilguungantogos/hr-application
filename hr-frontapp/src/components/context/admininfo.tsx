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
  filteredAllUserApplication: any;
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
  const [filteredAllUserApplication, setFilteredAllUserApplication] = useState(
    []
  );
  const [allUserInfo, setAllUserInfo] = useState([]);
  const [filterValues, setFilterValues] = useState({
    jobField: "",
    salaryExpectation: "",
    cv: "",
  });

  const handleFilter = () => {
    let filteredApplications = [...allUserApplication];

    if (filterValues.jobField !== "") {
      filteredApplications = filteredApplications.filter(
        (userApp: any) => userApp.jobPosition.jobField == filterValues.jobField
      );
    }

    if (filterValues.cv === "Хавсаргасан") {
      filteredApplications = filteredApplications.filter(
        (userApp: any) => userApp.user.cv !== ""
      );
    }

    if (filterValues.salaryExpectation === "minToMax") {
      filteredApplications.sort(
        (a: any, b: any) =>
          a.jobPosition.salaryExpectation - b.jobPosition.salaryExpectation
      );
    } else if (filterValues.salaryExpectation === "maxToMin") {
      filteredApplications.sort(
        (a: any, b: any) =>
          b.jobPosition.salaryExpectation - a.jobPosition.salaryExpectation
      );
    }

    setFilteredAllUserApplication(filteredApplications);
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
      setFilteredAllUserApplication(data.allUserApp);
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
        filteredAllUserApplication,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
