import React from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ControlDePuertaIcon from '@material-ui/icons/SwapHoriz'
import ListaDeUsuarios from '@material-ui/icons/AccountCircle'
import HistorialDeAccesos from '@material-ui/icons/ChromeReaderMode'
import ListItemText from '@material-ui/core/ListItemText';
import ListaUsuariosContainers from './ListaUsuariosContainers';

import { connect } from 'react-redux';
import { isLogged, logOutUser } from '../redux/actions/userActions';
import { createMuiTheme } from '@material-ui/core/styles';

const drawerWidth = 240;


const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
 
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  menuButtonRight: {
    marginLeft: 12,
    marginRight: 10,
    position: 'absolute',
    right: '150px',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#c51440',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
   
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  //ACA EMPIEZAN LOS ESTILOS PERSONALIZADOS

  menuSideBar1: {
    backgroundColor: '#c62b52',
  },
  menuSideBar2: {
    primary: '#ffffff',
    color: '#ffffff',
    textDecoration : 'none'
  },
  iconsColor: {
    color: 'white'
  },
  dividerColor: {
    backgroundColor: 'white',
    boxShadow: '0 20px 20px -20px #333'
  },
  linkProps: {
    textDecoration: 'none !important'
  }

});

class NavbarSidebarContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
    };
    this.handleLogOut = this.handleLogOut.bind(this)
  }
  
  handleLogOut(){
    this.props.logOutUser()
    .then(()=>
    console.log('entraaaaa'))
    this.props.history.push('/login')
    }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount(){
    this.props.isLogged()
  }
  
  render() {
    const { classes, theme, variant } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          
          style={{backgroundColor: '#c51440'}}
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            {this.props.match.url !== '/home' ? <Typography className={classes.linkProps} component={Link} to="/home" variant="h6" color="inherit" noWrap>
              Back
            </Typography> 
            :
            null}
            
            <Typography component={Link} to="/login" className={classes.menuButtonRight} style={{ color: '#FFFFFF', fontFamily: 'Roboto', fontSize: '1.2em', textDecoration: 'none' }} onClick={() => this.handleLogOut() }>Logout</Typography>

          </Toolbar>
          
        </AppBar>
        <Drawer
          className={classes.drawer}
          elevation={variant === 'temporary' ? elevation : 0}
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
        {/* ESTE ES EL BOTON DE SWIPPEO */}
          <div className={classes.drawerHeader}>
            <IconButton style={{color: 'white'}} onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
        {/* ------------------------------------- */}
        <Typography style={{ color: '#FFFFFF', fontFamily: 'Roboto', fontSize: '1.5em', margin: '0 auto 10%'}} >
          {(this.props.loggedUser) ? 'Hola ' + this.props.loggedUser.nombre + '!' : null} 

        </Typography>
        <Divider className={classes.dividerColor} />
          <List className={ classes.menuSideBar1 }>

              <ListItem button component={Link} to="/"> 
              <ControlDePuertaIcon className = {classes.iconsColor}></ControlDePuertaIcon>
               <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF', fontFamily: 'Roboto' }}>Control de puerta</Typography>} />
             </ListItem>
             
             <ListItem button component={Link} to="/lista"> 
             <ListaDeUsuarios className = {classes.iconsColor}></ListaDeUsuarios>
             <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF', fontFamily: 'Roboto' }}>Lista de Usuarios</Typography>} />
               
             </ListItem>

             <ListItem button component={Link} to="/horarios"> 
              <HistorialDeAccesos className = {classes.iconsColor}></HistorialDeAccesos>
              <ListItemText disableTypography primary={<Typography type="body2" style={{ color: '#FFFFFF', fontFamily: 'Roboto' }}>Historial de acceso</Typography>} />
             </ListItem>

          </List>
          <Divider className={classes.dividerColor} />

        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
    );
  }
}

function mapStateToProps(state){

  return {
    loggedUser : state.user.loggedUser
  }
}

function mapDispatchToProps(dispatch){
  return{
    isLogged : function(){
      dispatch(isLogged())
    },
    logOutUser : function(){
      dispatch(logOutUser())
    }
  }
}

NavbarSidebarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(NavbarSidebarContainer));




// {['Control de puerta', 'Lista de Usuarios', 'Historial de acceso'].map((text, index) => (


//   <ListItem className={ classes.menuSideBar2 } button key={text}>{index == 0 ? <ControlDePuertaIcon/>  : index == 1 ? <ListaDeUsuarios/> : <HistorialDeAccesos/>}
//     <ListItemIcon className = {classes.iconsColor}> </ListItemIcon>
//     <ListItemText disableTypography />
//   </ListItem>

// ))}