import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

const TaskList = () => {
    const [task, setTasks] = useState([])

    const cargarTareas = async() => {
        try {
            const response = await fetch("http://localhost:3001/notas")
            if(!response.ok) throw new Error("Error al cargar las notas")
                const data = await response.json()
            setTasks(data)
        } catch (error){
            console.error("Error al cargar las notas ", error)
        }
    }
    useEffect(() => {
        cargarTareas()
    }, [])

    return(
        <div>
            <TaskForm
                onTaskAdded={cargarTareas}
            />
            <ul>
                {task.map((task) => (
                    <li key={task._id}>
                        {task.text}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TaskList