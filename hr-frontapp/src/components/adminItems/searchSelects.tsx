import React, { useContext } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { AdminContext } from "../context/admininfo";

export const FilterUnitedComp = () => {
  const { handleFilter } = useContext(AdminContext);
  return (
    <div className="flex gap-4">
      <SearchByJobField />
      <SearchBySalaryExp />
      <SearchByCV />
      <Button onClick={handleFilter}>Хайх</Button>
    </div>
  );
};

export function SearchByJobField() {
  const { setFilterValues, filterValues } = useContext(AdminContext);
  return (
    <Select
      onValueChange={(e) => {
        setFilterValues({ ...filterValues, jobField: e });
        console.log(e);
      }}
    >
      <SelectTrigger className="w-[260px]">
        <SelectValue placeholder="Ажлын чиглэл" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Мэдээллийн технологи/Програм хангамж">
            Мэдээллийн технологи/Програм хангамж
          </SelectItem>
          <SelectItem value="Худалдан авалт">Худалдан авалт</SelectItem>
          <SelectItem value="Санхүү/Бүртгэл">Санхүү/Бүртгэл</SelectItem>
          <SelectItem value="Тээвэр ложистик">Тээвэр ложистик</SelectItem>
          <SelectItem value="Хүний нөөц/захиргаа">
            Хүний нөөц/захиргаа
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SearchBySalaryExp() {
  const { setFilterValues, filterValues } = useContext(AdminContext);
  return (
    <Select
      onValueChange={(e) => {
        setFilterValues({ ...filterValues, salaryExpectation: e });
        console.log(e);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Цалингийн хүлээлт" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="maxToMin">Ихээс бага</SelectItem>
          <SelectItem value="minToMax">Багаас их</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SearchByCV() {
  const { setFilterValues, filterValues } = useContext(AdminContext);
  return (
    <Select
      onValueChange={(e) => {
        setFilterValues({ ...filterValues, cv: e });
        console.log(e);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="CV" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Хавсаргасан">Хавсаргасан</SelectItem>
          <SelectItem value="Хавсаргаагүй">Хавсаргаагүй</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
