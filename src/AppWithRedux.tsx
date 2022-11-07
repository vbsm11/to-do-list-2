import React from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

export type FilterValuesType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskObjType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('dfkgdlfkg')
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootState, TaskObjType>(state => state.tasks);

    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId);
        dispatch(action)
    }
    function addTask(newTaskTitle: string, todoListId: string) {
        const action = addTaskAC(newTaskTitle, todoListId);
        dispatch(action)
    }
    function changeStatus(tID: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(tID, isDone, todoListId);
        dispatch(action)
    }
    function changeTasksTitle(tID: string, newValue: string, todoListId: string) {
        const action = changeTaskTitleAC(tID, newValue, todoListId);
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        const action = changeTodolistFilterAC(todoListId, value);
        dispatch(action)
    }
    const removeTodolist = (todoListId: string) => {
        const action = removeTodolistAC(todoListId);
        dispatch(action);
    }
    const reNameTodolist = (newTitle: string, todoListId: string) => {
        const action = changeTodolistTitleAC(newTitle, todoListId);
        dispatch(action)
    }
    function addTodoList(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
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
                    {todolists.map(tl => {
                            let tasksForTodoList = tasks[tl.id];
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
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

export default AppWithRedux;
