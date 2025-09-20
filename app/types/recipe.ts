export type Recipe = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  diets?: string[];
  cuisines?: string[];
  mealTypes?: string[];
  nutrition?: {
    calories: string;
    fat: string;
    carbs: string;
    protein: string;
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
    ingredients: {
      id: number;
      name: string;
      amount: number;
      unit: any;
    }[];
  };
  };

