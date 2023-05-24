import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
//import { useState useContext} from "react";
import Button from "react-bootstrap/Button";

// COMPONENTS
//import RecipeCard from "./RecipeCard"
import ModalWindow from "./ModalWindow";
import UserContext from "../UserProvider";

import Recipe from "./Recipe"
import { useContext } from "react";

function ModalRecipe(props) {
  const { canValidate } = useContext(UserContext);

  async function deleteRecipie(id){
    console.log("THI IS RECIPIE",props.recipe)
    console.log("This is ID",id)
    
    const response = await fetch("http://localhost:3010/recipe/delete?id="+id,{
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
    
    const jsonData = await response
    console.log("DELATION",jsonData)
    props.setShow(false)
  }

  async function acceptRecipie(ID){  
    /// accept ingredients
    const unaproved = props.recipe.ingredients.filter((element)=>element.approved===false)
    
    unaproved.forEach(element => {
      element.approved = true
    });

    console.log(unaproved);

    const response = await fetch(`http://localhost:3010/ingredient/update-list`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",},
          body: JSON.stringify(unaproved),})

    const jsonData = await response.json();
    console.log("Response",jsonData);
    
    /// accept recipie
    let AcceptRecipie = {
      "id" : ID,
      "approved": true
      }
    
    const response2 = await fetch(`http://localhost:3010/recipe/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",},
          body: JSON.stringify(AcceptRecipie),})
          
          const jsonData2 = await response2.json();
          console.log(jsonData2);
    props.setShow(false)
  }

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
      {canValidate()===true?     
      <Modal.Header closeButton>
          <Modal.Title>Recipie</Modal.Title>
      </Modal.Header>:<></>}

        <Modal.Body >
          <div style={{textAlign: "right"}}>{canValidate()===false?<CloseButton onClick={() => props.setShow(false)} style={{align: "right"}}/>:<></>}</div>
          <Recipe recipe={props.recipe}/>
        </Modal.Body>
        
        {canValidate()?
        <Modal.Footer>
        <Button variant="primary"><ModalWindow buttonname="EDIT" inputData={props.recipe}/></Button>
        <Button variant="danger" onClick={()=>deleteRecipie(props.recipe.id)}>DELETE</Button>
        {props.recipe.approved===false?<Button variant="success" onClick={()=>acceptRecipie(props.recipe.id)}>ACCEPT RECIPIE</Button>:<></>}
        </Modal.Footer>:<></>}
      </Modal>
    </>
  );
}

export default ModalRecipe;