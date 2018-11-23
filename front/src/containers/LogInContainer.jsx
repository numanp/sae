import React from 'react';
import { connect } from 'react-redux'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { loginUser } from '../redux/actions/userActions.js';

import AccountCircle from '@material-ui/icons/AccountCircle';
import ContraseñaIcon from '@material-ui/icons/VpnKey'

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2,
    },
    padding: {
        padding: theme.spacing.unit 
    }
});

class LogIn extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email : '',
            password : ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(evt){
        evt.preventDefault();
        const key = evt.target.id
        const value = evt.target.value 
        this.setState({
            ...this.state,
            [key] : value
        })
    }
    handleSubmit(evt){
        evt.preventDefault();
        
        this.props.sendLogInfo(this.state.email, this.state.password)

    }
    render() {
        console.log(this.props)
        return (
            <Paper style={{width: '25%', margin: '0 auto'}}>
                <form>
                    <Grid container  alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={(evt)=>this.handleChange(evt)} id="email" label="email" type="email"  autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container  alignItems="flex-end">
                        <Grid item>
                            <ContraseñaIcon />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField onChange={(evt)=>this.handleChange(evt)} id="password" label="password" type="password"  required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="secondary"
                                />
                            } label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }} onClick={this.handleSubmit} >Login</Button>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

function mapStateToProps(state){
    return {
        loggedUser : state.loggedUser
    }
}

function mapDispatchToProps(dispatch){
    return{
        sendLogInfo : function(email, password){
            dispatch(loginUser(email, password))
        }
    }
}

LogIn.propTypes = {
    // classes: PropTypes.object.isRequired,
    // theme: PropTypes.object.isRequired,
  };

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)


