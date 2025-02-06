// const Recipe = require("../schemas/Recipe");
import Tag from "./../schemas/Tag.js";
import { fetchAllTags } from "./../utils/fetchDatasForDB/tagsData.js";
// const fetchRecipes = require("./../utils/fetchDatasForDB/recipesData");
import connectDB from "./mongoConnection.js";


//------INSERT RECIPES TO DB-------
// const seedDatabase_Recipes = async () => {
//     try {
//         await connectDB();
//         const recipes = await fetchRecipes();
//         // console.log(recipes.recipes)
//         await Recipe.deleteMany();
//         await Recipe.insertMany(recipes.recipes);
//         process.exit();
//     } catch (error) {
//         process.exit(1);
//     }
// };

// seedDatabase_Recipes();


//------INSERT TAGS TO DB-------
// async function seedDatabase_Tags() {
//     try {
//         await connectDB();
//         const tags = await fetchAllTags();
//         console.log(tags);
//         for (let tag = 0; tag < tags.length; tag++) {
//             const tagObj = await Tag.create({ tag: tags[tag] });
//         }
//         process.exit(0);
//     } catch (error) {
//         process.exit(1);
//     }
// }

// seedDatabase_Tags();


