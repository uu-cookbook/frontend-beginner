import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";

// COMPONENTS
import RecipieForm from "./RecipieForm";

function ModalWindow(proms) {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isFormEddited, setFormEddited] = useState(false);

  const handleClose = () => {
    if(isFormEddited){
      setShowConfirm(true)
     return setShow(true)
    }
    return setShow(false)
  };

  const handleConfirmClose = () => {
    setShowConfirm(false)
  }

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

          <RecipieForm setAlertShow={()=>proms.setAlertShow()}setFormEddited={setFormEddited} setShow={setShow} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"  type='submit' form='my-form'>Publish</Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={showConfirm}
        onHide={handleConfirmClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Conformation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you shure you want to exit thr window ?
          <div>All changes will be lost.</div>
        </Modal.Body>



        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{setShow(false)
            setShowConfirm(false)}}>Yes, I want to leave</Button><Button variant="primary" onClick={()=>setShowConfirm(false)}>No, I want to stay</Button>
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
