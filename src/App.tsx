import React from 'react';
import './App.css';
import Todolist, {TasksType} from "./Todolist";

function App() {

    let tasks1: Array<TasksType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]

    let tasks2: Array<TasksType> = [
        {id: 4, title: "Car", isDone: true},
        {id: 5, title: "Jet", isDone: false},
        {id: 6, title: "House", isDone: true}
    ]

    let tasks3: Array<TasksType> = [
        {id: 7, title: "Red hat", isDone: true},
        {id: 8, title: "War and Peace", isDone: false},
        {id: 9, title: "Lord of the rings", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasks1}/>
            <Todolist title={"What to buy"} tasks={tasks2} />
            <Todolist title={"What to read"} tasks={tasks3}/>
        </div>
    );
}

export default App;
