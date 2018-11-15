import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';


export default Search = ({handleChange, inputValue}) => (
    <form>
        <TextField 
            onChange={handleChange}
            style={{width:'300px'}}
            id="outlined-search"
            label="Buscá por nombre y/o apellido"
            type="search"
            margin="normal"
            variant="outlined"
            //value={inputValue}
        />
    </form>
)