import React, { useState, useEffect } from "react";
import "./App.css";
import Recipe from "./Recipe";

const App = () => {
   const APP_ID = "6d6a83db";
   const APP_KEY = "2301e231e5cf4dc8ba58fb8966ba46d3";

   const [recipes, setRecipes] = useState([]);
   const [search, setSearch] = useState("");
   const [query, setQuery] = useState("chicken");

   useEffect(() => {
      getRecipes();
   }, [query]);

   const getRecipes = async () => {
      const response = await fetch(
         `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      // console.log(data.hits);
   };

   const updateSearch = e => {
      setSearch(e.target.value);
   };

   const getSearch = e => {
      e.preventDefault();
      setQuery(search);
      setSearch("");
   };

   return (
      <div className="App">
         <form onSubmit={getSearch} className="search-form">
            <input
               className="search-bar"
               placeholder="Search a recipe..."
               type="text"
               value={search}
               onChange={updateSearch}
            />
            <button className="search-button" type="submit">
               search
            </button>
         </form>

         <div className="recipes">
            {recipes.map(recipe => (
               <Recipe
                  key={recipe.recipe.label}
                  title={recipe.recipe.label}
                  image={recipe.recipe.image}
                  calories={recipe.recipe.calories}
                  ingredients={recipe.recipe.ingredients}
               />
            ))}
         </div>
      </div>
   );
};

export default App;
