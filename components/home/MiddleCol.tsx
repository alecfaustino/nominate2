"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";

export default function MiddleCol() {
  const loadingRef = useRef(false);
  const [recipes, setRecipes] = useState<[]>([]);
  const baseUrl = "https://api.apilayer.com/spoonacular";

  const fetchRecipe = async () => {
    loadingRef.current = true;
    try {
      const fetchResult = await fetch(
        `${baseUrl}/recipes/complexSearch?number=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "",
          },
        }
      );
      const data = await fetchResult.json();
      const recipe = data.results;
      setRecipes(recipe);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("reached finally block");
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <Card>
      <CardContent>
        {recipes?.map((recipe: any) => (
          <div key={recipe.id}>
            <h2>{recipe.title}</h2>
          </div>
        ))}
        <h2>Something is here</h2>
      </CardContent>
    </Card>
  );
}
