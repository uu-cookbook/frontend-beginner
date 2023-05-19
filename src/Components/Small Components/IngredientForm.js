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
import Select from "react-select";

//REACT SELECT (LIBRARY)
import CreatableSelect from "react-select/creatable";

// //Ingredien select content
let basticOptions = [
  {
    name: "Voda",
    id: "sd38sGw4",
    unit: "ml",
    approved: true,
  },
  {
    name: "Vejce",
    id: "Bh786kl4",
    unit: "ks",
    approved: true,
  },
  {
    name: "Hladká mouka",
    id: "am05suG0",
    unit: "g",
    approved: true,
  },
  {
    name: "Hrubá mouka",
    unit: "g",
    approved: true,
    id: "c2214107be5861cd",
  },
  {
    name: "Paprika",
    unit: "ks",
    approved: true,
    id: "8f8c29a03bfeb4d1",
  },
];

//Tag select content
const CategoryOptions = [
  {
    name: "Soup",
    id: "56rKd785abJudv75",
    color: "#FF00F0",
  },
  {
    name: "Main course",
    id: "64gdfsbZGhb85iKa",
    color: "#FFFB00",
  },
  {
    name: "Desert",
    id: "Ke58hDji7NpAn8tR",
    color: "#00F7FF",
  },
  {
    name: "Salad",
    id: "k7sFgfH7H8ka98a7",
    color: "#00FF0F",
  },
  {
    name: "Vegan",
    id: "1Ohk8dhAP8h73jK4",
    color: "#8B00FF",
  },
  {
    name: "Vegetarian",
    id: "T8nFk03YrTI7l384r",
    color: "#0023FF",
  },
  {
    name: "Grill",
    id: "68LorN7dG348tR4",
    color: "#FF0000",
  },
  {
    name: "Drink",
    id: "RDYumqZSvg24C286",
    color: "#DFFF00",
  },
  {
    name: "Fish",
    id: "sU5jw9PKM6NbvDeX",
    color: "#6495ED",
  },
  {
    name: "Meat",
    id: "f81sml6eD7EdtTtV",
    color: "#40E0D0",
  },
];

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
  Category,
  setCategory,
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

  //const [Ingredients, setIngredient] = useState([]);
  const [SelectOptions, setSelectOptions] = useState(basticOptions);

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

  //CREATE OPTION
  function CreateOption(componentId, text) {
    //const genIngredientID = crypto.randomUUID()
    const createdOption = { name: text, id: 0, unit: "...", approved: false };
    setSelectOptions([...SelectOptions, createdOption]);

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
      { componentId: genID, name: "", id: "", unit: "..." },
    ]);
  }

  //DELETE ROW
  function deleteIngredient(componentId) {
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
          <Row className="mt-3 mb-3" key={element.componentId}>
            <Col>
              <CreatableSelect
                isClearable
                backspaceRemovesValue={true}
                options={SelectOptions}
                onCreateOption={(text) =>
                  CreateOption(element.componentId, text)
                }
                onChange={(e) => changeIngredientName(element.componentId, e)}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                value={element.name === "" ? null : element}
                styles={CustomStyleValdiation(validation,element.name)}
                require
              />
            </Col>

            <Col>
              <InputGroup>
                <Form.Control
                  placeholder="Enter quantity"
                  type="number"
                  onChange={(e) =>
                    AmountUpdate(element.componentId, e.target.value)
                  }
                  value={element.value}
                  required
                />

                {element.approved === false ? (
                  <Form.Control
                    placeholder="unit"
                    type="text"
                    onChange={(e) =>
                      UnitNameUpdate(element.componentId, e.target.value)
                    }
                    value={element.value}
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
          options={CategoryOptions}
          className="basic-multi-select"
          classNamePrefix="Select recipie category"
          styles={customStyles}
          getOptionLabel={(CategoryOptions) => CategoryOptions.name}
          getOptionValue={(CategoryOptions) => CategoryOptions.id}
          onChange={(e) => ChangeCategory(e)}
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
