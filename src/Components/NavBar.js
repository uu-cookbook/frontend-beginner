import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Logo from "./Small Components/Logo";

// Router
import { NavLink } from "react-router-dom";

// React magic
import ModalWindow from "./ModalWindow";

function NavBar() {
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
                Recipies
              </Nav.Link>
              <Nav.Link as={NavLink} to="/validation">
                Validate <Badge bg="danger">2</Badge>{" "}
              </Nav.Link>
              <ModalWindow buttonname="Create Recipe" />
            </Nav>
            {/* <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search recipies"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Nav> */}
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
