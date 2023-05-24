import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import { mdiClockTimeFourOutline, mdiShoePrint } from "@mdi/js";
import ModalRecipe from "./ModalRecipe";

import NoImage from "../PlaceholderImages/no-image.jpg"
import { useState } from "react";
//import { Recipes } from "./RecipeData"; PLACEHOLDER_DATA

function RecipeCard({recipe, refresh}) {
    const [showRecipe, setShowRecipe] = useState(false);

    const handleClick = (e) => {
        console.log(`Card ${recipe.name} (${recipe.id}) clicked.`);
        // MODAL HERE
        setShowRecipe(true);
    }

    return (
        <div>
        <Card 
        className="recipe-card bg-dark text-white"
        style={recipe.approved ? {border:"0", cursor:"pointer"} : {border:"1px solid #cb444a", boxShadow:"0px 0px 0px 0.25rem #cb444a80", cursor:"pointer"}}
        onClick={handleClick}
        >
            <Card.Img style={{width: "100%", height: "100%", objectFit: "cover"}} src={recipe.image ? `http://localhost:3010/recipe_images/${recipe.image}` : NoImage} alt="Recipe image" className="recipe-card_inner-wrapper"/>
            <Card.ImgOverlay className="d-flex flex-column align-items-start recipe-img-overlay">
                <div style={{width: "100%"}}>
                    <Card.Text style={{textAlign: "right"}}><Icon path={mdiShoePrint} size={1} /> {recipe.steps.length} <Icon path={mdiClockTimeFourOutline} size={1} /> {recipe.preparationTime} min</Card.Text>
                </div>
                <div className="mt-auto">
                    <Card.Title >{recipe.name.length>30?`${recipe.name.slice(0,31)}...`:`${recipe.name}`}</Card.Title>
                    <Card.Text className="mt-auto d-sm-block">
                    {recipe.description.length>70?`${recipe.description.slice(0,71)}...`:`${recipe.description}`}
                    </Card.Text>
                </div>
            </Card.ImgOverlay>
        </Card>
        <ModalRecipe refresh={refresh} show={showRecipe} setShow={setShowRecipe} recipe={recipe}/>
        </div>
    );
}

export default RecipeCard;