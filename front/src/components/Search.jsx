import React from 'react';
import TextField from '@material-ui/core/TextField';


export default ({handleChange, inputValue}) => (
    <form style={{textAlign:'center'}}>
        <TextField 
            onChange={handleChange}
            style={{width:'300px'}}
            id="outlined-search"
            label="Buscá por nombre y/o apellido"
            type="search"
            margin="normal"
            variant="outlined"
            value={inputValue}
        />
    </form>
)