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
import { useState } from "react";

//SMALL COMPONENTS
import StepFrom from "./Small Components/StepForm";
import IngredientForm from "./Small Components/IngredientForm";

function RecipieForm(props) {
  const [validated, setValidated] = useState(false);


  //Ingredient useState
  const [Ingredients, setIngredient] = useState([]);
  const [Stepts, addStep] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Name, setName] = useState("");
  const [Portions, setPortions] = useState(0);
  const [Preparation, setPreparation] = useState(0);
  const [Description, setDescription] = useState("");

  if(!(Ingredients.length === 0 && Stepts.length === 0 && Category.length === 0 && Name==="" && Portions===0 && Preparation===0 && Description==="")){
  props.setFormEddited(true)
  }else{
  props.setFormEddited(false)
  }

  const HandleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    console.log("Ingredients",Ingredients)
    let payloadIngredients = [];
    for (const element of Ingredients ){
        
        if(element.id === 0){
        
        let Ingredientpayload = {
          name: element.name,
          unit: element.unit
        }

        const response = await fetch(`http://localhost:3010/ingredient/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",},
        body: JSON.stringify(Ingredientpayload),})
        
        const jsonData = await response.json();
        console.log(jsonData);
        

        payloadIngredients.push({ id: jsonData.id, amount: element.amount });
        continue
        }

        payloadIngredients.push({ id: element.id, amount: element.amount });
    }

    let payloadStepts = [];
    Stepts.forEach((element) => {
      payloadStepts.push(element.content);
    });

    let payloadCategory = [];
    Category.forEach((element) => {
      payloadCategory.push(element.id);
    });

    const payload = {
      name: Name,
      ingredients: payloadIngredients,
      portion: Portions,
      preparationTime: Preparation,
      steps: payloadStepts,
      categoryId: payloadCategory,
    };

    //description: Description,

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

  const res = await fetch(`http://localhost:3010/recipe/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
  var x = document.getElementById("formFile");
  
  const data = await res.json();
  console.log("data",data)
    
  const apiData = new FormData();
  apiData.append("id", "5406dcdd0c8329b7");
  apiData.append("data", x.files[0]);

  const img = await fetch(`http://localhost:3010/recipe/update_image`, {
      method: "POST",
      body: apiData,
    });
    const dataImg = await img.json();
  console.log("Imageeeee Mesage",dataImg)

    if (res.status >= 400) {
      console.log({ state: "error", error: data });
    } else {
      console.log({ state: "success", data });
      props.setShow(false) //close modal
      props.setAlertShow(true)
    }
  }
  

  //function HandleSubmit(e) {
  //  e.preventDefault();
  //  console.log("HELOO");
  //}

  return (
    <Form id="my-form" noValidate validated={validated} onSubmit={HandleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Recipie Name</Form.Label>
            <Form.Control
              placeholder="Enter recipie name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
            required
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter a brief description of recipie"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Recipie Image</Form.Label>
            <Form.Control onChange={(e) => {
                  console.log("formTarget",e.target)}}

            id="formFile" type="file" required />
          </Form.Group>

          <div className="d-grid mt-3 mb-3">
            <Row>
              <Col>
                <Form.Label>Portions</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="number"
                    onChange={(e) => setPortions(Number(e.target.value))}
                    required
                    type="number"
                  />
                  <InputGroup.Text>servings</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col>
                <Form.Label>Preperation time</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    placeholder="number"
                    onChange={(e) => setPreparation(Number(e.target.value))}
                    type="number"
                  />
                  <InputGroup.Text>min</InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
          </div>

          <StepFrom validation={validated} Stepts={Stepts} addStep={addStep} />

          <div className="d-grid mt-3 mb-3"></div>
        </Col>
        <Col>
          <IngredientForm
            validation={validated}
            Ingredients={Ingredients}
            setIngredient={setIngredient}
            Category={Category}
            setCategory={setCategory}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default RecipieForm;
