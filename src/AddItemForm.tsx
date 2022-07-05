import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';
// import {Button} from '@mui/material';
// import {Button} from '@material-ui/core';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        {/*<input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? 'error' : ''}
        />*/}
        <TextField
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            // className={error ? 'error' : ''}
            size="small"
            id="outlined-basic"
            label={error}
            // hiddenLabel
            variant="outlined"
        />

        {/*<button onClick={addItem}>+</button>*/}
        <Button
            style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', backgroundColor: 'black'}}
            variant="contained"
            onClick={addItem}
            // size="small"
        >+</Button>

        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}
