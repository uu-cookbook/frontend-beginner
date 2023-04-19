import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

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
            <Navbar.Brand as={NavLink} to="/">
              CokieCorn
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Recipies
              </Nav.Link>
              <Nav.Link as={NavLink} to="/validation">
                Validate <Badge bg="danger">2</Badge>{" "}
              </Nav.Link>
              <ModalWindow buttonname="Create Recipie" />
            </Nav>
            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search recipies"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Nav>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default NavBar;
