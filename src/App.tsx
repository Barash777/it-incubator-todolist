import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
            {id: v1(), title: 'HEY', isDone: true},
            {id: v1(), title: 'ZXCQWE', isDone: false},
        ]
    });

    /*let[todolists,setTodolists]=useState<Array<TodolistsType>>([
        {id:v1(),title:'What to learn',filter:'all'},
        {id:v1(),title:'What to buy',filter:'completed'},
    ])

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);*/

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTodolist(todolistID: string) {
        // console.log(todolistID)
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
        // setTasks({...tasks})
    }

    function removeTask(todolistID: string, taskID: string) {
        // let filteredTasks = tasks.filter(t => t.id != taskID);

        let filteredTasks = {...tasks, [todolistID]: tasks[todolistID].filter(e => e.id !== taskID)}
        setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        let oneNewTask = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        let newTasks = {...tasks, [todolistID]: [oneNewTask, ...tasks[todolistID]]}
        setTasks(newTasks);
    }

    function changeStatus(todolistID: string, taskID: string, isDone: boolean) {
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // console.log(todolistID, taskID, isDone)

        const newTasks = {...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone} : el)}
        setTasks(newTasks);
    }


    /*let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }*/

    function changeFilter(todolistID: string, value: FilterValuesType) {
        // console.log(todolistID)
        // setFilter(value);

        const lists = todolists.map(el => el.id === todolistID ? {...el, filter: value} : el)
        setTodolists(lists)
    }

    return (
        <div className="App">
            {todolists.map((el) => {

                let tasksForTodolist = tasks[el.id];
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        filter={el.filter}
                    />)
            })}

        </div>
    );
}

export default App;
