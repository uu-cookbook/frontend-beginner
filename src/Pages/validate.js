import RecipeList from "../Components/RecipeList";
import { Recipes } from "../Components/RecipeData";

function Validation() {
  return (
    <div>
      <RecipeList listName={"Recipes waiting for validation"} recipes={Recipes.filter(recipe => {
        return recipe.approved === false;
      })}/>
    </div>
  );
}

export default Validation;
