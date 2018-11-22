import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

//CONTAINERS
import ListaUsuarios from './ListaUsuariosContainers'
import HomeContainer from './HomeContainer'
<<<<<<< HEAD
import NavbarSidebarContainer from './NavbarSidebarContainer.'
import Horarios from '../components/Horarios';
=======

import LogIn from './LogInContainer'
import NavbarSidebarContainer from './NavbarSidebarContainer'
import ProfileContainer from './ProfileContainer';

>>>>>>> 4a2355eb9a4c7c13fd1efdcec5d971ad59fdc935

//COMPONENTS
// import AdminProfile from '../components/AdminProfile';

class Main extends React.Component{
    constructor(props){
        super(props);      
    }
   
    render(){
        return (    
                <div>
                <NavbarSidebarContainer />
                <HomeContainer />
                <Switch>
<<<<<<< HEAD
                <Route path='/listausuarios' component={ListaUsuarios} /> 
                <Route path='/horarios' component={Horarios} />
                        
=======

                    <Route path='/lista' component={ListaUsuarios} />    
                    <Route path='/login' component={LogIn} />
                    <Route path='/userProfile' component={ProfileContainer} />
>>>>>>> 4a2355eb9a4c7c13fd1efdcec5d971ad59fdc935
                </Switch>
                </div>
             
        )
    }
}

function mapStateToProps(state){
    return{ 
   
    }
};

function mapDispatchToProps(dispatch){
    return{

    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Main)
