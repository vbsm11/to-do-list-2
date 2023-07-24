import React, {useCallback} from 'react';
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

    const dispatch = useDispatch();

    const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootState, TaskObjType>(state => state.tasks);

    const removeTask = useCallback((id: string, todoListId: string) => {
        const action = removeTaskAC(id, todoListId);
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((newTaskTitle: string, todoListId: string) => {
        const action = addTaskAC(newTaskTitle, todoListId);
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((tID: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(tID, isDone, todoListId);
        dispatch(action)
    }, [dispatch])

    const changeTasksTitle = useCallback((tID: string, newValue: string, todoListId: string) => {
        const action = changeTaskTitleAC(tID, newValue, todoListId);
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        const action = changeTodolistFilterAC(todoListId, value);
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todoListId: string) => {
        const action = removeTodolistAC(todoListId);
        dispatch(action);
    }, [dispatch])

    const reNameTodolist = useCallback((newTitle: string, todoListId: string) => {
        const action = changeTodolistTitleAC(newTitle, todoListId);
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])

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
