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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
    //setLastTasks: () => void
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    /*const removeTask = (id: string) => {
        props.removeTask(id)
    }*/

    const tasksJSX = props.tasks.length ?
        props.tasks.map(task => {
            const removeTask = () => {
                props.removeTask(task.id)
            }
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked)
            }

            return (
                <li key={task.id}>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        // onChange={() => props.changeTaskStatus(task.id, !task.isDone)}
                        onChange={changeTaskStatus}
                    />
                    <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
                    {/*<div>{task.title}</div>*/}
                    <button onClick={removeTask}>x</button>
                </li>
            )
        }) : <span>List is empty...</span>

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        error && setError(false)
    }

    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(trimTitle)
            // setError(false)
        } else {
            setError(true)
            // return
        }
        setTitle('')
    }

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        /*if (e.key === 'Enter')
            addTask()*/
        e.key === 'Enter' && addTask()
    }

    const onClickFilterButton = (filter: FilterValuesType) => {
        props.changeFilter(filter)
    }

    const onInputFocus = () => {
        error && setError(false)
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
                    onFocus={onInputFocus}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error ? <div className={'errorMessage'}>Title is required</div> : ''}
            </div>
            <ul>
                {tasksJSX}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'activeFilter' : ''}
                        onClick={() => onClickFilterButton('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'activeFilter' : ''}
                        onClick={() => onClickFilterButton('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'activeFilter' : ''}
                        onClick={() => onClickFilterButton('completed')}>Completed
                </button>
            </div>
        </div>
    );
}

export default Todolist;