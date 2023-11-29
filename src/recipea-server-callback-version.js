const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});



const saveNote = async (newNote) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  const notes = [...JSON.parse(data), newNote];
  const jsonVersion = JSON.stringify(notes, null, 2);
  await fs.writeFile("../data/recipea-data.json", jsonVersion, "utf8");
};

const deleteRecipe = async (id) => {
  const data = await fs.readFile("../data/recipea-data.json", "utf8");
  const notes = JSON.parse(data).filter((note, i) => i !== id);
  const jsonVersion = JSON.stringify(notes, null, 2);
  await fs.writeFile("../data/recipea-data.json", jsonVersion, "utf8");
};

app.get("/find-recipes", (req, res) => {
  fs.readFile("../data/recipea-data.json", "utf8", (err, data) => {
    res.send(data);
  });
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
  await saveNote({name: req.body.name, cookingMethod: req.body.cookingMethod, ingredients: req.body.ingredients});
  res.send("Recipe successfully added to the file!");
})

app.get("/trash-recipe/:id", async (req, res) => {
  await deleteRecipe(Number(req.params.id));
  res.send("Successfully deleted note.");
});

