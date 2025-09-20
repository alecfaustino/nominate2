"use client";
import LeftCol from "@/components/home/LeftCol";
import MiddleCol from "@/components/home/MiddleCol";
import RightCol from "@/components/home/RightCol";
import { useState } from "react";
export default function Home() {
  const [filters, setFilters] = useState({
    type: "",
    cuisine: "",
    diet: [],
    intolerances: [],
    maxCalories: 2000,
    maxProtein: 500,
    maxCarbs: 500,
    maxFat: 500,
  });

  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1">
        <LeftCol setFilters={setFilters} />
      </div>
      <div className="flex-[3]">
        <MiddleCol />
      </div>
      <div className="flex-[2]">
        <RightCol />
      </div>
    </div>
  );
}
