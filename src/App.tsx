import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValuesType, TaskType} from './Todolist';


function App() {
    // BLL:
    const initialTasks: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Something', isDone: false}
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(initialTasks)

    const removeTask = (taskID: number) => {
        const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(filteredTasks)

        // Все равно не работает такой метод))
        //tasks.pop()
        //const copyTasks = {...tasks};
        //setTasks(copyTasks)
        // console.log(tasks)
    }
    // ??? 1 - tasks new state (setTasks = asynchrone function), 2 - const tasks, not let (every render new initialization)


    const [filter, setFilter] = useState<FilterValuesType>('all');

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }


    let tasksForRender = tasks;
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
        //setTasks(filteredTasks)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
        //setTasks(filteredTasks)
    }


    // UI:
    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
