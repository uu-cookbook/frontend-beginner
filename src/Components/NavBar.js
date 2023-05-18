import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Logo from "./Small Components/Logo";
import { NavDropdown } from "react-bootstrap";

// Router
import { NavLink } from "react-router-dom";

// React magic
import ModalWindow from "./ModalWindow";

// Recipe data
import { Recipes } from "./RecipeData";

// User Context
import { useContext } from "react";
import UserContext from "../UserProvider";

function NavBar() {
  const {user, users, changeUser, isLoggedIn, canValidate} = useContext(UserContext);

  return (
    <div>
      <div>
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand as={NavLink} to="/" className="d-flex flex-row">
              <Container className="px-4">
                <Logo /> <span style={{ marginLeft: "10px" }}>CookiCorn</span>
              </Container>
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Recipes
              </Nav.Link>
              {canValidate() && <Nav.Link as={NavLink} to="/validation">
                Validate <Badge bg="danger">{Recipes.filter((recipe) => {return recipe.approved === false}).length}</Badge>{" "}
              </Nav.Link>}
              {isLoggedIn() && <ModalWindow buttonname="Create Recipe" />}
            </Nav>
            <Nav>
              {isLoggedIn() && <img src={user.picture} className="rounded-circle" alt="profile" width={"45px"} height={"45px"}/>}
              <NavDropdown align="end" title={user.userName ?? 'Log in'}>
                {users.map(user => {
                  return (
                    <NavDropdown.Item key={user.userName} onClick={() => changeUser(user.id)}>
                      {user.userName} ({user.role.name})
                    </NavDropdown.Item>
                  )
                })}
                <NavDropdown.Item onClick={() => changeUser(-1)}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
