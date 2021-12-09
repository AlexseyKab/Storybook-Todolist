import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListID_1, title: 'What to learn', filter: 'all' },
        { id: todoListID_2, title: 'What to buy', filter: 'all' },
    ]);
    const [tasks, setTasks] = useState({
        [todoListID_1]: [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'CSS', isDone: true },
            { id: v1(), title: 'REACT', isDone: false }
        ],
        [todoListID_2]: [
            { id: v1(), title: 'MILK', isDone: true },
            { id: v1(), title: 'BEER', isDone: true },
            { id: v1(), title: 'FISH', isDone: false }
        ]
    });



    function removeTask(id: string, todolistId: string) {
        let todoListsTasks = tasks[todolistId]
        tasks[todolistId] = todoListsTasks.filter(t => t.id != id);
        setTasks({...tasks})
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListsTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todoListsTasks ]
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let todoListsTasks = tasks[todolistId]
        let task = todoListsTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }




    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todoList = todoLists.find( t => t.id ===  todolistId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }


    return (
        <div className="App">
            {
                todoLists.map( (m) => {

                    let tasksForTodolist = tasks[m.id];

                    if (m.filter === "active") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                    }
                    if (m.filter === "completed") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                    }

                    return    (
                        <Todolist title={m.title}
                                  key={m.id}
                                  id={m.id}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={m.filter}
                        />
                    )

                } )
            }
        </div>
    );
}

export default App;
