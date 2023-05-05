import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Select from "react-select"
import RecipeCard from "./RecipeCard";
import { useState, useRef } from "react";

function RecipeList({recipes, listName}) {
  let currentSearch = useRef("");
  let currentSort = useRef("");
  let currentCategoryFilters = useRef([]);
  let currentIngredientFilters = useRef([]);
  
  const [searchedRecipes, setSearchedRecipes] = useState(recipes);

  const handleSearch = (e) => {
    currentSearch.current = e.target.value.toLowerCase();
    updateSearch();
  }

  const handleSort = (e) => {
    currentSort.current = e.target.value;
    updateSearch();
  }

  const handleCategoryFilter = (e) => {
    currentCategoryFilters.current = [...e];
    updateSearch();
  }

  const handleIngredientFilter = (e) => {
    currentIngredientFilters.current = [...e];
    updateSearch();
  }

  const updateSearch = () => {
    // FILTER BY TEXT SEARCH
    let newRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(currentSearch.current.toLowerCase()));
    
    // FILTER BY CATEGORIES
    newRecipes = newRecipes.filter(recipe => {
      for (let i = 0; i < currentCategoryFilters.current.length; i++) {
        let hasCurrentCategory = false;

        for (let x = 0; x < recipe.categories.length; x++) {
          if (recipe.categories[x] === currentCategoryFilters.current[i].value) {
            hasCurrentCategory = true;
            break;
          }
        }
        if (!hasCurrentCategory) {
          return false;
        }
      }
      return true;
    });

    // FILTER BY INGREDIENTS
    newRecipes = newRecipes.filter(recipe => {
      for (let i = 0; i < currentIngredientFilters.current.length; i++) {
        let hasCurrentIngredient = false;

        for (let x = 0; x < recipe.ingredients.length; x++) {
          if (recipe.ingredients[x] === currentIngredientFilters.current[i].value) {
            hasCurrentIngredient = true;
            break;
          }
        }
        if (!hasCurrentIngredient) {
          return false;
        }
      }
      return true;
    });

    // SORT
    switch (currentSort.current) {
      case "newest":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.dateUploaded - a.dateUploaded);
        });
        break;
      case "oldest":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.dateUploaded - a.dateUploaded)*-1;
        });
        break;
      case "prepTimeAsc":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.prepTime - a.prepTime);
        });
        break;
      case "prepTimeDsc":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.prepTime - a.prepTime)*-1;
        });
        break;
      case "stepsAsc":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.steps - a.steps);
        });
        break;
      case "stepsDsc":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.steps - a.steps)*-1;
        });
        break;
      default:
        break;
    }
    
    setSearchedRecipes([...newRecipes]);
  }

  const CategoryOptions = [
    { value: 1, label: "Vegan", color: "#00875A" },
    { value: 2, label: "Healthy", color: "#253858" },
    { value: 3, label: "Sweet", color: "#666666" },
    { value: 4, label: "Cheap", color: "#36B37E" },
    { value: 5, label: "Meat", color: "#2e1a00"}
  ];

  const Ingredients = [
    { label: 'Flour', value: 1},
    { label: 'Sugar', value: 2},
    { label: 'Eggs', value: 3},
    { label: 'Milk', value: 4},
    { label: 'Butter', value: 5},
    { label: 'Carrot', value: 6},
    { label: 'Cheese', value: 7},
    { label: 'Salmon', value: 8},
    { label: 'Chicken', value: 9}
  ];

  return (
      <Container>
          {listName && <div><h2>{listName}</h2><br/></div>}
          <Form>
            <Form.Group className="mb-3" controlId="recipeSearchForm">
              <Row>
                <Col xs="4">
                  <Form.Control type="text" placeholder="Search recipes"
                    onChange={handleSearch}
                  />
                </Col>
                <Col xs="4">
                  <Select
                    isMulti
                    name="category"
                    placeholder="Select categories"
                    options={CategoryOptions}
                    onChange={handleCategoryFilter}
                    className="basic-multi-select"
                    classNamePrefix="Select recipie category"
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
                <Select
                  isMulti
                  name="category"
                  placeholder="Select ingredients"
                  options={Ingredients}
                  onChange={handleIngredientFilter}
                  className="basic-multi-select"
                  classNamePrefix="Select recipie category"
                />
              </Row>
            </Form.Group>
          </Form>
          <br/>
          {searchedRecipes.length > 0 && <Row className="card-row">
              {searchedRecipes.map((recipe) => (
                  <Col sm={6} md={4} key={recipe.name} className="card-col">
                      <RecipeCard
                      id={recipe.id}
                      title={recipe.name}
                      description={recipe.description}
                      photo={recipe.photo}
                      steps={recipe.steps}
                      time={recipe.prepTime}
                      approved={recipe.approved} />
                      <br/>
                  </Col>
              ))}
          </Row>}
          {searchedRecipes.length === 0 && <Row className="card-row">
              <h2 style={{color: "gray"}}>No recipes found.</h2>
          </Row>}
      </Container>
  );
}

export default RecipeList;