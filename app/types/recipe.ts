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
  analyzedInstructions?: {
    name: string;
    steps: {
      number: number;
      step: string;
    }[];
  }[];
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
      unit: string;
    }[];
  };
  };

