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

function RecipieForm() {
  const [validated, setValidated] = useState(false);

  //Ingredient useState
  const [Ingredients, setIngredient] = useState([]);
  const [Stepts, addStep] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Name, setName] = useState("");
  const [Portions, setPortions] = useState(0);
  const [Preparation, setPreparation] = useState(0);
  const [Description, setDescription] = useState("");


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


    const payyy = {
      "name": "Vaječná pomazánka",
      "ingredients": [
        {
          "id": "Bh786kl4",
          "amount": 4
        },
        {
          "id": "sd38sGw4",
          "amount": 20
        }
      ],
      "portion": 3,
      "preparationTime": 15,
      "steps": [
        "Uvaříme vajíčka na tvrdo (10 min)",
        "Vajíčka oloupeme a rozmačkáme na menší kusy",
        "Přidáme pomazánkové máslo a všechno promícháme"
      ],
      "categoryId": [
        "T8nFk03YrTI7l384r"
      ]
    }


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
    const data = await res.json();

    if (res.status >= 400) {
      console.log({ state: "error", error: data });
    } else {
      console.log({ state: "success", data });
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
            <Form.Control type="file" required />
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

          <StepFrom Stepts={Stepts} addStep={addStep} />

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
