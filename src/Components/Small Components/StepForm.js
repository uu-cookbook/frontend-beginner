import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

//icons
import Icon from "@mdi/react";
import { mdiDeleteForever } from "@mdi/js";

import { useState } from "react";
//import { useId } from "react";

function StepFrom() {
  //Step logic
  const [Stepts, addStep] = useState([{ componentId: 12, content: "HELOO" }]);
  console.log(Stepts);

  function ClickAddStep() {
    const id = 13;
    const newSelect = [{ componentId: id, content: "" }];

    addStep(Stepts.concat(newSelect));
    console.log(Stepts);
  }

  function ClickDeleteStep(place) {
    addStep((SteptsBefore) => {
      return [
        ...SteptsBefore.slice(0, place),
        ...SteptsBefore.slice(place + 1),
      ];
    });
  }

  function ChangeStepContent(componentId, content) {
    const index = Stepts.findIndex((obj) => obj.componentId === componentId);
    Stepts[index].content = content;
    addStep(Stepts);
    console.log(Stepts);
  }

  return (
    <div>
      {Stepts.map((element, index) => {
        return (
          <div class="mb-2">
            <Form.Label>Stepts</Form.Label>
            <InputGroup>
              <InputGroup.Text>Step {element.componentId}.</InputGroup.Text>
              <Form.Control
                as="textarea"
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
                    ClickDeleteStep(index);
                  }}
                >
                  Delete step
                </Dropdown.Item>
              </DropdownButton>
            </InputGroup>
          </div>
        );
      })}
      <Button variant="secondary" onClick={ClickAddStep}>
              + add antother step
            </Button>
    </div>
  );
}
export default StepFrom;
