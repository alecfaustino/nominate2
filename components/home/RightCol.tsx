import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Recipe } from "@/app/types/recipe";
import InfoAccordion from "./DetailComponents/InfoAccordion";
import DietaryAccordion from "./DetailComponents/DietaryAccordion";
import MacroAccordion from "./DetailComponents/MacroAccordion";
import InstructionsAccordion from "./DetailComponents/InstructionsAccordion";
interface RightColProps {
  selectedRecipe?: Recipe | null;
}

export default function RightCol({ selectedRecipe }: RightColProps) {
  const macroNutrientArray =
    selectedRecipe?.nutrition?.nutrients?.filter((n) =>
      ["Calories", "Protein", "Fat", "Carbohydrates"].includes(n.name)
    ) ?? [];
  return (
    <div className="text-center items-center">
      <Card>
        <CardHeader className="text-lg font-bold m-0">
          Recipe Details
        </CardHeader>
        <CardContent>
          {selectedRecipe ? (
            <div className="flex flex-col items-center space-y-1 overflow-y-scroll max-h-96 md:max-h-[32rem]">
              <h2 className="text-xl font-bold">{selectedRecipe.title}</h2>
              <Image
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                width={500}
                height={300}
              />
              <DietaryAccordion
                readyInMinutes={selectedRecipe.readyInMinutes}
                servings={selectedRecipe.servings}
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
          ) : (
            <p>Select a recipe to view more details!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
