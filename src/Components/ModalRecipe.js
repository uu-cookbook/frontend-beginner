import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useState } from "react";

// COMPONENTS
//import RecipeCard from "./RecipeCard"

import Recipe from "./Recipe"

function ModalRecipe(props) {
  return (
    <>
      <Modal
        size="xl"
        show={props.show}
        onHide={() => props.setShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >       
        <Modal.Body >

          <div style={{textAlign: "right"}}><CloseButton onClick={() => props.setShow(false)} style={{align: "right"}}/></div>
          <Recipe recipe={props.recipe}/>

        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default ModalRecipe;