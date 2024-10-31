import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const cargarTareas = async() => {
        try {
            const response = await fetch("http://localhost:3001/notas");
            if(!response.ok) throw new Error("Error al cargar las notas");
                const data = await response.json();
            setTasks(data)
        } catch (error){
            console.error("Error al cargar las notas ", error);
        }
    };

    const eliminarTarea = async (id) => {
        try {
            await fetch(`http://localhost:3001/notas/${id}`, { method: "DELETE" });
            cargarTareas();
        } catch (error) {
            console.error("Error al eliminar la tarea", error)
        }
    };

    const editarTarea = (task) => {
        setTaskToEdit(task);
    };

    useEffect(() => {
        cargarTareas();
    }, []);

    return(
        <div>
            <TaskForm
                onTaskAdded={cargarTareas}
                taskToEdit={taskToEdit}
                setTaskToEdit={setTaskToEdit}
            />
            <h2>Tus notas</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.text}
                        <button className="edit-button" onClick={() => editarTarea(task)}>
                            <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button className="delete-button" onClick={() => eliminarTarea(task._id)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TaskList