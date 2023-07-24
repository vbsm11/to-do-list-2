import {IconButton, TextField} from '@material-ui/core';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {ControlPoint} from '@material-ui/icons';

type AddItemPropsType = {
    addItem: (value: string) => void
}

export function AddItemForm(props: AddItemPropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string>('');

    const addItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
        } else {
            setError('Title is required')
        }
        setNewTaskTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error !== '' && setError('');
        setNewTaskTitle(e.currentTarget.value);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem();
        }
    }


    // @ts-ignore
    return (
        <div>
            <TextField
                value={newTaskTitle}
                variant={'outlined'}
                label={'Type value'}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton
                onClick={addItem}
                color={'primary'}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}