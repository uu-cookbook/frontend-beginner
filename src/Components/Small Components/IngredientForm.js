import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "bootstrap/dist/css/bootstrap.css";

//icons
import Icon from "@mdi/react";
import { mdiDeleteForever } from "@mdi/js";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// REACT MAGIC
import { useState } from "react";

//REACT SELECT (LIBRARY)
import CreatableSelect from "react-select/creatable";

// //Ingredien select content
let basticOptions = [
  { name: "Vejce", id: 1, unit: "ks" , approved: true},
  { name: "Mleko", id: 2, unit: "ml" , approved: true},
  { name: "Sul", id: 3, unit: "g" , approved: true},
];

function IngredientForm() {
    
    //
    // INGREDIENT FILE
    //

    const [Ingredients, setIngredient] = useState([]);
    const [SelectOptions, setSelectOptions] = useState(basticOptions)
    

    //CHANGE INGREDIENT NAME
    function changeIngredientName(componentId, e){
      const index = Ingredients.findIndex((obj) => obj.componentId === componentId);
      
      if (e === null) {
        Ingredients[index].id = NaN;
        Ingredients[index].unit = "...";
        console.log(Ingredients)
        return setIngredient([...Ingredients]);
      }

      setIngredient(() => {
        Ingredients[index].name = e.name;
        Ingredients[index].id = e.id;
        Ingredients[index].unit = e.unit;
        return ([...Ingredients])
      })
    }

    //CREATE OPTION
    function CreateOption(componentId, text){

      //const genIngredientID = crypto.randomUUID()
      const createdOption = { name: text , id: 0, unit: "none" , approved: false}
      setSelectOptions([...SelectOptions, createdOption])
      
      
      changeIngredientName(componentId, createdOption)
    }

    
    //
    // BUTONS
    //

    //ADD ROW
    function addIngredient() {
      const genID = crypto.randomUUID()
      setIngredient([...Ingredients, { componentId: genID, name: "", id: "", unit: "..."} ]);
    }

    //DELETE ROW
    function deleteIngredient(componentId){
      setIngredient([...Ingredients.filter((obj) => obj.componentId !== componentId)]);
    }

    //
    // AMOUNT FILE
    //

    function AmountUpdate(componentId, value) {
      setIngredient(() => {
        const index = Ingredients.findIndex((obj) => obj.componentId === componentId);
        Ingredients[index].amount = value;
        return [...Ingredients];
      });
      console.log(Ingredients)
    }


  return (
    <div>
    <Form.Label>Ingredients</Form.Label>
    
    {Ingredients.map((element) => {
        return (
          <Row className="mt-3 mb-3" key={element.componentId}>
            <Col>
            
              <CreatableSelect isClearable
                options={SelectOptions}
                onChange={(e)=>changeIngredientName(element.componentId,e)}
                onCreateOption={(text) => CreateOption(element.componentId, text)}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                Value={element.name}
              />
              
            </Col>

            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Enter quantity"
                  type="number"
                  onChange={(e)=>AmountUpdate(element.componentId,e.target.value)}
                  value={element.value}
                />

                <InputGroup.Text>{element.unit}</InputGroup.Text>
             
              </InputGroup>
            </Col>

            <Col className="col-md-auto">
              <DropdownButton
                variant="outline-secondary"
                title={
                  <span>
                    <Icon path={mdiDeleteForever} size={1} />
                  </span>
                }
                id="input-group-dropdown-2"
                align="end"
              >
                <Dropdown.Item onClick={() => deleteIngredient(element.componentId)}>
                  Delete Ingredient
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        );
      })}
    
    <div className="d-grid mt-3 mb-3">
        <Button variant="secondary" onClick={addIngredient}>
          + add {Ingredients.length>0 && "antother" } ingredient
        </Button>
      </div>

    </div>
    
)}

export default IngredientForm;