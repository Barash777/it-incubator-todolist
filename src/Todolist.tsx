import React from 'react';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    //tasks: TasksType[]
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

export function Todolist(props: TodolistPropsType) {

    const tasksJSX = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>
        )
    })

    /*const changeFilter = (filter: FilterValuesType) => {
        props.filter = filter
    }*/

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>*/}
                {tasksJSX}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;