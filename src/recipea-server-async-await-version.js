const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.get("/find-recipes", async (req, res) => {
  const recipes = await fs.readFile("../data/recipea-data.json", "utf8");
  res.send(recipes);
});

app.get("/find-recipe/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  const recipes = JSON.parse(data);
  const recipe = recipes[id];
  const jsonRecipe = JSON.stringify(recipe, null, 2);
  res.send(jsonRecipe);
});

app.get("/trash-recipe/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  const recipes = JSON.parse(data);
  recipes.splice(id, 1);
  const jsonRecipes = JSON.stringify(recipes, null, 2);
  await fs.writeFile("../data/recipea-data.json", jsonRecipes);
  res.send("Recipe with " + id + " has been deleted.");
});
