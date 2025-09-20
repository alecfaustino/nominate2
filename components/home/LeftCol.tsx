"use client";

import { SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

import {
  diets,
  cuisines,
  intolerances,
  mealTypes,
} from "../../app/data/constants";
import SelectWrap from "./FilterComponents/SelectWrap";
import CheckboxWrap from "./FilterComponents/CheckboxWrap";

interface LeftColProps {
  setFilters: React.Dispatch<SetStateAction<any>>;
}

export default function LeftCol({ setFilters }: LeftColProps) {
  return (
    <div className="text-center items-center">
      <Card>
        <CardHeader className="text-lg font-bold m-0">
          Optional Filters
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
            <CheckboxWrap array={intolerances} trigger="Food Intolerances" />
          </div>
          <div>
            <CheckboxWrap array={diets} trigger="Dietary Preferences" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">Apply Filters</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
