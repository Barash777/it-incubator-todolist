import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValuesType, TaskType} from './Todolist';
import {v1} from 'uuid';


function App() {
    // BLL:
    const initialTasks: Array<TaskType> = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Something', isDone: false}
    ]


    const [tasks, setTasks] = useState<Array<TaskType>>(initialTasks)

    //let stateWillBeBack = tasks
    //console.log('init: ' + stateWillBeBack.length)

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        //stateWillBeBack = tasks
        //console.log('add: ' + stateWillBeBack.length)

        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskID: string) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID)

        //stateWillBeBack = tasks
        //console.log('remove: ' + stateWillBeBack.length)

        setTasks(filteredTasks)

        // Все равно не работает такой метод))
        //tasks.pop()
        //const copyTasks = {...tasks};
        //setTasks(copyTasks)
        // console.log(tasks)
    }
    // ??? 1 - tasks new state (setTasks = asynchrone function), 2 - const tasks, not let (every render new initialization)

    /*const setLastTasks = () => {
        const newAr = [...stateWillBeBack]
        setTasks([newAr[0], newAr[1]])
    }*/

    const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    let tasksForRender = tasks;
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
    }


    // UI:
    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForRender}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                //setLastTasks={setLastTasks}
            />
        </div>
    );
}

export default App;
