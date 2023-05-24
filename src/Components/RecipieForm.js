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
import { useState, useEffect } from "react";

//SMALL COMPONENTS
import StepFrom from "./Small Components/StepForm";
import IngredientForm from "./Small Components/IngredientForm";

function RecipieForm(props) {
  const [validated, setValidated] = useState(false);

  // Data Fetching
  const [IngredientsFetch, setIngredientsFetch] = useState(null);
  const [CategoryFetch, setCategoryFetch] = useState(null);

  useEffect(() => {
    async function fetchData() {
      //ingredients
      const response = await fetch("http://localhost:3010/ingredient/list");
      const jsonData = await response.json();
      setIngredientsFetch(
        jsonData.filter((ingredient) => {
          return ingredient.approved === true;
        })
      );

      //Category
      const response2 = await fetch("http://localhost:3010/category/list");
      const jsonData2 = await response2.json();
      setCategoryFetch(jsonData2);
    }
    fetchData();
  }, []);

  //Ingredient useState
  const [Ingredients, setIngredient] = useState([]);
  const [Stepts, addStep] = useState([]);
  const [Category, setCategory] = useState([]);
  const [Name, setName] = useState("");
  const [Portions, setPortions] = useState(null);
  const [Preparation, setPreparation] = useState(null);
  const [Description, setDescription] = useState("");
  const [File, setFile] = useState(null);

  useEffect(() => {
    if (props.inputData) {
      let ingredints = [];
      console.log("ingredients", props.inputData.ingredients);

      props.inputData.ingredients.forEach((element) => {
        const genID = crypto.randomUUID();
        element.componentId = genID;
        ingredints.push(element);
      });
      console.log("ingredients outrput", ingredints);
      setIngredient(ingredints);

      let stepts = [];
      props.inputData.steps.forEach((element, index) => {
        let object = { componentId: index, content: element };
        stepts.push(object);
      });
      addStep(stepts);

      // let inputCategory = []
      // props.inputData.categoryId.forEach((element) => {
      //   inputCategory.push(CategoryFetch.find((finding)=>{return element === finding.id}))
      // })
      // setCategory(inputCategory)
      // console.log(inputCategory)

      setName(props.inputData.name);
      setPortions(props.inputData.portion);
      setPreparation(props.inputData.preparationTime);
      setDescription(props.inputData.description);
    }
  }, [props.inputData]);

  if (
    !(
      Ingredients.length === 0 &&
      Category.length === 0 &&
      Name === "" &&
      Portions === null &&
      Preparation === null &&
      Description === "" &&
      File === null
    )
  ) {
    props.setFormEddited(true);
  } else {
    props.setFormEddited(false);
  }

const HandleSubmit = async (event) => {
  const form = event.currentTarget;

  event.preventDefault();
  event.stopPropagation();

    //Is all form control fill?
    props.setbuttonIsLoading(true);
    if (!form.checkValidity()) {
      setValidated(true);
      props.setbuttonIsLoading(false);
      return;
    }

    //Creating new ingredients (made by user)
    let payloadIngredients = [];
    for (const element of Ingredients) {
      if (element.approved === false) {
        let Ingredientpayload = {
          name: element.name,
          unit: element.unit,
        };
        try {
          const response = await fetch(
            `http://localhost:3010/ingredient/create`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(Ingredientpayload),
            }
          );

          if (response.ok) {
            const jsonData = await response.json();
            payloadIngredients.push({
              id: jsonData.id,
              amount: element.amount,
            });
            continue;
          } else {
            console.error("Failed to create new ingredient");
          }
        } catch (error) {
          console.error("Error:", error);
          props.setbuttonIsLoading(false);
          return;
        }
        payloadIngredients.push({ id: element.id, amount: element.amount });
      }
      payloadIngredients.push({ id: element.id, amount: element.amount });
    }

    //Change name/unit on unaproved ingredients (EDITmode)
    if (props.edditMode) {
      const unaproved = Ingredients.filter(
        (element) => element.approved === false
      );

      try {
        const response = await fetch(
          `http://localhost:3010/ingredient/update-list`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(unaproved),
          }
        );

        if (response.ok) {
          const jsonData = await response.json();
          console.log("Response", jsonData);
        } else {
          console.error("Failed to edit unaproved ingredients");
        }
      } catch (error) {
        console.error("Error:", error);
        return;
      }
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
      description: Description,
      ingredients: payloadIngredients,
      portion: Portions,
      preparationTime: Preparation,
      steps: payloadStepts,
      categoryId: payloadCategory,
    };

    //Update recipie (EDITmode)
    if (props.edditMode) {
    try {
      payload.id = props.inputData.id;
      
      const res = await fetch(`http://localhost:3010/recipe/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      if(res.ok){
        console.log("eddit ok")
        props.refresh()
      }
      else{
        console.error('Failed to update recipie');
      }
    } catch (error) {
      console.error('Error:', error);
      props.setbuttonIsLoading(false);
      return
    }

    //Update image (EDITmode)
      try {
        const apiData = new FormData();
        apiData.append("id", props.inputData.id);
        apiData.append("file", File[0]);
  
        const img = await fetch(`http://localhost:3010/image/update`, {
          method: "POST",
          body: apiData,
        });
  
        if (img.ok) {
          // File upload successful
          console.log("File uploaded successfully");
          props.refresh()
          props.setbuttonIsLoading(false);
          props.setShow(false); //close modal
        } else {
          // Handle error response
          console.error("File upload failed");
          console.log(img);
          props.setbuttonIsLoading(false);
          return;
        }
      } catch (error) {
        // Handle network or other errors
        console.error("Error occurred while uploading the file", error);
        props.setbuttonIsLoading(false);
        props.setShow(false)
        return
      }
    }


  console.log("data",payload)
  const res = await fetch(`http://localhost:3010/recipe/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let data = null
    if(res.ok){
    data = await res.json();
    }else{
     console.error('Failed to create recipie',res);
     props.setbuttonIsLoading(false);
     return;
    }

    //Create Image (Postmode)
    try {
      const apiData = new FormData();
      apiData.append("id", data.id);
      apiData.append("file", File[0]);

      const img = await fetch(`http://localhost:3010/image/create`, {
        method: "POST",
        body: apiData,
      });

      if (img.ok) {
        // File upload successful
        console.log("File uploaded successfully");
      } else {
        // Handle error response
        console.error("File upload failed");
        console.log(img);
        props.setbuttonIsLoading(false);
        return;
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error occurred while uploading the file", error);
      props.setbuttonIsLoading(false);
      return;
    }

    if (res.status >= 400) {
      console.log({ state: "error", error: data });
    } else {
      console.log({ state: "success", data });
      props.setShow(false); //close modal
      
      if(props.edditMode===true){
        props.refresh()
      }
      props.setbuttonIsLoading(false);
      props.setAlertShow(true);
    }
  };

  //function HandleSubmit(e) {
  //  e.preventDefault();
  //  console.log("HELOO");
  //}

  return (
    <Form id="my-form" noValidate validated={validated} onSubmit={HandleSubmit}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control
              placeholder="Enter recipe name"
              onChange={(e) => setName(e.target.value)}
              value={Name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" required>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Enter a brief description of recipe"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={Description}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Recipe Image</Form.Label>
            <Form.Control
              onChange={(e) => {
                setFile(e.target.files);
                console.log("filee upload", e.target.files);
              }}
              id="formFile"
              type="file"
              accept=".jpg,.png"
              required={!props.edditMode}
            />
          </Form.Group>

          <div className="d-grid mt-3 mb-3">
            <Row>
              <Col>
                <Form.Label>Portions</Form.Label>
                <InputGroup>
                  <Form.Control
                    placeholder="number"
                    onChange={(e) => setPortions(Number(e.target.value))}
                    min="1"
                    required
                    type="number"
                    value={Portions}
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
                    min="1"
                    onChange={(e) => setPreparation(Number(e.target.value))}
                    type="number"
                    value={Preparation}
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
            setCategory={setCategory}
            IngredientsFetch={IngredientsFetch}
            CategoryFetch={CategoryFetch}
            setIngredientsFetch={setIngredientsFetch}
            Category={Category}
            edditMode={props.edditMode}
          />
        </Col>
      </Row>
    </Form>
  );
}

export default RecipieForm;
