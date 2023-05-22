import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
//import Badge from 'react-bootstrap/Badge'; //Category window
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Icon from "@mdi/react";
import ListGroup from 'react-bootstrap/ListGroup';
import { mdiClockTimeFourOutline, mdiAccountMultiple } from "@mdi/js";
import { useState } from "react";

//TODO
//Portions number function
//Check portions and time
//Check and fix ingredient css (Form)
//Check numbered list of steps

//Category???
//Checkbox strike???

function Recipe(props) {
    let i = 1
    console.log(props)
    const [Value,setValue] = useState(props.recipe.portion)
    const [Multiplayer,setMultiplayer] = useState(1)
return(
    <Row>
        <Stack gap ={4}>
            <Row>
                <Col>
                    <Image src={`http://localhost:3010/image/get?image=${props.recipe.image}`} style={{width: "100%"}} rounded alt="Recipe Image" />
                </Col>
                <Col>
                    <h1>{props.recipe.name}</h1>
                    <div style={{paddingBottom: "28%", border: "1px solid white", overflow: "hidden"}}rows="6" cols="50">
                        {props.recipe.description}
                    </div>

                    <div style={{textAlign: "end"}}>
                        <Icon path={mdiAccountMultiple} size={1} />&nbsp;
                        <input class="input-number" type="number" value={Value} min = {props.recipe.portion} step={props.recipe.portion} onChange={(e)=>{setValue(e.target.value);setMultiplayer(e.target.value/props.recipe.portion)}}></input>&nbsp;&nbsp;&nbsp;&nbsp;
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
                            
                                 <ListGroup.Item>{i++ +". " +element + " "}</ListGroup.Item>
                            
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











