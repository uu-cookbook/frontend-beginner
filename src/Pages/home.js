import RecipeList from "../Components/RecipeList";
import { Recipes } from "../Components/RecipeData";

function Home() {
  return (
    <div>
      <RecipeList recipes={Recipes.filter(recipe => {
        return recipe.approved === true;
      })}/>
    </div>
  );
}

export default Home;
