import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Logo from "./Small Components/Logo";
import { NavDropdown } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import CloseButton from 'react-bootstrap/CloseButton';

// Router
import { NavLink } from "react-router-dom";

// React magic
import ModalWindow from "./ModalWindow";

// User Context
import { useContext, useState, useEffect } from "react";
import UserContext from "../UserProvider";

function NavBar() {
  const { user, users, changeUser, isLoggedIn, canValidate } = useContext(UserContext);
  const [AlertShow, setAlertShow] = useState(false)
  const [unapprovedAmount, setUnapprovedAmount] = useState(0);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlertShow(false);
    }, 12000);
  }, [AlertShow]);

  useEffect(() => {
    getUnapprovedRecipeAmount(); // get amount before waiting for interval for the first time

    const intervalCall = setInterval(() => {
      getUnapprovedRecipeAmount();
    }, 30000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);

  const getUnapprovedRecipeAmount = (() => {
    fetch("http://localhost:3010/recipe/amount?approved=false")
      .then(res => {
        if (!res.ok) {
            throw Error('Could not fetch data for that resource.');
        }
        return res.json();
      })
      .then(data => {
          setUnapprovedAmount(data);
      })
  });

  return (
    <div>
      <div
        style={{ position: "absolute", zIndex: "1" }}
        className="mt-4 position-absolute top-0 start-50 translate-middle-x w-50 mb-0">
        <Alert show={AlertShow} variant="success">
        
        
        <div class="d-flex flex-row-reverse">
        <CloseButton onClick={()=>setAlertShow(false)}/><Alert.Heading className=" flex-fill">Recipe sent successfully!</Alert.Heading>
        </div>
          <p>
            Thank you for sharing your recipe. We have received it and are now
            waiting for confirmation. Once approved, it will be featured on our
            CookiCorn.
          </p>
        </Alert>
      </div>

      <div style={{ position: "relative", zIndex: "0" }}>
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
              {canValidate() && (
                <Nav.Link as={NavLink} to="/validation">
                  Validate{" "}
                  {unapprovedAmount>0 && <Badge bg="danger">
                    {unapprovedAmount}
                  </Badge>}{" "}
                </Nav.Link>
              )}
              {isLoggedIn() && <ModalWindow setAlertShow={setAlertShow} buttonname="Create Recipe" />}
            </Nav>
            <Nav>
              {isLoggedIn() && (
                <img
                  src={user.picture}
                  className="rounded-circle"
                  alt="profile"
                  width={"45px"}
                  height={"45px"}
                />
              )}
              <NavDropdown align="end" title={user.userName ?? "Log in"}>
                {users.map((user) => {
                  return (
                    <NavDropdown.Item
                      key={user.userName}
                      onClick={() => changeUser(user.id)}
                    >
                      {user.userName} ({user.role.name})
                    </NavDropdown.Item>
                  );
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
