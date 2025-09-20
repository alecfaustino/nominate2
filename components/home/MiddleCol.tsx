"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function MiddleCol() {
  const loadingRef = useRef(false);
  const [recipes, setRecipes] = useState<[]>([]);
  const baseUrl = "https://api.apilayer.com/spoonacular";
  const apiKey: string = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "";
  const fetchUrl = new URL(`${baseUrl}/recipes/complexSearch`);
  fetchUrl.searchParams.append("apikey", apiKey);
  fetchUrl.searchParams.append("addRecipeInformation", "true");
  fetchUrl.searchParams.append("addRecipeInstructions", "true");
  fetchUrl.searchParams.append("addRecipeNutrition", "true");
  fetchUrl.searchParams.append("sort", "random");
  fetchUrl.searchParams.append("instructionsRequired", "true");
  fetchUrl.searchParams.append("includeIngredients", "true");

  const fetchRecipe = async () => {
    loadingRef.current = true;
    try {
      const fetchResult = await fetch(fetchUrl.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await fetchResult.json();
      const recipe = data.results;
      setRecipes(recipe);
      console.log(recipe);
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  return (
    <div className="grid-cols-1 gap-4">
      {recipes?.map((recipe: any) => (
        <Card key={recipe.id} className="mb-4">
          <CardContent>
            <div className="text-center space-y-4">
              <h2 className="text-lg font-bold">{recipe.title}</h2>
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={500}
                height={300}
              />
              <p>Ready in {recipe.readyInMinutes} minutes</p>
              <p>{recipe.servings} servings</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
