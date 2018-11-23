import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchDateAndTime, updateDateInicio,updateDateFin, updateTimeInicio, updateTimeFin } from '../redux/actions/horariosActions'
import { InlineDatePicker, InlineTimePicker } from 'material-ui-pickers';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SelectDias from './selectDias';
import { func } from 'prop-types';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing.unit * 1,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
  });
class Horarios extends PureComponent{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log(this.props.user.id)
        
        this.props.fetchDateAndTime(this.props.user.id);  
    }   
    //Cada uno de los handleChange* sirve para cambiar el parametro especifico
    // (fecha inicial, fecha final, horario mínimo, horario máximo)
      handleDateChangeInicio = date => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var fI=date.toLocaleDateString('en-US',options);
        this.props.updateDateInicio(fI)
      };
      handleDateChangeFin = date => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var fF=date.toLocaleDateString('en-US',options);
        this.props.updateDateFin(fF);
      };
      handleTimeChangeMin = time => {        
        var tI=time.toLocaleTimeString('en-GB');
        this.props.updateTimeInicio(tI);
      }
      handleTimeChangeMax = time => {        
        var tF=time.toLocaleTimeString('en-GB');
        this.props.updateTimeFin(tF);
      }
render (){ 
    const { classes, horarios } = this.props;    
    
    return (
        <div className={classes.root}>
       <Paper className={classes.paper}>
        <Grid container spacing={16}>
        <Grid item sm={12}>
            <SelectDias />        
        </Grid>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
        <InlineDatePicker
            
            variant="outlined"
            label="Fecha de inicio"
            value={horarios.selectedDateInicio}
            onChange={this.handleDateChangeInicio}
            format="dd/MM/yyyy"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            />
            </Paper>
        </Grid>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
        <InlineDatePicker
            
            variant="outlined"
            label="Fecha de finalización"
            value={horarios.selectedDateFin}
            onChange={this.handleDateChangeFin}
            format="dd/MM/yyyy"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            />
            </Paper>
        </Grid>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
          <InlineTimePicker
          variant="outlined"
          label="Horario minimo"
          value={horarios.selectedTimeMin}
          onChange={this.handleTimeChangeMin}
          />
          </Paper>
        </Grid>
          <Grid item sm={3}>
          <Paper className={classes.paper}>
          <InlineTimePicker
          variant="outlined"
          label="Horario máximo"
          value={horarios.selectedTimeMax}
          onChange={this.handleTimeChangeMax}
          />
          </Paper>
        </Grid>        
        </Grid>
        </Paper>
        </div>
    )
}
}
function mapStateToProps(state){
    return {
        horarios:state.horarios,
        user: state.user.user
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchDateAndTime: function(userID){
            dispatch(fetchDateAndTime(userID))
        },
        updateDateInicio: function(dateI){
            dispatch(updateDateInicio(dateI))
        },
        updateDateFin: function(dateF){
            dispatch(updateDateFin(dateF))
        },
        updateTimeInicio: function(timeI){
            dispatch(updateTimeInicio(timeI))
        },
        updateTimeFin: function(timeF){
            dispatch(updateTimeFin(timeF))
        }        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Horarios));