"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

export async function shareMeal(formData) {
  try {
    const meal = {
      title: formData.get("title"),
      image: formData.get("image"),
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      creator: formData.get("name"),
      creator_email: formData.get("email")
    };

    // Validate inputs if needed
    if (
      !meal.title ||
      !meal.image ||
      !meal.summary ||
      !meal.instructions ||
      !meal.creator ||
      !meal.creator_email
    ) {
      throw new Error("Missing required fields");
    }

    await saveMeal(meal);
    redirect("/meals");
  } catch (error) {
    // You'll want to handle this error appropriately
    console.error("Failed to share meal:", error);
    throw error; // or return { error: error.message }
  }
}
