import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateDias } from '../redux/actions/horariosActions';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class selectDias extends React.Component {
  state = {
    chipData: [
      { key: 0, label: 'Lunes',color:'default' },
      { key: 1, label: 'Martes',color:'default' },
      { key: 2, label: 'Miércoles',color:'default' },
      { key: 3, label: 'Jueves',color:'default' },
      { key: 4, label: 'Viernes',color:'default' },
      { key: 5, label: 'Sábado',color:'default' },
      { key: 6, label: 'Domingo',color:'default' },
    ],
  };

  handleClick = data => () => {    
      var aux =[];
    // this.setState(state => {
      const chipData = [...this.state.chipData];
      const val = chipData[data.key].color;
      chipData[data.key].color= val=='primary' ? 'default' : 'primary';    
      chipData.forEach(elem=>{
        if(elem.color!='default'){
          aux.push(elem.label)
        }      
      })     
      this.props.updateDias(aux);
    //   return { chipData };
    // });    
  };
  componentWillReceiveProps(nextProps){//leo lo que hay en base de datos y seteo los dias en azul segun corresponda
  
      this.setState(state => {
        const aux = nextProps.dias;
        const chipData = [...state.chipData];
        chipData.map(elem =>{
            for (let i = 0; i < aux.length; i++) {                
                if(elem.label==aux[i]){
                    elem.color = 'primary'
                }             
            }
        })
        return { chipData };
      })
      
      
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root}>
        {this.state.chipData.map(data => {
          let icon = null;
          return (
            <Chip
              clickable
              key={data.key}
              icon={icon}
              color={data.color}
              onClick={this.handleClick(data)}
              label={data.label}              
              className={classes.chip}
            />
          );
        })}
      </Paper>
    );
  }
}
function mapStateToProps(state){
    return {
        dias:state.horarios.dias
    }
}
function mapDispatchToProps(dispatch){
    return{
        updateDias: function(dias){
          dispatch(updateDias(dias))
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(selectDias));