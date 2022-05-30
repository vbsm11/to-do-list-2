import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {

    let tasks1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "Reat", isDone: false}
    ]

    let tasks2: Array<TaskType> = [
        {id: 1, title: "Terminator", isDone: true},
        {id: 2, title: "XXX", isDone: false},
        {id: 3, title: "Jentlments of fortune", isDone: false}
    ]

    return (
        <div className="App">
            <TodoList title="What to learn" tasks={tasks1}/>
            <TodoList title="Movies" tasks={tasks2}/>
        </div>
    );
}

export default App;