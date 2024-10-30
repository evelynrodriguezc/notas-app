import { useState } from "react";

const TaskForm = ({  onTaskAdded }) => {
    const [text, setText] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            await fetch("http://localhost:3001/notas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text })})
            onTaskAdded();
        } catch (error){
            console.error("Error al agregar la notra ", error)
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
            <button type="submit">Agregar Nota </button>
        </form>
    );
};
export default TaskForm;