import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }

    const reNameTodolist = (newTitle: string) => {
        props.reNameTodolist(newTitle, props.id);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={reNameTodolist}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => props.removeTask(t.id, props.id);
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id);
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTasksTitle(t.id, newValue, props.id);
                        }

                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeStatusHandler}
                            />
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
}

