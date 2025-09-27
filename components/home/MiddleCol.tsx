"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Recipe } from "@/app/types/recipe";
import { Filters } from "@/app/types/filters";
import Loading from "./Loading";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
interface MiddleColProps {
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
  activeFilters?: Partial<Filters>;
}

// TODO: Clean up the component and use helper function files
export default function MiddleCol({
  setSelectedRecipe,
  activeFilters,
}: MiddleColProps) {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const baseUrl = "https://api.apilayer.com/spoonacular";
  const apiKey: string = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY || "";
  const lastCall = useRef(0);
  const fetchRecipe = async (isAppending = false) => {
    setLoading(true);
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
      setRecipes((prev) => {
        const newRecipes = isAppending ? [...prev, ...recipe] : recipe;
        // Save updated recipes to sessionStorage with correct timing
        sessionStorage.setItem("recipes", JSON.stringify(newRecipes));
        return newRecipes;
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

      if (scrollTop + windowHeight >= fullHeight - 100 && !loading) {
        fetchRecipe(true); // Pass true for infinite scroll (append)
      }
    };
    window.addEventListener("scroll", handleScroll);

    // cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeFilters]);

  // Load recipes on mount / filter change
  useEffect(() => {
    const saved = sessionStorage.getItem("recipes");
    if (saved) {
      setRecipes(JSON.parse(saved));
    } else {
      setRecipes([]);
      fetchRecipe(false); // Pass false for filter change (replace)
    }
  }, [activeFilters]);

  const handleRecipeSelect = (id: number) => {
    const selected = recipes.find((recipe) => recipe?.id === id);
    if (selected) setSelectedRecipe(selected);
  };

  // LocalStorage Favorite Handling

  // on load, set the favorites state from local storage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save whenever the favorites state changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (recipe: Recipe) => {
    setFavorites((prev) => {
      const exists = prev.find((r) => r.id === recipe.id);
      if (exists) {
        return prev.filter((r) => r.id !== recipe.id);
      } else {
        return [...prev, recipe];
      }
    });
  };

  // TODO move to utils file
  const favoritesSet = useMemo(
    () => new Set(favorites.map((fav) => fav.id)),
    [favorites]
  );

  return (
    <>
      {loading && <Loading />}
      <div className="grid grid-cols-1 gap-4">
        {recipes?.map((recipe: Recipe) => {
          const isFavorited = favoritesSet.has(recipe.id);

          return (
            <Card key={recipe.id} className="relative">
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

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering recipe select
                    toggleFavorite(recipe);
                  }}
                  className="absolute top-2 right-2 cursor-pointer">
                  {isFavorited ? (
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  ) : (
                    <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
