"use client";

import { useEffect, useState } from "react";
import { Recipe } from "../types/recipe";
import Loading from "@/components/home/Loading";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    setLoading(true);
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  // TODO: REUSED FUNCTION - UTILS FILE
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

  // TODO: REUSED FUNCTION - UTILS FILE
  const handleRecipeSelect = (id: number) => {
    const selected = favorites.find((recipe) => recipe?.id === id);
    if (selected) setSelectedRecipe(selected);
  };

  return (
    <div className="p-4">
      {loading && <Loading />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favorites?.map((recipe: Recipe) => (
          <Card key={recipe.id}>
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
                <Button onClick={() => toggleFavorite(recipe)}>Favorite</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
