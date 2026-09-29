import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";
import { PythonShell } from 'python-shell';
import bodyParser from 'body-parser';
import cors from "cors";


const app = express();
const PORT = ENV.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

if (ENV.NODE_ENV === "production") job.start();

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

app.post("/api/favorites", async (req, res) => {
  try {
    const { userId, recipeId } = req.body;

    if (!userId || !recipeId) {
      return res.status(400).json({ error: "userId dan recipeId wajib diisi" });
    }

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
    );
    const data = await response.json();
    const recipe = data.meals[0];

    if (!recipe) {
      return res.status(404).json({ error: "Recipe tidak ditemukan" });
    }

    const ingredientCount = Array.from({ length: 20 }).reduce((acc, _, i) => {
      return recipe[`strIngredient${i + 1}`] ? acc + 1 : acc;
    }, 0);

    const instructionLength = recipe.strInstructions?.length || 0;

    const heavyKeywords = [
      "chicken", "beef", "rice", "curry", "pasta",
      "noodle", "lasagna", "steak", "fish", "fried", "meat", "biryani"
    ];
    const lightKeywords = [
      "cake", "cookie", "pie", "tart", "salad", "toast",
      "pancake", "sandwich"
    ];

    const titleLower = recipe.strMeal.toLowerCase();
    let category = "makanan_berat";
    if (lightKeywords.some(w => titleLower.includes(w))) category = "makanan_ringan";
    else if (heavyKeywords.some(w => titleLower.includes(w))) category = "makanan_berat";

    const newFavorite = await db
      .insert(favoritesTable)
      .values({
        userId,
        recipeId,
        title: recipe.strMeal,
        image: recipe.strMealThumb,
        cookTime: recipe.strTime || null,
        servings: recipe.servings || null,
        ingredientCount,
        instructionLength,
        category,
      })
      .returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.log("Error adding favorite with ML features", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db
      .select()
      .from(favoritesTable)
      .where(eq(favoritesTable.userId, userId));

    res.status(200).json(userFavorites);
  } catch (error) {
    console.log("Error fetching the favorites", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/favorites/:userId/:recipeId", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favoritesTable)
      .where(
        and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
      );

    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.log("Error removing a favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post('/predict', (req, res) => {
    const { ingredient_count, instruction_length } = req.body;

    PythonShell.run('ml/predict.py',
    {
        pythonPath: 'C:\\Users\\My ASUS\\anaconda3\\python.exe',
        args: [ingredient_count, instruction_length]
    },
        (err, results) => {
            if (err) return res.status(500).send(err);

            const category = results[0] === '1' ? 'makanan_berat' : 'makanan_ringan';
            res.json({ category });
        });
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});