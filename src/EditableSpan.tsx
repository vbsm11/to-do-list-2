import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.onChange(title)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }

    return (
        editMode?
            <TextField value={title} onChange={onChangeTitle} onBlur={deactivateEditMode} autoFocus/> :
            <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}