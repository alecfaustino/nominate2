"use client";

import { SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  diets,
  cuisines,
  intolerances,
  mealTypes,
} from "../../app/data/constants";
import SelectWrap from "./FilterComponents/SelectWrap";

interface LeftColProps {
  setFilters: React.Dispatch<SetStateAction<any>>;
}

export default function LeftCol({ setFilters }: LeftColProps) {
  return (
    <div className="text-center items-center">
      <Card>
        <CardHeader className="text-lg font-bold">Filters</CardHeader>
        <CardContent>
          {/* Meal Type */}
          <label className="block mb-2 font-medium">Meal Type</label>
          <div className="flex justify-center mb-4">
            <SelectWrap array={mealTypes} placeholder="Meal Type" />
          </div>

          {/* Cuisine */}
          <label className="block mb-2 font-medium">Cuisine</label>

          <div className="flex justify-center mb-4">
            <SelectWrap array={cuisines} placeholder="Cuisine" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">Apply Filters</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
