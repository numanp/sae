import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListaDeUsuarios from '@material-ui/icons/AccountCircle'
import HistorialDeAccesos from '@material-ui/icons/ChromeReaderMode'
import ControlDePuertaIcon from '@material-ui/icons/SwapHoriz'
import Grid from '@material-ui/core/Grid';

const styles = {
    root: {
        flexGrow: 1,
      },
    paper: {
        // marginTop: theme.spacing.unit * 8,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    card: {
      maxWidth: 300,
      minWidth: 300,
    backgroundColor:'#F5FFFA' ,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '10%',
      display: 'flex',
    //   alignItems: 'center',,
      display: 'inline-block',
      textDecoration: 'none !important'
    },
    iconProps: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        fontSize: '15em',
        color: 'black'
        // margin: '0 5vw'
    },
    typoProps:{
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        display: 'flex',
        textAlign: 'center'
    },
  };
  

class HomeContainer extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const { classes, theme } = this.props;

        return(
            <div>
                <Grid container className={classes.root} spacing={8}>

                    <Card component={Link} to="/" className={classes.card}>
                        <CardActionArea>
                        <ControlDePuertaIcon className={classes.iconProps}/>
                        <Divider variant="middle" />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" className={classes.typoProps}>
                            Control de Puerta
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card  component={Link} to="/lista" className={classes.card} >
                        <CardActionArea>
                        <ListaDeUsuarios className={classes.iconProps}/>
                        <Divider variant="middle" />
                            <CardContent>
                            <Typography gutterBottom  variant="h5" component="h2" className={classes.typoProps}>
                            Lista de Usuarios
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card component={Link} to="/horarios" className={classes.card}>
                        <CardActionArea>
                        <HistorialDeAccesos className={classes.iconProps}/>
                        <Divider variant="middle" />
                            <CardContent>
                            <Typography  gutterBottom variant="h5" component="h2" className={classes.typoProps}>
                            Historial de Acceso
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

            </Grid>

            </div>
        )
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

HomeContainer.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomeContainer))