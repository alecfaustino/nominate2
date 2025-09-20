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
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Meal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Meal Types</SelectLabel>
                  {mealTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Cuisine */}
          <label className="block mb-2 font-medium">Cuisine</label>

          <div className="flex justify-center mb-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cuisines</SelectLabel>
                  {cuisines.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">Apply Filters</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
