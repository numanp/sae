import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper'; 
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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


class SubeChange extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }


    componentDidMount(){

    }

    render(){
        const { classes, theme } = this.props;
        return(
            <Paper className={classes.paperZprops}>
                <Grid item container xs={12} md={12} >
                <Button className={classes.buttonProps} onClick={this.props.handleChangeSube} variant="contained" color="secondary">
                X
                </Button>
                <TextField inputRef={focus} className={classes.inputProps}
                    id="subeId"
                    label="Apoya la sube!"
                    type="text"
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    value={this.props.user.subeId}
                    onChange={this.props.handleChange} 
                    />
                </Grid>
                <Grid item xs={6} md={6} style={{margin:'0 auto'}} > <Button fullWidth variant="contained" color="secondary" onClick={this.props.handleChangeSube}> Cambia tu sube! </Button> </Grid>
            </Paper>
        )
    }
}

function mapStateToProps(state){
    return{
    }
}

function mapDispatchToProps(dispatch){
    return{
    }
}


SubeChange.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SubeChange))