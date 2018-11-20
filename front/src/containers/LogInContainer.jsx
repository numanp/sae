import React from 'react';
import { connect } from 'react-redux'
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

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
    render() {
        // const { classes, theme } = this.props;
        return (
            <Paper style={{width: '25%', margin: '0 auto'}}>
                <form>
                    <Grid container  alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="email" type="email"  autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container  alignItems="flex-end">
                        <Grid item>
                            <ContraseñaIcon />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="current-password" label="password" type="current-password"  required />
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
                        <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </form>
            </Paper>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return{

        
    }
}

LogIn.propTypes = {
    // classes: PropTypes.object.isRequired,
    // theme: PropTypes.object.isRequired,
  };

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)


