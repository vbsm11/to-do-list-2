import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './TodoList';

type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void
    changeStatus: (tID: string, isDone: boolean, todoListId: string) => void
    changeTasksTitle: (tID: string, newValue: string, todoListId: string) => void
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => props.removeTask(props.task.id, props.todolistId);
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId);
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTasksTitle(props.task.id, newValue, props.todolistId);
    }, [props.changeTasksTitle, props.task.id, props.todolistId])

    return (
        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.isDone}
                onChange={onChangeStatusHandler}
            />
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})
