import React, {ChangeEvent} from "react";
import {TaskType} from "./Todolist";

type TypeMapTasks = {
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    todolistID: string
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
}


export function MapTasks(props: TypeMapTasks) {
    return (
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id )
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
    )
}