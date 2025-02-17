const mongoose = require('mongoose');

const RecipesSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
    },
    instructions: {
        type: [String],
    },
    prepTimeMinutes: {
        type: Number,
    },
    cookTimeMinutes: {
        type: Number,
    },
    servings: {
        type: Number,
    },
    difficulty: {
        type: String,
    },
    cuisine: {
        type: String,
    },
    caloriesPerServing: {
        type: Number,
    },
    tags: {
        type: [String],
        default: [],
    },
    userId: {
        type: String,
    },
    image: {
        type: String,
        default: "", // Falls kein Bild vorhanden ist
    },
    rating: {
        type: Number,

    },
    reviewCount: {
        type: Number,
    },
    mealType: {
        type: [String],
        default: [],
    },
}, { timestamps: true }); // timestamps fügt createdAt und updatedAt automatisch hinzu

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", RecipesSchema);
export default Recipe;