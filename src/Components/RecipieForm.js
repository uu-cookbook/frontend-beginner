import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
//import Dropdown from "react-bootstrap/Dropdown";
//import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


//CSS
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

//REACT MAGIC

//REACT SELECT (LIBRARY)
import Select from "react-select"

//SMALL COMPONENTS
import StepFrom from "./Small Components/StepForm";
import IngredientForm from "./Small Components/IngredientForm";

function RecipieForm() {
  

  //Tag select content
  const CategoryOptions = [
    { value: 4, label: "Cheap", color: "#36B37E" },
    { value: 1, label: "Vegan", color: "#00875A" },
    { value: 2, label: "Healthy", color: "#253858" },
    { value: 3, label: "Sweet", color: "#666666" },
  ];


  function HandleSubmit(e) {
    e.preventDefault();
    console.log("HELOO");
  }

  const customStyles = {
    control: (base, state) => ({
        //border: "1px solid #ced4da",
        borderRadius: ".375rem",
        display: 'flex',

        //color: "#212529",
        //borderColor: "#86b7fe",
        outline: 0,
        
        backgroundColor: state.isSelected ? "blue" : "#fff",
        boxShadow: state.isFocused ? "0px 0px 0px 0.25rem #0d6efd40" : "none",
        border: state.isFocused ? "1px solid #86b7fe" : "1px solid #ced4da" ,
        transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
      }),
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
              styles={customStyles}
            />
          </Form.Group>

          <StepFrom />

          <div className="d-grid mt-3 mb-3">
            
          </div>
        </Col>
        <Col>
        
        <IngredientForm />
          
        </Col>
      </Row>
    </Form>
  );
}

export default RecipieForm;
