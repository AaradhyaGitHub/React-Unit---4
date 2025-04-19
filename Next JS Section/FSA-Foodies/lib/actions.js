"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
  return !text || text.trim() === "";
}
export async function shareMeal(prevState, formData) {
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
      isInvalidText(meal.title) ||
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email) ||
      meal.creator_email.includes("@") ||
      !meal.image ||
      meal.image.size === 0
    ) {
      return {
        message: "Invalid Input"
      };
    }

    await saveMeal(meal);
    redirect("/meals");
  } catch (error) {
    // You'll want to handle this error appropriately
    console.error("Failed to share meal:", error);
    throw error; // or return { error: error.message }
  }
}
