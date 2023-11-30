const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});



const saveRecipe = async (newRecipe) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  const recipes = [...JSON.parse(data), newRecipe];
  const jsonRecipe = JSON.stringify(recipes, null, 2);
  await fs.writeFile("../data/recipea-data.json", jsonRecipe, "utf8");
};

const deleteRecipe = async (id) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  const recipes = JSON.parse(data).filter((recipe, i) => i !== id);
  const jsonRecipe = JSON.stringify(recipes, null, 2);
  await fs.writeFile("../data/recipea-data.json", jsonRecipe, "utf8");
};

const updateRecipe = async (id, updatedRecipe) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8")
  const recipes = JSON.parse(data).map((recipe, i) => {
    return i === id ? updatedRecipe : recipe;
})

const jsonRecipe = JSON.stringify(recipes, null, 2);
await fs.writeFile("../data/recipea-data.json", jsonRecipe, "utf8");
};

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

app.get("/create-recipe", async (req, res) => {
  await saveRecipe({name: req.body.name, cookingMethod: req.body.cookingMethod, ingredients: req.body.ingredients});
  res.send("Recipe successfully added to the file!");
})

app.get("/update-recipe/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatedRecipe = {
    name: req.body.name,
    cookingMethod: req.body.cookingMethod,
    ingredients: req.body.ingredients
  };

  await updateRecipe(Number(req.params.id), updatedRecipe);
  res.send(`Recipe ${id} has been updated!`);
});

app.get("/trash-recipe/:id", async (req, res) => {
  const id = Number(req.params.id);
  await deleteRecipe(Number(req.params.id));
  res.send(`Successfully deleted Recipe ${id}.`);
});