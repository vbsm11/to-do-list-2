import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskObjType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    const todoListId1 = v1();
    const todoListId2 = v1();

    let [todoLists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
    });

    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId);
        dispatchToTasksReducer(action)
    }
    function addTask(newTaskTitle: string, todoListId: string) {
        const action = addTaskAC(newTaskTitle, todoListId);
        dispatchToTasksReducer(action)
    }
    function changeStatus(tID: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(tID, isDone, todoListId);
        dispatchToTasksReducer(action)
    }
    function changeTasksTitle(tID: string, newValue: string, todoListId: string) {
        const action = changeTaskTitleAC(tID, newValue, todoListId);
        dispatchToTasksReducer(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = changeTodolistFilterAC(todoListId, value);
        dispatchTodolistsReducer(action)
    }
    const removeTodolist = (todoListId: string) => {
        const action = removeTodolistAC(todoListId);
        dispatchTodolistsReducer(action);
        dispatchToTasksReducer(action)
    }
    const reNameTodolist = (newTitle: string, todoListId: string) => {
        const action = changeTodolistTitleAC(newTitle, todoListId);
        dispatchTodolistsReducer(action)
    }
    function addTodoList(title: string) {
        const action = addTodolistAC(title);
        dispatchTodolistsReducer(action);
        dispatchToTasksReducer(action)
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

export default AppWithReducers;
