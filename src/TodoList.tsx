import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string,
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (value: string, todoListId: string) => void
    changeStatus: (tID: string, isDone: boolean, todoListId: string) => void
    changeTasksTitle: (tID: string, newValue: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodolist: (todoListId: string) => void
    reNameTodolist: (newTitle: string, todoListId: string) => void
}

export const TodoList = React.memo((props: PropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const reNameTodolist = useCallback((newTitle: string) => {
        props.reNameTodolist(newTitle, props.id);
    }, [props.reNameTodolist, props.id])

    let tasksForTodoList = props.tasks

    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter(t => t.isDone)
    }
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter(t => !t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={reNameTodolist}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasksForTodoList.map(t =>
                        <Task
                            task={t}
                            changeStatus={props.changeStatus}
                            changeTasksTitle={props.changeTasksTitle}
                            removeTask={props.removeTask}
                            todolistId={props.id}
                            key={t.id}
                        />)
                }
            </div>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'text'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={'primary'}
                    variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={'secondary'}
                    variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    );
})


