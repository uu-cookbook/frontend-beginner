import RecipeListFetch from "../Components/RecipeListFetch";

function Validation() {
  return (
    <div>
      <RecipeListFetch listName={"Recipes waiting for validation"} validationMode={true} />
    </div>
  );
}

export default Validation;
