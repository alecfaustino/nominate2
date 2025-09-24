"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Recipe } from "@/app/types/recipe";
import { Filters } from "@/app/types/filters";
interface MiddleColProps {
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
  activeFilters?: Partial<Filters>;
}

// TODO: Infinite Scroll
// TODO: Loading State
// TODO: Favorite Handling - Local Storage
export default function MiddleCol({
  setSelectedRecipe,
  activeFilters,
}: MiddleColProps) {
  const loadingRef = useRef(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const baseUrl = "https://api.apilayer.com/spoonacular";
  const apiKey: string = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "";
  const lastCall = useRef(0);
  const fetchRecipe = async () => {
    loadingRef.current = true;
    try {
      const fetchUrl = new URL(`${baseUrl}/recipes/complexSearch`);
      fetchUrl.searchParams.append("apikey", apiKey);
      fetchUrl.searchParams.append("addRecipeInformation", "true");
      fetchUrl.searchParams.append("addRecipeInstructions", "true");
      fetchUrl.searchParams.append("addRecipeNutrition", "true");
      fetchUrl.searchParams.append("sort", "random");
      fetchUrl.searchParams.append("instructionsRequired", "true");
      fetchUrl.searchParams.append("includeIngredients", "true");

      if (activeFilters) {
        if (activeFilters.type) {
          fetchUrl.searchParams.append("type", activeFilters.type);
        }
        if (activeFilters.cuisine) {
          fetchUrl.searchParams.append("cuisine", activeFilters.cuisine);
        }
        if (activeFilters.diet && activeFilters.diet.length > 0) {
          fetchUrl.searchParams.append("diet", activeFilters.diet.join(","));
        }
        if (
          activeFilters.intolerances &&
          activeFilters.intolerances.length > 0
        ) {
          fetchUrl.searchParams.append(
            "intolerances",
            activeFilters.intolerances.join(",")
          );
        }
      }

      const fetchResult = await fetch(fetchUrl.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await fetchResult.json();
      const recipe = data.results;
      setRecipes((prev) => [...prev, ...recipe]);
      loadingRef.current = false;
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();

      // Throttle scroll events to once every 200ms
      if (now - lastCall.current < 200) return;
      lastCall.current = now;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100 && !loadingRef.current) {
        fetchRecipe();
      }
    };
    window.addEventListener("scroll", handleScroll);

    // cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeFilters]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // if the active filters change, reset recipes and fetch new ones
    setRecipes([]);
    fetchRecipe();
  }, [activeFilters]);

  const handleRecipeSelect = (id: number) => {
    const selected = recipes.find((recipe) => recipe?.id === id);
    if (selected) setSelectedRecipe(selected);
  };

  return (
    <div className="grid-cols-1 gap-4 ">
      {recipes?.map((recipe: any) => (
        <Card key={recipe.id} className="mb-4">
          <CardContent>
            <div
              className="flex flex-col text-center items-center justify-center space-y-4"
              onClick={() => handleRecipeSelect(recipe.id)}>
              <h2 className="text-lg font-bold">{recipe.title}</h2>
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={500}
                height={300}
                style={{
                  width: "100%",
                  height: "auto",
                }}
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
