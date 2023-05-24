import RecipeList from "../Components/RecipeList";
import useFetch from "../useFetch";
import { Button, Container } from "react-bootstrap";

function RecipeListFetch({listName, validationMode}) {
  const [recipes, recipesPending, recipesError, recipesRefresh] = useFetch('http://localhost:3010/recipe/list');
  const [ingredients, ingredientsPending, ingredientsError, ingredientsRefresh] = useFetch('http://localhost:3010/ingredient/list');
  const [categories, categoriesPending, categoriesError, categoriesRefresh] = useFetch('http://localhost:3010/category/list');

  const refreshData = () => {
    recipesRefresh();
    ingredientsRefresh();
    categoriesRefresh();
    console.log("Oi")
  };

  let pendingFetchingData = false;
  let errorFetchingData = false;

  if (recipesPending || ingredientsPending || categoriesPending) {
    pendingFetchingData = true;
  }

  if (recipesError || ingredientsError || categoriesError) {
    errorFetchingData = true;
  }

  return (
    <div>
      {/*<Button onClick={refreshData}>Refresh bracho</Button>*/}

      {pendingFetchingData && <div className="dots"></div>}

      {errorFetchingData && <Container>
        <h2 style={{color: "gray", textAlign: "center"}}>Failed to fetch data.</h2>
        {recipesError && <p style={{color: "gray", textAlign: "center"}}>Recipes: {recipesError}</p>}
        {ingredientsError && <p style={{color: "gray", textAlign: "center"}}>Ingredients: {ingredientsError}</p>}
        {categoriesError && <p style={{color: "gray", textAlign: "center"}}>Categories: {ingredientsError}</p>}
      </Container>}
      
      {!pendingFetchingData && !errorFetchingData && recipes && ingredients && categories && <RecipeList
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
        refresh={refreshData}
        />}
    </div>
  );
}

export default RecipeListFetch;