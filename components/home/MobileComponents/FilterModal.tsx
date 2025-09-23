"use client";

// TODO USE URL PARAMS TO SEND
// CHANGE THE FETCH  (MIDDLE COLUMN) TO USE URL PARAMS
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Filters } from "@/app/types/filters";

import { diets, cuisines, intolerances, mealTypes } from "@/app/data/constants";
import SelectWrap from "../FilterComponents/SelectWrap";
import CheckboxWrap from "../FilterComponents/CheckboxWrap";

interface FilterModalProps {
  setActiveFilters: React.Dispatch<React.SetStateAction<Partial<Filters>>>;
}

export default function FilterComponents({
  setActiveFilters,
}: FilterModalProps) {
  const [filters, setFilters] = useState<Partial<Filters>>({});
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full m-4 max-h-[90vh] overflow-hidden">
        <div className="text-center items-center">
          <Card>
            <CardHeader className="text-lg font-bold m-0">
              <div className="flex justify-between items-center">
                <h2>Filter Options</h2>
                <Button variant="ghost" onClick={() => setActiveFilters({})}>
                  X
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Meal Type */}
              <label className="block font-medium">Meal Type</label>
              <div className="flex justify-center">
                <SelectWrap
                  array={mealTypes}
                  placeholder="Type"
                  setFilters={setFilters}
                />
              </div>

              {/* Cuisine */}
              <label className="block font-medium">Cuisine</label>
              <div className="flex justify-center">
                <SelectWrap
                  array={cuisines}
                  placeholder="Cuisine"
                  setFilters={setFilters}
                />
              </div>

              <div>
                <CheckboxWrap
                  array={intolerances}
                  trigger="Food Intolerances"
                  filterName="intolerances"
                  setFilters={setFilters}
                />
              </div>
              <div>
                <CheckboxWrap
                  array={diets}
                  trigger="Dietary Preferences"
                  filterName="diet"
                  setFilters={setFilters}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setActiveFilters(filters);
                }}>
                Apply Filters
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
