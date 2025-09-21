"use client";
import LeftCol from "@/components/home/LeftCol";
import MiddleCol from "@/components/home/MiddleCol";
import RightCol from "@/components/home/RightCol";
import { useState } from "react";
import { Recipe } from "../types/recipe";
import { Filters } from "../types/filters";
export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const [activeFilters, setActiveFilters] = useState<Partial<Filters>>({});

  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1 sticky top-20 self-start">
        <LeftCol setActiveFilters={setActiveFilters} />
      </div>
      <div className="flex-[2]">
        <MiddleCol
          setSelectedRecipe={setSelectedRecipe}
          activeFilters={activeFilters}
        />
      </div>
      <div className="flex-[2] sticky top-20 self-start">
        <RightCol selectedRecipe={selectedRecipe} />
      </div>
    </div>
  );
}
