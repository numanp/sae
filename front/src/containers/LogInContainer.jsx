import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'

import { loginUser } from '../redux/actions/userActions'
import { isLogged } from '../redux/actions/userActions';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ContraseñaIcon from '@material-ui/icons/VpnKey'

const styles = theme => ({
    widthBackground:{
        width:'100vw',
        height:'100vh',
        position: 'fixed',
        zIndex: '2000',
        backgroundImage: 'linear-gradient(to bottom, #c51440, #b9113a, #ac0d34, #a0092e, #940629)',
        top: '0',
        left: '0'
    },
    iconProps: {
        // width: '20vw',
        // height: '10vh',
        width: '80%',
        height: '40%'
    },
    input: {
        color: "#c51440"
      },
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        },

    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        backgroundImage: 'linear-gradient(to top, #c51440, #b9113a, #ac0d34, #a0092e, #940629)',
    },
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
        const fn = this.props.sendLogInfo(this.state.email, this.state.password)
        return new Promise(function(resolve) {
            resolve(fn)
        })
        .then((l) => {
            this.props.history.push('/home')
        }) 
 
    }

    componentDidMount(){
        this.props.isLogged()
    }

    render() {
        
        const { classes, theme } = this.props;
        
        return (
            <div className={classes.widthBackground}>
                <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                <img className={classes.iconProps}src="https://camo.githubusercontent.com/4e4c012cde0c80deb9e9fc2187f36257c33cd7c9/687474703a2f2f692e696d6775722e636f6d2f666170654141502e706e67" alt="plataforma5" />
                    {/* <Avatar className={classes.avatar}>
                    <LockIcon className={classes.iconProps}/>
                    </Avatar> */}
                    {/* <Typography component="h1" variant="h5">
                    Sign in
                    </Typography> */}
                    <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email"> Email Address</InputLabel>
                        <Input className={classes.input} onChange={(evt)=>this.handleChange(evt)} id="email" name="email" autoComplete="email"  autoFocus  /> 
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password"> Password</InputLabel>
                        <Input onChange={(evt)=>this.handleChange(evt)} name="password" type="password" id="password" autoComplete="current-password" />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                    >
                        Sign in
                    </Button>
                    </form>
                </Paper>
                </main>
            </div>
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
        },
        isLogged : function(){
            dispatch(isLogged())
          },
    }
}

LogIn.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(LogIn)) 