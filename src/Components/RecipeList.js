import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Select from "react-select"
import RecipeCard from "./RecipeCard";
import { useState } from "react";

function RecipeList({recipes}) {
  let currentSearch = "";
  let currentSort = "";
  let currentCategoryFilters = [];

  const [searchedRecipes, setSearchedRecipes] = useState(recipes);

  const handleSearch = (e) => {
    /*const newRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(e.target.value.toLowerCase()));
    setSearchedRecipes(newRecipes);*/

    currentSearch = e.target.value.toLowerCase();
    updateSearch();
  }

  const handleSort = (e) => {
    /*console.log(e.target.value);
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
      default:
        break;
    }*/

    currentSort = e.target.value;
    updateSearch();
  }

  const handleCategoryFilter = (e) => {
    /*console.log(e);

    const results = searchedRecipes.filter(recipe => {
      for (let i = 0; i < e.length; i++) {
        let hasCurrentCategory = false;

        for (let x = 0; x < recipe.categories.length; x++) {
          if (recipe.categories[x] === e[i].value) {
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

    setSearchedRecipes([...results]);*/

    currentCategoryFilters = [...e];
    updateSearch();
  }

  const updateSearch = () => {
    /* console.log(`Search: ${currentSearch}`);
    console.log(`Sort: ${currentSort}`);
    console.log("Current category filters:");
    console.log(currentCategoryFilters); */

    let newRecipes = recipes;

    // FILTER BY TEXT SEARCH
    newRecipes = newRecipes.filter(recipe => recipe.name.toLowerCase().includes(currentSearch.toLowerCase()));
    
    // FILTER BY CATEGORIES
    newRecipes = newRecipes.filter(recipe => {
      for (let i = 0; i < currentCategoryFilters.length; i++) {
        let hasCurrentCategory = false;

        for (let x = 0; x < recipe.categories.length; x++) {
          if (recipe.categories[x] === currentCategoryFilters[i].value) {
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

    // SORT
    switch (currentSort) {
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

  return (
      <Container>
          <Form>
            <Form.Group className="mb-3" controlId="recipeSearchForm">
              <Row>
                <Col xs="5">
                  <Form.Control type="text" placeholder="Search recipes"
                    onChange={handleSearch}
                  />
                </Col>
                <Col xs="3">
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
                  options={CategoryOptions}
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
                      <RecipeCard title={recipe.name} description={recipe.description} photo={recipe.photo} steps={recipe.steps} time={recipe.prepTime}/>
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