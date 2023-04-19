import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
//import Dropdown from "react-bootstrap/Dropdown";
//import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


//CSS
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

//REACT MAGIC
import { useState } from "react";
//import { useId } from 'react';

//REACT SELECT (LIBRARY)
import CreatableSelect from "react-select/creatable";
import Select from "react-select"

//SMALL COMPONENTS
import StepFrom from "./Small Components/StepForm";

function RecipieForm() {
  


  //Ingredien select content
  const SelectOptions = [
    { name: "Vejce", id: 1, unit: "ks" },
    { name: "Mleko", id: 2, unit: "ml" },
    { name: "Sul", id: 3, unit: "g" },
  ];

  //Tag select content
  const CategoryOptions = [
    { value: 4, label: "Cheap", color: "#36B37E" },
    { value: 1, label: "Vegan", color: "#00875A" },
    { value: 2, label: "Healthy", color: "#253858" },
    { value: 3, label: "Sweet", color: "#666666" },
  ];

  //Ingredient Select

  function IngredientUpdate(formId, e) {
    if (e === null) {
      return setIngredient([]);
    }

    setIngredient((ArrayOfObjects) => {
      const index = ArrayOfObjects.findIndex((obj) => obj.formId === formId);
      ArrayOfObjects[index].id = e.id;
      ArrayOfObjects[index].unit = e.unit;
      console.log(ArrayOfObjects);
      return ArrayOfObjects;
    });
  }

  //FORM VALUES
  const [Ingredients, setIngredient] = useState([
    { formId: 1, id: 0, unit: "", howMutch: 30 },
    { formId: 2, id: 3, unit: "", howMutch: 20 },
  ]);

  function HandleSubmit(e) {
    e.preventDefault();
    console.log("HELOO");
  }

  return (
    <Form id="my-form" onSubmit={HandleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Recipie Name</Form.Label>
            <Form.Control placeholder="Enter recipie name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter a brief description of recipie"
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Recipie Image</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <div className="d-grid mt-3 mb-3">
            <Row>
              <Col>
                <Form.Label>Portions</Form.Label>
                <InputGroup>
                  <Form.Control placeholder="number" />
                  <InputGroup.Text>servings</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col>
                <Form.Label>Preperation time</Form.Label>
                <InputGroup>
                  <Form.Control aria-label="Last name" placeholder="number" />
                  <InputGroup.Text>min</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
          </div>

          <Form.Group className="d-grid mt-3 mb-3">
            <Form.Label>Category</Form.Label>
            <Select
              isMulti
              name="category"
              options={CategoryOptions}
              className="basic-multi-select"
              classNamePrefix="Select recipie category"
            />
          </Form.Group>

          <StepFrom />

          <div className="d-grid mt-3 mb-3">
            
          </div>
        </Col>
        <Col>
          <Form.Label>Ingredients</Form.Label>

          {Ingredients.map((element) => {
            return (
              <InputGroup className="mb-3">
                <CreatableSelect
                  isClearable
                  options={SelectOptions}
                  placeholder="Enter ingredien"
                  onChange={(e) => IngredientUpdate(element.formId, e)}
                  onCreateOption={() => 0}
                  getOptionLabel={(option) => option.name}
                  getOptionValue={(option) => option.id}
                />
                <Form.Control
                  aria-label="Last name"
                  placeholder="Enter quantity"
                  type="number"
                  min="1"
                />
                <InputGroup.Text>{element.unit}</InputGroup.Text>
              </InputGroup>
            );
          })}

          <InputGroup className="mb-3">
            <CreatableSelect
              isClearable
              options={SelectOptions}
              placeholder="Enter ingredien"
              onChange={() => IngredientUpdate()}
              onCreateOption={() => "handleCreateIngredient"}
            />
            <Form.Control
              aria-label="Last name"
              placeholder="Enter quantity"
              type="number"
              min="1"
            />
            <InputGroup.Text>ml</InputGroup.Text>
          </InputGroup>
          <div className="d-grid mt-3 mb-3">
            <Button variant="secondary">+ add antother ingredient</Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default RecipieForm;
