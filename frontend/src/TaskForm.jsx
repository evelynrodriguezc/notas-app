/* eslint-disable react/prop-types*/
import { useEffect, useState } from "react";

const TaskForm = ({  onTaskAdded, taskToEdit, setTaskToEdit }) => {
    const [text, setText] = useState("")

    useEffect(() => {
        if(taskToEdit){
            setText(taskToEdit.text)
        }else{
            setText("")
        }
    }, [taskToEdit])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            if(taskToEdit){
                await fetch(`http://localhost:3001/notas/${taskToEdit._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text }),
                });
                setTaskToEdit(null)
            }else {
                await fetch("http://localhost:3001/notas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ text })
                    })
            }
            onTaskAdded();
        } catch (error){
            console.error("Error al agregar o actualizar la nota ", error)
        }
        setText("");
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Escribe una nota"
            required
            />
            <button className="button-pp" type="submit">{taskToEdit ? "Actualizar Nota" : "Agregar Nota"}</button>
        </form>
    );
};
export default TaskForm;