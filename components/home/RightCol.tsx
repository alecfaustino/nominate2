import { Card, CardContent, CardHeader } from "../ui/card";
import { Recipe } from "@/app/types/recipe";
interface RightColProps {
  selectedRecipe?: Recipe | null;
}

export default function RightCol({ selectedRecipe }: RightColProps) {
  return (
    <div className="text-center items-center">
      <Card>
        <CardHeader className="text-lg font-bold m-0">
          Recipe Details
        </CardHeader>
        <CardContent>
          {selectedRecipe ? (
            <div>
              <h2 className="text-xl font-bold mb-2">{selectedRecipe.title}</h2>
            </div>
          ) : (
            <p>No recipe selected</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
