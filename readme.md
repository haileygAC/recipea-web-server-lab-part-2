# Recipea CRUD Lab

### Introduction

In this lab, you will be building a recipe CRUD app using Express as a web server and a local JSON file as a back end.

This lab picks up right from where the [previous lab](https://github.com/AnnieCannons/recipea-web-server-lab) left off.

### Learning Objectives

Students should get **hands-on experience** with:

- Using Express.js's `req.body` to work with the request body.
- Using Node's `fs` module to read and write to a file
- Using `JSON.parse` and `JSON.stringify` to convert between JSON and JavaScript objects

Students should start **internalizing the concepts** of:

- URL "end points" as a shortcut for a resource
- the different parts of a an HTTP request, like the request URL and the request body
- sending HTTP responses

### Setup For This Lab

Follow the below steps and you'll be ready to get going on the lab!

1. Get the repository on your computer, however your instructor recommends.
2. In the terminal, navigate into the lab's root directory. Be sure you're not in any sub-directory—you want to be in `recipea-web-server-lab-part-2`.
3. Still in the terminal, run `npm install` to install all the dependencies listed in `package.json`. This will get you the Express framework.
4. Navigate into the `src` directory with `cd`.
5. Still in the terminal, run `node [file name]`, with file name (and the square brackets) replaced by the file you want to use as your starting point. (See the below "Starting Point" section.)

Alternate version of #5: run `node --watch [file name]`. This will restart the server any time you make a change to the file.

### General Lab Workflow

1. Add the next required feature of your assignment. Example: the ability of your web server to handle a request to read all notes.
2. Re-run your `node` command to restart the web server with your changes (you can skip this if you're using `node --watch`) You can quit your current `node` command (or any long-running command in the terminal) using **Control-c**.
3. Using Postman, test the URL of the feature you're working on to see if it works.
   - Make sure you're adding any necessary data to the request body.
   - Make sure you're using "http" and not "https" in your URL.
4. Repeat 1-3 until your feature is working.
5. Repeat 1-4 until you're done with the assignment.

### Starting Point

Look through the directory at all the files and make sure you understand their purpose. Ask questions if the below summary isn't clear!

- `data/recipea-data.json` has some recipes to start you with.
- `data/backup-recipea-data.json` has backups of the recipes, so that if you delete all the recipes during testing, you can copy them back over manually. **NOTE**: do not change the backup file itself, or you'll have to re-download it.
- The `src` directory has 3 different files you could use as your starting point, each a different solution to the [previous lab](https://github.com/AnnieCannons/recipea-web-server-lab).
- The `package.json` and `package-lock.json` files (and, if you've already run the setup above, the `node_modules` directory) are how `npm` manages the libraries this assignment needs to function. **There is no need to manually change these files**. However, getting familiar with `package.json` is a _great_ idea.

### Data Shape

The data in `recipea-data.json` is an array of recipes. Each recipe is an object with the following properties:

- `name` - the name of the recipe
- `cookingMethod` - the cooking method of the recipe
- `ingredients` - an array of ingredients

Check out the data in `data/recipea-data.json` to see what that looks like.

**There is also a backup of this file**. You will find it in `data/backup-recipea-data.json`. This is because it is very easy to write code that deletes or mangles your data. Always have a backup!

### Specifications For This Lab

If you successfully implement all the following features, you will have a fully functional web server and be done with this lab.

#### Create a New Recipe

When the app receives an HTTP request to create a new recipe, it adds that recipe to the data file and returns an HTTP message indicating it's done so.

##### Example Request URL

`http://localhost:3000/new-recipe`

##### Example Request Body

```json
{
  "name": "Cranberry Sauce",
  "cookingMethod": "stove-top boil",
  "ingredients": ["cranberries", "sugar", "water"]
}
```
_
##### Example Response

You can decide how to indicate that the recipe has been created. One method is to simply send back a string with a message that it's been created. Another, more common method is to send back the data that was created.

**Feel free to copy the backup file's contents back to the `/data/recipea-data.json` file** after testing this feature!

#### Update a Recipe

When the app receives an HTTP request to update a recipe, it updates that recipe in the data file and returns an HTTP message indicating it's done so.

##### Example Request URL

`http://localhost:3000/change-recipe/1`

##### Example Request Body

```json
{
  "name": "Spaghetti with Red Sauce - Chilean Style",
  "cookingMethod": "stove-top boil",
  "ingredients": [
    "spaghetti",
    "tomato sauce",
    "onions",
    "garlic",
    "red pepper flakes"
  ]
}
```

##### Example Response

You can decide how to indicate that the recipe has been updated. One method is to simply send back a string with a message that it's been updated. Another, more common method is to send back the data that was updated.

**Feel free to copy the backup file's contents back to the `/data/recipea-data.json` file** after testing this feature!

### Resources

- [The Postman documentation](https://learning.postman.com/docs/getting-started/introduction/) - These docs are very helpful if you're having trouble figuring out how to use Postman.
- [The slides](https://www.canva.com/design/DAF0VWMfkF0/pk26na-gT26RMBbqVSORfQ/edit) - These slides have a lot of information about how to use Postman, and how to think about HTTP requests and responses.
- Your instructor may have other resources to share with you, such as the solution to the codealong.

### Tips, Tricks, and Hints

- You can use `JSON.parse` to convert a JSON string into a JavaScript object or array, and `JSON.stringify` to convert a JavaScript object or array into a JSON string. Remember that data is **sent** and **received** over HTTP as a JSON string, but it's _much_ simpler to use JavaScript's object and array manipulation ability than to try to manipulate the data as a string.
- You will need to use `fs.readFile` and `fs.writeFile` to read and write to the data file. You will sometimes need to use both, one after the other, to read what's in the file, modify it in some way, and write back to the data file. See deleting a recipe in your starting point for an example of this.
- You will need to think about whether the information being sent from the client (yourself using Postman, in this case) is part of the request body (in which case it will be on `req.body`) or part of the request URL (in which case it will be on `req.params`).
