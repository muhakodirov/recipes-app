import * as z from "zod"

export const formSchema = z.object({
    name: z.string().min(2, {
      message: "Recipe name must be at least 2 characters.",
    }),
    ingredients: z.string().min(10, {
      message: "Please add at least one ingredient.",
    }),
    instructions: z.string().min(20, {
      message: "Instructions should be more detailed.",
    }),
    prepTimeMinutes: z.string().min(1, {
      message: "Prep time is required.",
    }),
    cookTimeMinutes: z.string().min(1, {
      message: "Cook time is required.",
    }),
    difficulty: z.string({
      required_error: "Please select a difficulty level.",
    }),
    servings: z.string().min(1, {
      message: "Number of servings is required.",
    }),
    calories: z.string().min(1, {
      message: "Calories per serving is required.",
    }),
    mealType: z.string({
      required_error: "Please select a meal type.",
    }),
    cuisine: z.string({
      required_error: "Please select a cuisine type.",
    }),
    tags: z.string(),
    image: z.string(),
  })