import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";

// COMPONENTS
import RecipieForm from "./RecipieForm";

function ModalWindow(proms) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Nav.Link onClick={handleShow}>{proms.buttonname}</Nav.Link>

      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Recipie</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <RecipieForm />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"  type='submit' form='my-form' >Publish</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalWindow;

/* RANDOM NOTES

<Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          */
