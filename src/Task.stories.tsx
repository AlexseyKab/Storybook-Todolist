import {Task} from "./Task";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Task Component',
    component: Task
}

const callbackChangeTaskStatus = action('Status changed')
const callbackChangeTaskTitle = action('Title change')
const callbackRemoveTask = action('Task remove')


export const TaskBseExample = (props: any) => {
    return <>
        <Task changeTaskStatus={callbackChangeTaskStatus}
              changeTaskTitle={callbackChangeTaskTitle}
              removeTask={callbackRemoveTask}
              task={{id: '1', isDone: true, title: 'CSS'}}
              todolistId={'todolistId1'}
        />
        <Task changeTaskStatus={callbackChangeTaskStatus}
              changeTaskTitle={callbackChangeTaskTitle}
              removeTask={callbackRemoveTask}
              task={{id: '2', isDone: false, title: 'JS'}}
              todolistId={'todolistId2'}/>
    </>
}