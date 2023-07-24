import {TaskObjType} from '../App';
import {v1} from 'uuid';
import {AddTodolistType, RemoveTodolistType, todoListId1, todoListId2} from './todolists-reducer';

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string
    todolistId: string
}

type ChangeStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    isDone: boolean,
    todolistId: string
}

type ChangeTitleActionType = {
    type:  'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeStatusActionType | ChangeTitleActionType | AddTodolistType | RemoveTodolistType

const initialState: TaskObjType = {
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
}

export const tasksReducer = (state: TaskObjType = initialState, action: ActionsType): TaskObjType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [
                    {id: v1(), title: action.title, isDone: false},
                    ...state[action.todolistId]
                ]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId? {...t, isDone: action.isDone}: t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId? {...t, title: action.title}: t)
            }
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = [];
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleActionType => {
    return { type:  'CHANGE-TASK-TITLE', taskId, title, todolistId}
}