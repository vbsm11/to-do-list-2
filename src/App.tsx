import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskObjType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, setTasksObj] = useState<TaskObjType>(({
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    }));

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks;
        setTasksObj({...tasksObj});
    }
    function addTask(newTaskTitle: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let newTask = {id: v1(), title: newTaskTitle, isDone: false};
        tasksObj[todoListId] = [newTask, ...tasks];
        setTasksObj({...tasksObj});
    }
    function changeStatus(tID: string, isDone: boolean, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === tID);
        if (task) {
            task.isDone = isDone
            tasksObj[todoListId] = [...tasks];
            setTasksObj({...tasksObj})
        }
    }
    function changeTasksTitle(tID: string, newValue: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let task = tasks.find(t => t.id === tID);
        if (task) {
            task.title = newValue;
            tasksObj[todoListId] = [...tasks];
            setTasksObj({...tasksObj});
        }
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todolist = todoLists.find(tl => tl.id === todoListId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists]);
        }
    }
    const removeTodolist = (todoListId: string) => {
        let newTodoLists = todoLists.filter(tl => tl.id !== todoListId);
        setTodoLists(newTodoLists);
        delete tasksObj[todoListId];
        setTasksObj({...tasksObj});
    }
    const reNameTodolist = (newTitle: string, todoListId: string) => {
        const todoListForRename = todoLists.find(tl => tl.id === todoListId);
        if (todoListForRename) {
            todoListForRename.title = newTitle;
            setTodoLists([...todoLists])
        }
    }
    function addTodoList(title: string) {
        const todoList: TodoListType = {id: v1(), title: title, filter: 'all'};

        setTodoLists([todoList, ...todoLists]);
        setTasksObj({...tasksObj, [todoList.id]: []})
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ {padding:"15px"} }>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                            let tasksForTodoList = tasksObj[tl.id];
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                            }
                            return <Grid item>
                                <Paper style={ {padding:"10px"} }>
                                    <TodoList
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        changeTasksTitle={changeTasksTitle}
                                        removeTodolist={removeTodolist}
                                        reNameTodolist={reNameTodolist}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
