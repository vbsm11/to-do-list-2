import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemPropsType = {
    addItem: (value: string) => void
}

export function AddItemForm(props: AddItemPropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState(false);

    const addItem = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
        setError(false);
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem();
        }
    }


    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">Field is required</div>}
        </div>
    )
}