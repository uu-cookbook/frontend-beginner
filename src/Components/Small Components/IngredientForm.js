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

//REACT SELECT (LIBRARY)
import Select from "react-select";

//REACT SELECT (LIBRARY)
import CreatableSelect from "react-select/creatable";

const customStyles = {
  control: (base, state) => ({
    //border: "1px solid #ced4da",
    borderRadius: ".375rem",
    display: "flex",

    //color: "#212529",
    //borderColor: "#86b7fe",
    outline: 0,

    backgroundColor: state.isSelected ? "blue" : "#fff",
    boxShadow: state.isFocused ? "0px 0px 0px 0.25rem #0d6efd40" : "none",
    border: state.isFocused ? "1px solid #86b7fe" : "1px solid #ced4da",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  }),
};

function IngredientForm({
  validation,
  Ingredients,
  setIngredient,
  setCategory,
  Category,
  IngredientsFetch,
  setIngredientsFetch,
  CategoryFetch,
  edditMode
}) {



  const customStylesStandard = {
    control: (base, state) => ({
      //border: "1px solid #ced4da",
      borderRadius: ".375rem",
      display: "flex",

      //color: "#212529",
      //borderColor: "#86b7fe",
      outline: 0,

      backgroundColor: state.isSelected ? "blue" : "#fff",
      boxShadow: state.isFocused ? "0px 0px 0px 0.25rem #0d6efd40" : "none",
      border: state.isFocused ? "1px solid #86b7fe" : "1px solid #ced4da",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    }),
  };

  const customStylesVALIDATE = {
    control: (base, state) => ({
      //border: "1px solid #ced4da",
      borderRadius: ".375rem",
      display: "flex",

      //color: "#212529",
      //borderColor: "#86b7fe",
      outline: 0,

      backgroundColor: state.isSelected ? "blue" : "#fff",
      boxShadow: state.isFocused ? "0px 0px 0px 0.25rem #cb444a40" : "none",
      border: state.isFocused ? "1px solid #cb444a" : "1px solid #cb444a",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    }),
  };

  const customStylesValidateOk = {
    control: (base, state) => ({
      //border: "1px solid #ced4da",
      borderRadius: ".375rem",
      display: "flex",

      //color: "#212529",
      //borderColor: "#86b7fe",
      outline: 0,

      backgroundColor: state.isSelected ? "#fff" : "#fff",
      boxShadow: state.isFocused ? "0px 0px 0px 0.25rem #4f865740" : "none",
      border: state.isFocused ? "1px solid #4f8657" : "1px solid #4f8657",
      transition:
        "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    }),
  };

  function CustomStyleValdiation(validation,name) {
    if (validation === true && name === "") {
      return customStylesVALIDATE;
    } else if (validation === true && name.length > 0) {
      return customStylesValidateOk;
    } else {
      return customStylesStandard;
    }
  }

  //
  // INGREDIENT FILE
  //

  //CHANGE INGREDIENT NAME
  function changeIngredientName(componentId, e) {
    const index = Ingredients.findIndex(
      (obj) => obj.componentId === componentId
    );

    if (e === null) {
      Ingredients[index].id = NaN;
      Ingredients[index].unit = "...";
      Ingredients[index].name = "";
      Ingredients[index].approved = true;

      return setIngredient([...Ingredients]);
    }

    setIngredient(() => {
      Ingredients[index].name = e.name;
      Ingredients[index].id = e.id;
      Ingredients[index].unit = e.unit;
      Ingredients[index].approved = e.approved;
      return [...Ingredients];
    });
  }

  function changeOnlyIngredientName(componentId, e){
    const index = Ingredients.findIndex(
      (obj) => obj.componentId === componentId
    );
    setIngredient(()=>{
      Ingredients[index].name=e
      return [...Ingredients]
    })
  }

  //CREATE OPTION
  function CreateOption(componentId, text) {
    //const genIngredientID = crypto.randomUUID()
    const createdOption = { name: text, id: 0, unit: null, approved: false };
    setIngredientsFetch([...IngredientsFetch, createdOption]);

    changeIngredientName(componentId, createdOption);
    console.log("Ingredients when created", Ingredients);
  }

  //
  // BUTONS
  //

  //ADD ROW
  function addIngredient() {
    const genID = crypto.randomUUID();
    setIngredient([
      ...Ingredients,
      { componentId: genID, name: "", id: "", approved: true},
    ]);
  }

  //DELETE ROW
  function deleteIngredient(componentId) {
    
    const index = Ingredients.findIndex(
      (obj) => obj.componentId === componentId
    );

    if(edditMode&&Ingredients[index].approved===false){
      console.log("DELETE")
    }
    
    setIngredient([
      ...Ingredients.filter((obj) => obj.componentId !== componentId),
    ]);
  }

  //
  // AMOUNT FILE
  //

  function AmountUpdate(componentId, value) {
    setIngredient(() => {
      const index = Ingredients.findIndex(
        (obj) => obj.componentId === componentId
      );
      Ingredients[index].amount = Number(value);
      return [...Ingredients];
    });
  }

  function UnitNameUpdate(componentId, value) {
    setIngredient(() => {
      const index = Ingredients.findIndex(
        (obj) => obj.componentId === componentId
      );
      Ingredients[index].unit = value;
      return [...Ingredients];
    });
  }

  function ChangeCategory(e) {
    setCategory([...e]);
  }
  
  return (
    <div>
      <Form.Label>Ingredients</Form.Label>

      {Ingredients.map((element) => {
        return (
          <Row className="mt-3 mb-3" key={element.componentId} style={element.approved===false&&edditMode?{backgroundColor: "#e5425540"}:null}>
            <Col>
            {element.approved===false&&edditMode?
                <Form.Control
                  placeholder="Enter ingredient name"
                  type="text"
                  onChange={(e) => changeOnlyIngredientName(element.componentId, e.target.value)}
                  value={element.name}
                  required
                />:
              <CreatableSelect
                isClearable
                backspaceRemovesValue={true}
                options={IngredientsFetch}
                onCreateOption={(text) =>
                  CreateOption(element.componentId, text)
                }
                onChange={(e) => changeIngredientName(element.componentId, e)}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                value={element.name === "" ? null : element}
                styles={CustomStyleValdiation(validation,element.name)}
                require
              />}

            </Col>

            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Enter quantity"
                  type="number"
                  min="1"
                  onChange={(e) =>
                    AmountUpdate(element.componentId, e.target.value)
                  }
                  value={element.amount}
                  required
                />

                {element.approved === false ? (
                  <Form.Control
                    placeholder="unit"
                    type="text"
                    min="1"
                    value={element.unit}
                    onChange={(e) =>
                      UnitNameUpdate(element.componentId, e.target.value)
                    }
                    pattern="[a-zA-Z]+"
                    required
                  />
                ) : (
                  <InputGroup.Text>{element.unit}</InputGroup.Text>
                )}
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
                <Dropdown.Item
                  onClick={() => deleteIngredient(element.componentId)}
                >
                  Delete Ingredient
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        );
      })}

      <div className="d-grid mt-3 mb-3">
        <Button variant="secondary" onClick={addIngredient}>
          + add {Ingredients.length > 0 && "antother"} ingredient
        </Button>
      </div>
      {validation&&Ingredients.length===0?<div class="invalid-feedback" style={{display: "flex"}}>Recipie misses ingredients! Press button to add Ingredient</div>:<></>}

      <Form.Group className="d-grid mt-3 mb-3">
        <Form.Label>Category</Form.Label>
        <Select
          isMulti
          name="category"
          options={CategoryFetch}
          className="basic-multi-select"
          classNamePrefix="Select recipie category"
          styles={customStyles}
          getOptionLabel={(e) => e.name}
          getOptionValue={(e) => e.id}
          onChange={(e) => ChangeCategory(e)}
          defaultValue={Category}
        />
      </Form.Group>
    </div>
  );
}

export default IngredientForm;

// "&:hover": {
//   border: "1px solid #ff8b67",
//   boxShadow: "0px 0px 6px #ff8b67"
// }

/* 
<DropdownButton
                variant="outline-secondary"
                title={
                  element.unit
                }
                id="input-group-dropdown-2"
                align="end"
              >

<Dropdown.Item onClick={() => deleteIngredient(element.componentId)}>
                  g
                </Dropdown.Item> 
                
                </DropdownButton>*/
