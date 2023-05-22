import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Form } from "react-bootstrap";
import Select from "react-select"
import RecipeCard from "./RecipeCard";
import { useState, useRef, useEffect } from "react";

function RecipeList({listName, recipes, ingredients, categories}) {
  let currentSearch = useRef("");
  let currentSort = useRef("");
  let currentCategoryFilters = useRef([]);
  let currentIngredientFilters = useRef([]);

  const [searchedRecipes, setSearchedRecipes] = useState(recipes);

  useEffect(() => {
    // THINGS HAPPENING ONLY ON FIRST RENDER BELOW

    recipes.forEach((recipe) => {
      // CONVERT DATES FROM ISO TO DATE
      recipe.date = new Date(recipe.date);

      // JOIN INGREDIENT INFORMATION
      recipe.ingredients.forEach((recipeIngredient) => {
        console.log(recipeIngredient.id);
        let result = ingredients.filter(ingredient => {
          return ingredient.id === recipeIngredient.id
        })

        if (result) {
          recipeIngredient.name = result[0].name;
          recipeIngredient.unit = result[0].unit;
          recipeIngredient.approved = result[0].approved;
        }
      });

      //console.log(recipe);
    });

    // CONVERT INGREDIENTS TO INGREDIENT OPTIONS
    ingredients.forEach((ingredient) => {
      ingredient.label = `${ingredient.name} (${ingredient.unit})`;
      ingredient.value = ingredient.id;
      delete ingredient.name;
      delete ingredient.unit;
      delete ingredient.id;
      delete ingredient.approved;
    });
    //console.log(ingredients);

    // CONVERT CATEGORIES TO CATEGORY OPTIONS
    categories.forEach((category) => {
      category.label = category.name;
      category.value = category.id;
      delete category.name;
      delete category.id;
    });
  }, [recipes, ingredients, categories]);

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

        for (let x = 0; x < recipe.categoryId.length; x++) {
          if (recipe.categoryId[x] === currentCategoryFilters.current[i].value) {
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
          if (recipe.ingredients[x].id === currentIngredientFilters.current[i].value) {
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
          return (b.date - a.date);
        });
        break;
      case "oldest":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.date - a.date)*-1;
        });
        break;
      case "prepTimeAsc":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.preparationTime - a.preparationTime);
        });
        break;
      case "prepTimeDsc":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.preparationTime - a.preparationTime)*-1;
        });
        break;
      case "stepsAsc":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.steps.length - a.steps.length);
        });
        break;
      case "stepsDsc":
        newRecipes = newRecipes.sort(function(a, b) {
          return (b.steps.length - a.steps.length)*-1;
        });
        break;
      default:
        break;
    }
    
    setSearchedRecipes([...newRecipes]);
  }

  return (
      <Container>
          {listName && <div><h2>{listName}</h2><br/></div>}
          {recipes && <Container>
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
                      options={categories}
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
                    options={ingredients}
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
                    <Col sm={12} md={12} lg={6} xl={4} key={recipe.name} className="card-col">
                        <RecipeCard recipe={recipe} />
                        <br/>
                    </Col>
                ))}
            </Row>}
            {searchedRecipes.length === 0 && <Row className="card-row">
                <h2 style={{color: "gray"}}>No recipes found.</h2>
            </Row>}
          </Container>}
      </Container>
  );
}

export default RecipeList;