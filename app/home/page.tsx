"use client";
import LeftCol from "@/components/home/LeftCol";
import MiddleCol from "@/components/home/MiddleCol";
import RightCol from "@/components/home/RightCol";
import RightColModal from "@/components/home/MobileComponents/RightColModal";
import { useEffect, useState } from "react";
import { Recipe } from "../types/recipe";
import { Filters } from "../types/filters";
import Navbar from "@/components/Navbar";
import FilterModal from "@/components/home/MobileComponents/FilterModal";
export default function Home() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<Partial<Filters>>({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // TODO: Modal Right Col and Hamburger the Left Col on mobile
  return (
    <div>
      <Navbar setIsFilterModalOpen={setIsFilterModalOpen} />
      <div className="flex gap-4 p-4">
        <div className="flex-1 sticky hidden md:block top-20 self-start">
          <LeftCol setActiveFilters={setActiveFilters} />
        </div>
        <div className="flex-[2]">
          <MiddleCol
            setSelectedRecipe={setSelectedRecipe}
            activeFilters={activeFilters}
          />
        </div>
        <div className="flex-[2] hidden md:block sticky top-20 self-start">
          <RightCol selectedRecipe={selectedRecipe} />
        </div>

        {/* Mobile View */}
        {isMobile && selectedRecipe && (
          <RightColModal
            selectedRecipe={selectedRecipe}
            setSelectedRecipe={setSelectedRecipe}
          />
        )}

        {isFilterModalOpen && (
          <FilterModal
            setIsFilterModalOpen={setIsFilterModalOpen}
            setActiveFilters={setActiveFilters}
          />
        )}
      </div>
    </div>
  );
}
