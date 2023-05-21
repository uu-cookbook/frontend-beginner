import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge'; //Category window
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Icon from "@mdi/react";
import ListGroup from 'react-bootstrap/ListGroup';
import { mdiClockTimeFourOutline, mdiAccountMultiple } from "@mdi/js";

//TODO
//Portions number
//Check portions and time
//Check ingredient css (Form)

//Category???
//Checkbox strike???

function Recipe(props) {
return(
    <Row>
        <Stack gap ={4}>
            <Row>
                <Col>
                    <Image src={`http://localhost:3010/image/get?image=${props.recipe.image}`} style={{width: "100%"}} rounded alt="Recipe Image" />
                </Col>
                <Col>
                    <h1>{props.recipe.name}</h1>
                    <div style={{paddingBottom: "32%", border: "1px solid white"}}>
                        {props.recipe.description}
                    </div>

                    <div style={{textAlign: "end"}}><Icon path={mdiAccountMultiple} size={1} />{props.recipe.portion} <Icon path={mdiClockTimeFourOutline} size={1} /> {props.recipe.preparationTime} min</div>
                   
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Steps:</h2>
                        {props.recipe.steps.map((element) => (
                            <ListGroup numbered key={element.steps} className="mb-4">                            
                            
                                 <ListGroup.Item >{element.steps}</ListGroup.Item>
                                 <ListGroup.Item>{props.recipe.steps[0]}</ListGroup.Item>
                                 <ListGroup.Item>{props.recipe.steps[1]}</ListGroup.Item>
                            
                            </ListGroup>
                        ))}
                         <Stack gap={3}>
                            {}
                            <div class = "recipe-text">{/* number of step */} {props.recipe.steps}</div>
                            <div class = "recipe-text">{/* props.recipe.steps */}</div>
                        </Stack>
                </Col>
                <Col>
                    <h2>Ingredients:</h2>
                        <Form>
                            {props.recipe.ingredients.map((element) => (
                            <div key={`ingredient-${element.name}`} className="mb-3">
                                <Form.Check // prettier-ignore
                                    inline
                                    type={'checkbox'}
                                    label={`${element.name}`}
                                />
                                <Form.Text
                                    class="recipe-text"
                                    >
                                        {element.amount} {element.unit}
                                 </Form.Text>     
                            </div>
                            ))}
                        </Form>
                </Col>
            </Row>
        </Stack>
    </Row>
    

    
)
        
}
export default Recipe;











