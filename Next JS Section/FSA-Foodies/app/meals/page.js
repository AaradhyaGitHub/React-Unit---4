import Link from "next/link";
export default function MealItemPage() {
  return (
    <main>
      <h1>Meals</h1>
      <p>
        <Link href="/meals/meal-1">Meal-1</Link>
      </p>
      <p>
        <Link href="/meals/meal-2">Meal-2</Link>
      </p>
      <p>
        <Link href="/meals/meal-3">Meal-3</Link>
      </p>

      <Link href="/meals/share">Share Meal</Link>
    </main>
  );
}
