import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
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

class LoginTab extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.padding}>
                <div className={classes.margin}>
                    <Grid container  alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Username" type="email"  autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container  alignItems="flex-end">
                        <Grid item>
                            <ContraseñaIcon />
                        </Grid>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="username" label="Password" type="password"  required />
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
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(LoginTab);





// import React, { Component } from 'react';
// import { connect } from 'react-redux'

// import { Paper, Grid, TextField, Button, FormControlLabel } from '@material-ui/core';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import FormControl from '@material-ui/core/FormControl';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import ContraseñaIcon from '@material-ui/icons/VpnKey'

// const styles = theme => ({
//     margin: {
//         margin: theme.spacing.unit * 2,
//     },
//     padding: {
//         padding: theme.spacing.unit
//     },
//     button: {
//       margin: theme.spacing.unit,
//       backgroundColor: 'red',
//     },
//     formLogIn: {
//         margin: '0 auto'
//     },
//   });



// class LogIn extends Component {
  
//     constructor(props){
//         super(props);

//     }

//     render(){
//         const { classes } = this.props
//         return(
//             <Paper className={classes.padding}>
//                 <form style={{ margin: "0 auto" }}>
//                     <Grid container spacing={8} alignItems="flex-end">
//                         <Grid item>
//                             <AccountCircle />
//                         </Grid>
//                         <Grid item>
//                             <TextField id="input-with-icon-grid" label="Ingresa el Usuario" />
//                         </Grid>
//                     </Grid>
//                     <Grid container spacing={8} alignItems="flex-end">
//                         <Grid item>
//                             <ContraseñaIcon />
//                         </Grid>
//                         <Grid item>
//                             <TextField id="input-with-icon-grid" label="Ingresa el Usuario" />
//                         </Grid>
//                     </Grid>
//                     <Button variant="contained">
//                         Log in!
//                     </Button>
//                 </form>
//             </Paper>
//         )
//     }
// }

// function mapStateToProps(state){
//     return {

//     }
// }

// function mapDispatchToProps(dispatch){
//     return{

        
//     }
// }

// LogIn.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };

// export default connect(mapStateToProps, mapDispatchToProps)(LogIn)


{/* 
    <div>  
            <form>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Ingresa el Usuario" />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <ContraseñaIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" label="Ingresa el Usuario" />
                    </Grid>
                </Grid>
                <button type="submit" disabled={submitting || pristine}>
                    Submit
                </button>
            </form>
        </div>
*/}