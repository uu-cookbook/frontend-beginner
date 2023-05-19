import RecipeList from "../Components/RecipeList";
import useFetch from "../useFetch";
import { Container } from "react-bootstrap";

function RecipeListFetch({listName, validationMode}) {
  const [recipes, recipesPending, recipesError] = useFetch('http://localhost:3010/recipe/list');
  const [ingredients, ingredientsPending, ingredientsError] = useFetch('http://localhost:3010/ingredient/list');
  const [categories, categoriesPending, categoriesError] = useFetch('http://localhost:3010/category/list');

  let errorFetchingData = false;

  if (recipesError || ingredientsError || categoriesError) {
    errorFetchingData = true;
  }

  return (
    <div>
      {recipesPending && ingredientsPending && categoriesPending && <div className="dots"></div>}
      {errorFetchingData && <Container>
        <h2 style={{color: "gray", textAlign: "center"}}>Failed to fetch data.</h2>
        {recipesError && <p style={{color: "gray", textAlign: "center"}}>Recipes: {recipesError}</p>}
        {ingredientsError && <p style={{color: "gray", textAlign: "center"}}>Ingredients: {ingredientsError}</p>}
        {categoriesError && <p style={{color: "gray", textAlign: "center"}}>Categories: {ingredientsError}</p>}
      </Container>}
      {recipes && ingredients && categories && <RecipeList
        ingredients={ingredients.filter(ingredient => {
          if (validationMode) {
            return true;
          }
          else {
            return ingredient.approved === true;
          }
        })}
        recipes={recipes.filter(recipe => {
          return recipe.approved !== validationMode;
        })}
        categories={categories}
        listName={listName}
        />}
    </div>
  );
}

export default RecipeListFetch;