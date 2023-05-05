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
import CryingCat from "../PlaceholderImages/crying-cat.jpg";

export const Recipes = [
    {
        id: 1,
        name: "Vegetable Stir-Fry",
        description: "A quick and healthy dish made with a variety of vegetables and stir-fry sauce.",
        steps: 6,
        prepTime: 25,
        dateUploaded: new Date(2021, 7, 5),
        photo: VegetableStirFry,
        categories: [1, 2, 4],
        ingredients: [6],
        approved: true
    },
    {
        id: 2,
        name: "Grilled Cheese Sandwich",
        description: "A classic sandwich made with melted cheese and toasted bread.",
        steps: 3,
        prepTime: 10,
        dateUploaded: new Date(2021, 8, 15),
        photo: GrilledCheeseSandwich,
        categories: [4],
        ingredients: [7],
        approved: true
    },
    {
        id: 3,
        name: "Beef Stew",
        description: "A hearty and comforting stew made with tender beef, potatoes, and carrots.",
        steps: 9,
        prepTime: 120,
        dateUploaded: new Date(2021, 9, 28),
        photo: BeefStew,
        categories: [5],
        ingredients: [1, 6],
        approved: true
    },
    {
        id: 4,
        name: "Chicken Curry",
        description: "A spicy Indian dish made with chicken, vegetables, and curry spices.",
        steps: 8,
        prepTime: 45,
        dateUploaded: new Date(2021, 11, 3),
        photo: ChickenCurry,
        categories: [2, 5],
        ingredients: [6, 4, 9],
        approved: true
    },
    {
        id: 5,
        name: "Spaghetti Carbonara",
        description: "A classic Italian pasta dish with creamy sauce and bacon bits.",
        steps: 6,
        prepTime: 30,
        dateUploaded: new Date(2022, 0, 12),
        photo: SpaghettiCarbonara,
        categories: [2, 4, 5],
        ingredients: [3],
        approved: false
    },
    {
        id: 6,
        name: "Baked Salmon",
        description: "A healthy and flavorful way to prepare salmon fillets with herbs and lemon.",
        steps: 5,
        prepTime: 25,
        dateUploaded: new Date(2022, 1, 20),
        photo: BakedSalmon,
        categories: [2, 5],
        ingredients: [8],
        approved: true
    },
    {
        id: 7,
        name: "Pesto Pasta",
        description: "A simple and delicious pasta dish made with homemade pesto sauce.",
        steps: 4,
        prepTime: 20,
        dateUploaded: new Date(2022, 2, 8),
        photo: PestoPasta,
        categories: [1, 2, 4],
        ingredients: [7],
        approved: true
    },
    {
        id: 8,
        name: "Taco Salad",
        description: "A colorful and flavorful salad with ground beef, beans, and taco seasoning.",
        steps: 7,
        prepTime: 35,
        dateUploaded: new Date(2022, 3, 1),
        photo: TacoSalad,
        categories: [2, 4, 5],
        ingredients: [7],
        approved: false
    },
    {
        id: 9,
        name: "Oven-Baked Chicken",
        description: "A simple and tasty way to prepare chicken with herbs and spices.",
        steps: 4,
        prepTime: 35,
        dateUploaded: new Date(2022, 4, 12),
        photo: OvenBakedChicken,
        categories: [4, 5],
        ingredients: [9],
        approved: true
    },
    {
        id: 10,
        name: "Crying Cat",
        description: "Why she so sad :(",
        steps: 99,
        prepTime: 1,
        dateUploaded: new Date(2022, 4, 12),
        photo: CryingCat,
        categories: [4, 5],
        ingredients: [9],
        approved: false
      }
]