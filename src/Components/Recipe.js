import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge'; //Category window
import Stack from 'react-bootstrap/Stack';
import Icon from "@mdi/react";
import { mdiClockTimeFourOutline, mdiAccountMultiple } from "@mdi/js";

//PLACEHOLDER
import chickenCurry from "../PlaceholderImages/chicken-curry.jpg"
import { Recipes } from "./RecipeData";
import { mdiReceiptTextMinus } from '@mdi/js';
let recipeImage = chickenCurry;
let recipeSteps = ["This delicious chicken curry recipe is full of flavor and perfect for a weeknight dinner. Heat 2 tablespoons of oil in a large pan and add 1 large diced onion and 3 minced garlic cloves. Cook for 5 minutes before adding 1 tablespoon of curry powder, 1 teaspoon of cumin and 1 teaspoon of turmeric. Cook for 2 minutes before adding 1 pound of diced chicken breast. Brown the chicken and add 1 can of coconut milk and 1 cup of chicken broth. Let the curry simmer until the sauce thickens. Serve over rice, garnish with cilantro and enjoy!"];

function Recipe(props) {
console.log(props.recipe)
return(
    <Row>
        <Stack gap ={4}>
            <Row>
                <Col>
                    <Image src={recipeImage} style={{width: "100%"}} rounded alt="Recipe Image" />
                </Col>
                <Col>
                    <h1>{props.recipe.name}</h1>
                    <div>
                        {props.recipe.description}
                        <div style={{width: "100%"}}>
                            <div style={{textAlign: "end"}}><Icon path={mdiAccountMultiple} size={1} /> {props.recipe.portion} <Icon path={mdiClockTimeFourOutline} size={1} /> {props.recipe.preparationTime} min</div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Steps:</h2>
                         <Stack gap={3}>
                            <div class = "recipe-text">{/* number of step */} {props.recipe.steps}</div>
                            <div class = "recipe-text">{/* props.recipe.steps */}</div>
                        </Stack>
                </Col>
                <Col>
                    <h2>Ingredients:</h2>
                    <div>   
                        <Stack>
                            <Row>
                                <Col>
                                    <div class = "recipe-text">{/* list */} {/* props.recipe.ingrediens[] */}</div>
                                </Col>
                                <Col>
                                    <div class = "recipe-text">{/* props.recipe.ingrediens.amound */} ml</div> 
                                </Col>
                            </Row>
                        </Stack>
                    </div>
                </Col>
            </Row>
        </Stack>
    </Row>
    

    
)
        
}
export default Recipe;








