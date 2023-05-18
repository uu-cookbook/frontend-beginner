import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

//icons
import Icon from "@mdi/react";
import { mdiDeleteForever } from "@mdi/js";

let id = 0

function StepFrom({Stepts, addStep}) {
  //Step logic
  //const [Stepts, addStep] = useState([]);
  
  console.log(Stepts);
  

  function ClickAddStep() {
    id++ 
    const newSelect = [{ componentId: id, content: "" }];

    addStep(Stepts.concat(newSelect));
    console.log(Stepts);
  }

  function ClickDeleteStep(componentId) {
    addStep( ()=>{
    const index = Stepts.findIndex((obj) => obj.componentId === componentId);
    console.log(componentId)
    console.log(index)
    console.log(Stepts[index])
      return [
        ...Stepts.slice(0, index),
        ...Stepts.slice(index + 1),
      ]});
  }

  function ChangeStepContent(componentId, content) {
    console.log(content)
    const index = Stepts.findIndex((obj) => obj.componentId === componentId);
    Stepts[index].content = content;
    addStep([...Stepts]);
    console.log(Stepts);
  }

  return (
    <div>
    <Form.Label>Stepts</Form.Label>
      {Stepts.map((element, index) => {
        return (
          <div class="mb-2">
            <InputGroup>
              <InputGroup.Text>Step {index+1}.</InputGroup.Text>
              <Form.Control
                as="textarea"
                value={element.content}
                required
                onChange={(e) => {
                  ChangeStepContent(element.componentId, e.target.value);
                }}
                
                rows={2}
              />
              <DropdownButton
                variant="outline-secondary"
                title={
                  <span>
                    <Icon path={mdiDeleteForever} size={1} />
                  </span>
                }
                id="input-group-dropdown-2"
                align="end"
              >
                <Dropdown.Item
                  onClick={() => {
                    ClickDeleteStep(element.componentId);
                  }}
                >
                  Delete step
                </Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </div>
        );
      })}
      <div className="d-grid mt-3 mb-3">
      <Button variant="secondary" onClick={ClickAddStep}>
              + add {Stepts.length>0 && "antother" } step
            </Button>
            </div>
    </div>
  );
}
export default StepFrom;
