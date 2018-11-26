import React from 'react';
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
import { Link } from 'react-router-dom';
import ListaUsuariosContainers from './ListaUsuariosContainers';

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
    backgroundColor: '#8e0c2d',
  },
  menuSideBar2: {
    primary: '#ffffff',
    color: '#ffffff'
  },
  iconsColor: {
    color: 'white'
  },
  dividerColor: {
    backgroundColor: 'white',
    boxShadow: '0 20px 20px -20px #333'
  }
});

class NavbarSidebarContainer extends React.Component {
  constructor(props){
    super(props)
  }
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
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
            <Typography variant="h6" color="inherit" noWrap>
              P5
            </Typography>
            <Button className={classes.menuButtonRight} color="inherit">Login</Button>
          </Toolbar>
          
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
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
          <Divider  />
          <List className={ classes.menuSideBar1 }>
          
            {['Control de puerta', 'Lista de Usuarios', 'Historial de acceso'].map((text, index) => (
              
              <Link to={index == 0 ? "/puerta" : index == 1 ? "/lista" : "/historial"}>
              <ListItem className={ classes.menuSideBar2 } button key={text}>{index == 0 ? <ControlDePuertaIcon /> : index == 1 ? <ListaDeUsuarios /> : <HistorialDeAccesos /> }
                <ListItemIcon className = {classes.iconsColor}> </ListItemIcon>
                <ListItemText disableTypography
        primary={<Typography type="body2" style={{ color: '#FFFFFF', fontFamily: 'Roboto' }}>{text}</Typography>} />
              </ListItem>
              </Link>
            
            ))}
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

NavbarSidebarContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(NavbarSidebarContainer);