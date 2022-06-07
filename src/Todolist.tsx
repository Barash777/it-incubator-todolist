import React, {KeyboardEvent, ChangeEvent, useState} from 'react';

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    //setLastTasks: () => void
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('')

    /*const removeTask = (id: string) => {
        props.removeTask(id)
    }*/

    const tasksJSX = props.tasks.map(task => {

        const removeTask = () => {
            props.removeTask(task.id)
        }

        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        /*if (e.key === 'Enter')
            onClickButtonHandler()*/
        e.key === 'Enter' && onClickButtonHandler()
    }

    const onClickFilterButton = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            {/*<button onClick={() => props.setLastTasks}>Undo</button>*/}
            <div>
                <input
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyDown={onInputKeyDown}
                />
                <button onClick={onClickButtonHandler}>+</button>
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button onClick={() => onClickFilterButton('all')}>All</button>
                <button onClick={() => onClickFilterButton('active')}>Active</button>
                <button onClick={() => onClickFilterButton('completed')}>Completed</button>
            </div>
        </div>
    );
}

export default Todolist;