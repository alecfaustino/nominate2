"use client";

import { SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

interface LeftColProps {
  setFilters: React.Dispatch<SetStateAction<any>>;
}

export default function LeftCol({ setFilters }: LeftColProps) {
  return (
    <Card>
      <CardHeader className="text-lg font-bold">Filters</CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="outline">Apply Filters</Button>
      </CardFooter>
    </Card>
  );
}
