import Modal from "react-bootstrap/Modal";

// COMPONENTS
import RecipeCard from "./RecipeCard";

// Recipe data
import { Recipes } from "./RecipeData";

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
        <Modal.Header closeButton>
          <Modal.Title>{Recipes.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <RecipeCard />
          text

        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default ModalRecipe;