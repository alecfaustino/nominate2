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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <LeftCol setFilters={setFilters} />
      <MiddleCol />
      <RightCol />
    </div>
  );
}
