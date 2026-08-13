export default interface Day {
  date: string; // YYYY-MM-DD
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;

  getMeal(mealType: 'breakfast' | 'lunch' | 'dinner'):
    string | null;

  setMeal(mealType: 'breakfast' | 'lunch' | 'dinner', meal: string | null): void;
}