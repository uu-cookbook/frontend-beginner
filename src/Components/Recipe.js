import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
//import Badge from 'react-bootstrap/Badge'; //Category window
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Icon from "@mdi/react";
import ListGroup from 'react-bootstrap/ListGroup';
import { mdiClockTimeFourOutline, mdiAccountMultiple } from "@mdi/js";

//TODO
//Portions number
//Check portions and time
//Check and fix ingredient css (Form)
//Fix numbered list of steps

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
                            <ListGroup numbered key={element} className="mb-1">                            
                            
                                 <ListGroup.Item>{element}</ListGroup.Item>
                            
                            </ListGroup>
                        ))}
                        
                        {props.recipe.steps.map((element) => (
                            <div key={element} className="mb-1">                            
                            
                                 <ol><li>{element}</li></ol>
                            
                            </div>
                        ))}
                </Col>
                <Col>
                    <h2>Ingredients:</h2>
                        <Form>
                            {props.recipe.ingredients.map((element) => (
                            <div class="col" key={`ingredient-${element.name}`} className="mb-3">
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
                <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" aria-label=".form-control-sm example"></input>
            </Row>
        </Stack>
    </Row>
    

    
)
        
}
export default Recipe;











