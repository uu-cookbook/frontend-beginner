import Container from "react-bootstrap/Container";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiSortAscending, mdiSortDescending } from "@mdi/js";
import Select from "react-select"
import RecipeCard from "./RecipeCard";
import { useState } from "react";

function RecipeList({recipes}) {
  const [searchedRecipes, setSearchedRecipes] = useState(recipes);

  const handleSearch = (e) => {
    const newRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setSearchedRecipes(newRecipes);
  }

  const handleSort = (e) => {
    console.log(e.target.value);
    let newRecipes = searchedRecipes;
    switch (e.target.value) {
      case "newest":
        newRecipes = searchedRecipes.sort(function(a, b) {
          return (b.dateUploaded - a.dateUploaded);
        });
        setSearchedRecipes([...newRecipes]);
        break;
      case "oldest":
        newRecipes = searchedRecipes.sort(function(a, b) {
          return (b.dateUploaded - a.dateUploaded)*-1;
        });
        setSearchedRecipes([...newRecipes]);
        break;
      case "prepTimeAsc":
        newRecipes = searchedRecipes.sort(function(a, b) {
          return (b.prepTime - a.prepTime);
        });
        setSearchedRecipes([...newRecipes]);
        break;
      case "prepTimeDsc":
        newRecipes = searchedRecipes.sort(function(a, b) {
          return (b.prepTime - a.prepTime)*-1;
        });
        setSearchedRecipes([...newRecipes]);
        break;
      case "stepsAsc":
        newRecipes = searchedRecipes.sort(function(a, b) {
          return (b.steps - a.steps);
        });
        setSearchedRecipes([...newRecipes]);
        break;
      case "stepsDsc":
        newRecipes = searchedRecipes.sort(function(a, b) {
          return (b.steps - a.steps)*-1;
        });
        setSearchedRecipes([...newRecipes]);
        break;
    }
  }

  const CategoryOptions = [
    { value: 1, label: "Vegan", color: "#00875A" },
    { value: 2, label: "Healthy", color: "#253858" },
    { value: 3, label: "Sweet", color: "#666666" },
    { value: 4, label: "Cheap", color: "#36B37E" },
  ];

  return (
      <Container>
          <Form>
            <Form.Group className="mb-3" controlId="recipeSearchForm">
              <Row>
                <Col xs="8">
                  <Form.Control type="text" placeholder="Search recipes"
                    onChange={handleSearch}
                  />
                </Col>
                <Col xs="1">
                  <p style={{textAlign: "right", padding:"5px 0"}}>Sort by</p>
                </Col>
                <Col>
                  <Form.Select as="select" onChange={handleSort}>
                    <option value="oldest">Oldest</option>
                    <option value="newest">Newest</option>
                    <option value="prepTimeAsc">Longest preparation time</option>
                    <option value="prepTimeDsc">Shortest preparation time</option>
                    <option value="stepsAsc">Highest amount of steps</option>
                    <option value="stepsDsc">Lowest amount of steps</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Form.Label>Category</Form.Label>
                <Select
                  isMulti
                  name="category"
                  options={CategoryOptions}
                  className="basic-multi-select"
                  classNamePrefix="Select recipie category"
                />
              </Row>
              <Row>
                <Form.Label>Ingredients</Form.Label>
                <Select
                  isMulti
                  name="category"
                  options={CategoryOptions}
                  className="basic-multi-select"
                  classNamePrefix="Select recipie category"
                />
              </Row>
            </Form.Group>
          </Form>
          <br/>
          <Row className="card-row">
              {searchedRecipes.map((recipe) => (
                  <Col sm={6} md={4} key={recipe.name} className="card-col">
                      <RecipeCard title={recipe.name} description={recipe.description} photo={recipe.photo} steps={recipe.steps} time={recipe.prepTime}/>
                      <br/>
                  </Col>
              ))}
          </Row>
      </Container>
  );
}

export default RecipeList;