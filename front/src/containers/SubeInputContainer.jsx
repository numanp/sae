import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper'; 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { addSube } from '../redux/actions/userActions'
import { Redirect, Link } from 'react-router-dom';

import { fetchUsers } from '../redux/actions/allUsersActions'

const styles = {
    paperZprops:{
        zIndex:'10000',
        margin:'0 30vw',
        position: 'absolute',
        boxShadow: '(0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24))',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        // opacity: '0.5',
        padding:'10%',
        '&:hover':{
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        // opacity: '1',
        },
    },
    buttonProps:{
        position:'absolute',
        top:'0',
        right:'0',
    }
  };

  const focus = input => {
    input && input.focus();
  };


class SubeInput extends Component{
    constructor(props){
        super(props)
        this.state={
            inputForm: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitSube = this.handleSubmitSube.bind(this)
    }

    handleChange(e){
        let valueInput = e.target.value
        this.setState({ inputForm: valueInput })
    }

    handleSubmitSube(e){
        e.preventDefault(); 
        const hex = parseInt(this.state.inputForm,10).toString(16);
        const aux = [];
        for (let i = 0; i < hex.length; i++) {
            aux.unshift(parseInt(hex.slice(i,i+2),16))
            i++;  
        }
        // console.log(aux.join());
        this.props.nuevaSube(aux.join())
        axios.get('/api/usuarios/subeId', {params: {inputForm: aux.join()}})
        .then((res) => (res.data.id) ? this.props.history.push(`/userProfile/${res.data.id}`):
            this.props.history.push('/userProfile/')
        )
    }

    componentDidMount(){
        this.props.fetchUsers();
    }

    render(){
        const { classes, theme } = this.props;
        return(
            <Paper className={classes.paperZprops}>
                <Grid item container xs={12} md={12} >
                <Button className={classes.buttonProps} onClick={this.props.handleButtonChange} variant="contained" color="secondary">
                X
                </Button>
                <TextField onChange={this.handleChange} inputRef={focus} className={classes.inputProps}
                    id="subeId"
                    label="Apoya la sube!"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value= {this.state.inputForm}
                    onKeyPress ={ e => e.charCode == 13 ? this.handleSubmitSube(e): null }
                    />
                </Grid>
                <Grid item xs={6} md={6} style={{margin:'0 auto'}} > <Button fullWidth variant="contained" color="secondary" onClick={this.handleSubmitSube}> Busca tu sube! </Button> </Grid>
            </Paper>
        )
    }
}

function mapStateToProps(state){
    return{
        allUsers: state.users
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchUsers: function(){
            dispatch(fetchUsers())
        },
        nuevaSube: function(idSube){
            dispatch(addSube(idSube))
        }
    }
}

SubeInput.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubeInput))
