import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Recipe } from "@/app/types/recipe";
import DietaryAccordion from "../DetailComponents/DietaryAccordion";
import InfoAccordion from "../DetailComponents/InfoAccordion";
import MacroAccordion from "../DetailComponents/MacroAccordion";
import InstructionsAccordion from "../DetailComponents/InstructionsAccordion";

interface RightColModalProps {
  selectedRecipe?: Recipe | null;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
}

export default function RightColModal({
  selectedRecipe,
  setSelectedRecipe,
}: RightColModalProps) {
  if (!selectedRecipe) return null;

  const macroNutrientArray =
    selectedRecipe?.nutrition?.nutrients?.filter((n) =>
      ["Calories", "Protein", "Fat", "Carbohydrates"].includes(n.name)
    ) ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full m-4 max-h-[90vh] overflow-hidden">
        <Card className="border-0">
          <CardHeader className="text-lg font-bold m-0">
            <div className="flex justify-between items-center">
              <h2>Recipe Details</h2>
              <Button variant="ghost" onClick={() => setSelectedRecipe(null)}>
                X
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-1 overflow-y-scroll max-h-96 md:max-h-[32rem]">
              <h2 className="text-xl font-bold">{selectedRecipe.title}</h2>
              <Image
                src={selectedRecipe.image || "/placeholder.jpg"}
                alt={selectedRecipe.title || "Recipe image"}
                width={500}
                height={300}
              />
              <DietaryAccordion
                readyInMinutes={selectedRecipe.readyInMinutes ?? 0}
                servings={selectedRecipe.servings ?? 1}
                diets={selectedRecipe.diets}
                cuisines={selectedRecipe.cuisines}
              />

              {selectedRecipe?.nutrition?.ingredients?.length && (
                <InfoAccordion
                  trigger="Ingredients"
                  array={selectedRecipe?.nutrition?.ingredients}
                />
              )}
              {macroNutrientArray.length > 0 && (
                <MacroAccordion array={macroNutrientArray} />
              )}
              {selectedRecipe?.analyzedInstructions && (
                <InstructionsAccordion
                  array={selectedRecipe?.analyzedInstructions?.[0]?.steps ?? []}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
