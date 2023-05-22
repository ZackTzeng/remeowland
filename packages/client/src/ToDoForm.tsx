import { useState } from "react";
import { FormButton, FormField, FormFieldWrapper } from "./theme";
import { Plus } from "./theme/Plus";
import { useMUD } from "./MUDContext"; // used to bring all MUD auto-generated stuff in

export function ToDoForm() {
  const {
    systemCalls: {
      addToDo,
    },
  } = useMUD(); // this fnction is good because it loads all auto-generated items, ie function,
                // within one hook at bring it to frontend to use


  const [newToDo, setNewToDo] = useState("");

  return (
    <FormFieldWrapper>
      <FormField type="text" placeholder="new todo" value={newToDo} onChange={(e) => {
        setNewToDo(e.target.value);
      }} />
      <FormButton onClick={() => {
        addToDo(newToDo);
        setNewToDo("");
      }}>
        <Plus />
      </FormButton>
    </FormFieldWrapper>
  )
}