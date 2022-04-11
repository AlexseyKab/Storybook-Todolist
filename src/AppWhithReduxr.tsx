import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string,
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWhitReducer() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolist, dispatchTodolist] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'Whats to learn', filter: 'all'},
        {id: todolistId2, title: 'Whats to buy', filter: 'all'}
    ])

    let [tasksObj, dispatchTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        [todolistId2]: [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}

        ]
    })

    function removeTodolist(todolistId: string) {
        const action = RemoveTodolistAC(todolistId)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const action = ChangeTodolistTitleAC(id, newTitle)
        dispatchTodolist(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatchTasks(action)
    }

    function removeTask(id: string, todolistId: string) {
       const action = removeTaskAC(id, todolistId)
       dispatchTasks(action)
    }

    function changeFilter(value: FilterType, todolistId: string) {
      const action = ChangeTodolistFilterAC(todolistId, value)
      dispatchTodolist(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(taskId,isDone, todolistId)
        dispatchTasks(action)
    }

    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
      const action = changeTaskTitleAC(taskId, title, todolistId)
      dispatchTasks(action)
    }

    function addTodolist(title: string) {
      const action = addTodolistAC(title)
      dispatchTodolist(action)
      dispatchTasks(action)
    }

    return (
        <div className="App">
            <AddItemForm addTask={addTodolist}/>
            {
                todolist.map(t => {
                    let tasksForTodolist = tasksObj[t.id]

                    if (t.filter === "completed") {
                        tasksForTodolist = tasksObj[t.id].filter(t => t.isDone)
                    }
                    if (t.filter === "active") {
                        tasksForTodolist = tasksObj[t.id].filter(t => !t.isDone)
                    }
                    return <Todolist title={t.title}
                                     todolistId={t.id}
                                     changeTodolistTitle={changeTodolistTitle}
                                     key={t.id}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     changeTaskTitle={changeTaskTitle}
                                     addTask={addTask}
                                     changeStatus={changeStatus}
                                     filter={t.filter}
                                     removeTodolist={removeTodolist}

                    />
                })
            }
        </div>
    );
}

export default AppWhitReducer;
