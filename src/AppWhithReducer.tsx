import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string,
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolist, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'Whats to learn', filter: 'all'},
        {id: todolistId2, title: 'Whats to buy', filter: 'all'}
    ])

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1] : [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        [todolistId2] : [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }

        ]
    })

    function removeTodolist(todolistId: string) {
        let filteredTodolist = todolist.filter(t => t.id !== todolistId)
        setTodolist(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        let todolists = todolist.find(t => t.id === id)
        if (todolists) {
            todolists.title = newTitle
            setTodolist([...todolist])
        }
    }

    function addTask (title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTask = [task, ...tasks]
        tasksObj[todolistId] = newTask
        setTasks({...tasksObj})
    }

    function removeTask(id: string, todolistId: string) {
        let task = tasksObj[todolistId]
        let newTask = task.filter(t => t.id !== id)
        tasksObj[todolistId] = newTask
        setTasks({...tasksObj})
    }

    function changeFilter(value: FilterType, todolistId: string) {
       let todolists = todolist.find(t => t.id === todolistId )
        if (todolists) {
            todolists.filter = value
            setTodolist([...todolist])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasksObj})
    }

    function changeTaskTitle(taskId: string, title: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = title
        }
        setTasks({...tasksObj})
    }

    function addTodolist(title: string) {
        let todolists: TodolistType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodolist([todolists, ...todolist])
        setTasks({
            ...tasksObj,
            [todolists.id] : []
        })
    }


    return (
        <div className="App">
            <AddItemForm addTask={ addTodolist } />
            {
                todolist.map( t => {
                    let tasksForTodolist = tasksObj[t.id]

                    if (t.filter === "completed") {
                        tasksForTodolist = tasksObj[t.id].filter(t => t.isDone)
                    }
                    if (t.filter === "active") {
                        tasksForTodolist = tasksObj[t.id].filter(t => !t.isDone)
                    }
                    return   <Todolist title={t.title}
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
                } )
            }
        </div>
    );
}

export default App;
