"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

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

    if (
      isInvalidText(meal.title) ||
      isInvalidText(meal.summary) ||
      isInvalidText(meal.instructions) ||
      isInvalidText(meal.creator) ||
      isInvalidText(meal.creator_email) ||
      !meal.creator_email.includes("@") ||
      !meal.image ||
      meal.image.size === 0
    ) {
      console.log("Input Invalid");
      return {
        message: "Invalid Input"
      };
    }

    await saveMeal(meal);
    revalidatePath("/meals");
    redirect("/meals");
  } catch (error) {
    // You'll want to handle this error appropriately
    console.error("Failed to share meal:", error);
    throw error; // or return { error: error.message }
  }
}
