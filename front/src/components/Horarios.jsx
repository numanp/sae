import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchDateAndTime, updateDateAndTime } from '../redux/actions/horariosActions'
import { InlineDatePicker, InlineTimePicker } from 'material-ui-pickers';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SelectDias from './selectDias';

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
    state = {
        selectedDateInicio: '',
        selectedDateFin: '',
        selectedTimeMin: '',
        selectedTimeMax: '',
       
      };
    componentDidMount(){
        this.props.fetchDateAndTime(1);  
    }
    componentWillReceiveProps(nextProps){        
        this.setState({selectedDateInicio:nextProps.horarios.selectedDateInicio})           
        this.setState({selectedTimeMin:nextProps.horarios.selectedTimeMin})  
        this.setState({selectedDateFin:nextProps.horarios.selectedDateFin}) 
        this.setState({selectedTimeMax:nextProps.horarios.selectedTimeMax})
    }
    //Cada uno de los handleChange* sirve para cambiar el parametro especifico
    // (fecha inicial, fecha final, horario mínimo, horario máximo)
      handleDateChangeInicio = date => { 
          console.log(date);
          
        this.setState({ selectedDateInicio: date });
      };
      handleDateChangeFin = date => { 
        this.setState({ selectedDateFin: date });
      };
      handleTimeChangeMin = time => {        
        this.setState({ selectedTimeMin: time });
      }
      handleTimeChangeMax = time => {        
        this.setState({ selectedTimeMax: time });
      }
      handleSubmit = e =>{
          //aquí se parsea la informaciíon para guardar correctamente en la base de datos
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        var fI=this.state.selectedDateInicio.toLocaleDateString('en-US',options);
        var tI=this.state.selectedTimeMin.toLocaleTimeString('en-GB');
        var fF=this.state.selectedDateFin.toLocaleDateString('en-US',options);
        var tF=this.state.selectedTimeMax.toLocaleTimeString('en-GB');
        this.props.updateDateAndTime(1,{
            dias:this.props.horarios.dias,
            fechaInicio:fI,
            fechaFin:fF,
            horarioMin:tI,
            horarioMax:tF  
        })
      }
render (){ 
    const { classes } = this.props;    
    
    return (
        <div className={classes.root}>
       
        <Grid container spacing={16}>
        <Grid item sm={12}>
            <SelectDias />        
        </Grid>
        <Grid item sm={3}>
          <Paper className={classes.paper}>
        <InlineDatePicker
            
            variant="outlined"
            label="Fecha de inicio"
            value={this.state.selectedDateInicio}
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
            value={this.state.selectedDateFin}
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
          value={this.state.selectedTimeMin}
          onChange={this.handleTimeChangeMin}
          />
          </Paper>
        </Grid>
          <Grid item sm={3}>
          <Paper className={classes.paper}>
          <InlineTimePicker
          variant="outlined"
          label="Horario máximo"
          value={this.state.selectedTimeMax}
          onChange={this.handleTimeChangeMax}
          />
          </Paper>
        </Grid>
        
        <div>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmit}>
                Send
                <Icon className={classes.rightIcon}>send</Icon>
            </Button>
        </div>
        </Grid>
        </div>
    )
}
}
function mapStateToProps(state){
    return {
        horarios:state.horarios,
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchDateAndTime: function(userID){
            dispatch(fetchDateAndTime(userID))
        },
        updateDateAndTime: function(userId,dateTime){
            dispatch(updateDateAndTime(userId,dateTime))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Horarios));