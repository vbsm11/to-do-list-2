import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

export type ActionType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType

export type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}

type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: Array<TodoListType> = [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [
                ...state,
                {id: action.todolistId, title: action.title, filter: 'all'}
            ]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id? {...tl, title: action.title}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id? {...tl, filter: action.filter}: tl)
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, filter}
}
