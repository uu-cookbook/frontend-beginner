import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import RecipeList from "../Components/RecipeList";

// PLACEHOLDER IMAGES
import SpaghettiCarbonara from "../PlaceholderImages/spaghetti-carbonara.jpg";
import ChickenCurry from "../PlaceholderImages/chicken-curry.jpg";
import BakedSalmon from "../PlaceholderImages/baked-salmon.jpg";
import BeefStew from "../PlaceholderImages/beef-stew.jpg";
import PestoPasta from "../PlaceholderImages/pesto-pasta.jpg";
import GrilledCheeseSandwich from "../PlaceholderImages/grilled-cheese-sandwich.jpg";
import TacoSalad from "../PlaceholderImages/taco-salad.jpg";
import VegetableStirFry from "../PlaceholderImages/vegetable-stir-fry.jpg";
import OvenBakedChicken from "../PlaceholderImages/oven-baked-chicken.jpg";

function Home() {
  const recipes = [
    {
      name: "Vegetable Stir-Fry",
      description: "A quick and healthy dish made with a variety of vegetables and stir-fry sauce.",
      steps: 6,
      prepTime: 25,
      dateUploaded: new Date(2021, 7, 5),
      photo: VegetableStirFry
    },
    {
      name: "Grilled Cheese Sandwich",
      description: "A classic sandwich made with melted cheese and toasted bread.",
      steps: 3,
      prepTime: 10,
      dateUploaded: new Date(2021, 8, 15),
      photo: GrilledCheeseSandwich
    },
    {
      name: "Beef Stew",
      description: "A hearty and comforting stew made with tender beef, potatoes, and carrots.",
      steps: 9,
      prepTime: 120,
      dateUploaded: new Date(2021, 9, 28),
      photo: BeefStew
    },
    {
      name: "Chicken Curry",
      description: "A spicy Indian dish made with chicken, vegetables, and curry spices.",
      steps: 8,
      prepTime: 45,
      dateUploaded: new Date(2021, 11, 3),
      photo: ChickenCurry
    },
    {
      name: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with creamy sauce and bacon bits.",
      steps: 6,
      prepTime: 30,
      dateUploaded: new Date(2022, 0, 12),
      photo: SpaghettiCarbonara
    },
    {
      name: "Baked Salmon",
      description: "A healthy and flavorful way to prepare salmon fillets with herbs and lemon.",
      steps: 5,
      prepTime: 25,
      dateUploaded: new Date(2022, 1, 20),
      photo: BakedSalmon
    },
    {
      name: "Pesto Pasta",
      description: "A simple and delicious pasta dish made with homemade pesto sauce.",
      steps: 4,
      prepTime: 20,
      dateUploaded: new Date(2022, 2, 8),
      photo: PestoPasta
    },
    {
      name: "Taco Salad",
      description: "A colorful and flavorful salad with ground beef, beans, and taco seasoning.",
      steps: 7,
      prepTime: 35,
      dateUploaded: new Date(2022, 3, 1),
      photo: TacoSalad
    },
    {
      name: "Oven-Baked Chicken",
      description: "A simple and tasty way to prepare chicken with herbs and spices.",
      steps: 4,
      prepTime: 35,
      dateUploaded: new Date(2022, 4, 12),
      photo: OvenBakedChicken
    }
  ];

  return (
    <div>
      <RecipeList recipes={recipes}/>
    </div>
  );
}

export default Home;
