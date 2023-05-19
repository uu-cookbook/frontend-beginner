import RecipeListFetch from "../Components/RecipeListFetch";

function Home() {
  return (
    <div>
      <RecipeListFetch validationMode={false} />
    </div>
  );
}

export default Home;
