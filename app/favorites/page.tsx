"use client";

import { useEffect, useState, useMemo } from "react";
import { Recipe } from "../types/recipe";
import Loading from "@/components/home/Loading";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RightColModal from "@/components/home/MobileComponents/RightColModal";
import Navbar from "@/components/Navbar";
import { Heart } from "lucide-react";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const favoritesSet = useMemo(
    () => new Set(favorites.map((fav) => fav.id)),
    [favorites]
  );

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
    <div>
      <Navbar setIsFilterModalOpen={setIsFilterModalOpen} />
      {loading && <Loading />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {favorites?.map((recipe: Recipe) => {
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
                  className="absolute top-2 right-2">
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

      {selectedRecipe && (
        <RightColModal
          selectedRecipe={selectedRecipe}
          setSelectedRecipe={setSelectedRecipe}
        />
      )}
    </div>
  );
}
