import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge'; //Category window
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Icon from "@mdi/react";
import { mdiClockTimeFourOutline, mdiAccountMultiple } from "@mdi/js";


function Recipe(props) {
console.log(props.recipe.ingredients[0].amount)
console.log(props.recipe.image)
return(
    <Row>
        <Stack gap ={4}>
            <Row>
                <Col>
                    <Image src={`http://localhost:3010/image/get?image=${props.recipe.image}`} style={{width: "100%"}} rounded alt="Recipe Image" />
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
                                    <Form>
                                    {[`${props.recipe.ingredients[0].id}`].map((name) => (
                                        <div key={`ingredient-${name}`} className="mb-3">
                                        <Form.Check // prettier-ignore
                                            type={'checkbox'}
                                            label={name}
                                        />
                                        </div>
                                    ))}
                                    </Form>
                                </Col>
                                <Col>
                                    <div class = "recipe-text" style={{textAlign: "end"}}>{props.recipe.ingredients[0].amount} {/* props.recipe.ingredients[0].id[]. */"unit"}</div> 
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











