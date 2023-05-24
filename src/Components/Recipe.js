import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge'; //Category window
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Icon from "@mdi/react";
import ListGroup from 'react-bootstrap/ListGroup';
import { mdiClockTimeFourOutline, mdiAccountMultiple } from "@mdi/js";
import { useState } from "react";
import NoImage from "../PlaceholderImages/no-image.jpg";
import { Tab } from 'react-bootstrap';

//TODO
//Portions number function
//Check portions and time
//Check and fix ingredient css (Form)
//Check numbered list of steps

//Category???
//Checkbox strike???

function Recipe(props) {
    let stepNum = 1
    console.log(props)
    const [Value,setValue] = useState(props.recipe.portion)
    const [Multiplayer,setMultiplayer] = useState(1)
return(
    <Row>
        <Stack gap ={4}>
            <Row>
                <Col>
                    <Image src={props.recipe.image ? `http://localhost:3010/recipe_images/${props.recipe.image}` : NoImage} style={{width: "100%",  width: "100%", height: "305px", objectFit: "cover"}} rounded alt="Recipe Image" />
                    <Row inline >{props.recipe./* category */categoryId.map((element) => (
                        <Col> <div style={{color: "white", fontWeight:"blod",textTransform: "uppercase", fontSize: "12px",backgroundColor: "green", border: "3px solid white",whiteSpace: "nowrap", borderRadius: "6px", padding: "1px 9px 2px 9px"}} /* {element.color} */>{element/* .name */}</div></Col>
                        //<Badge bg="secondary">{element/* .name */}</Badge>
                    ))}</Row>
                </Col>
                <Col>
                    <h1>{props.recipe.name}</h1>
                    <div style={{blockSize: "200px", border: "1px solid white", overflow: "auto"}}rows="6" cols="50">
                        {props.recipe.description}
                    </div>

                    <div style={{textAlign: "end"}}>
                        <Icon path={mdiAccountMultiple} size={1} />&nbsp;
                        <input class="input-number" onKeyDown={e => e.preventDefault()} style={Value>100?{width: String( String(String(Value).length*20)+"px") }:null}
                        
                        type="number" value={Value} min = {props.recipe.portion} step={props.recipe.portion} onChange={(e)=>{setValue(e.target.value);setMultiplayer(e.target.value/props.recipe.portion)}}></input>&nbsp;&nbsp;&nbsp;&nbsp;
                        <Icon path={mdiClockTimeFourOutline} size={1} />&nbsp;
                        {props.recipe.preparationTime}&nbsp; min&nbsp;&nbsp;
                        <hr></hr>
                    </div>
                   
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Steps:</h2>
                        {props.recipe.steps.map((element) => (
                            <ListGroup key={element} className="mb-1">                            
                            
                                 <ListGroup.Item>{stepNum++ +". " +element + " "}</ListGroup.Item>
                            
                            </ListGroup>
                        ))}
                </Col>
                <Col>
                    <h2>Ingredients:</h2>
                        <Form>
                            {props.recipe.ingredients.map((element) => (
                            <div class="col" key={`ingredient-${element.name}`} className="mb-3" style={element.approved===false?{backgroundColor: "#e5425540"}:null}>
                                <Form.Check // prettier-ignore
                                    inline
                                    type={'checkbox'}
                                    label={`${element.name}`}
                                />
                                <Form.Text>
                                    {element.amount*Multiplayer} {element.unit}
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











