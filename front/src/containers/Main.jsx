import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

//CONTAINERS
import ListaUsuarios from './ListaUsuariosContainers'
import HomeContainer from './HomeContainer'
import NavbarSidebarContainer from './NavbarSidebarContainer.'
import UserForm from '../components/UserForm';

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
                <Route path='/facu' component={UserForm} />
                <Route path='/' component={ListaUsuarios} /> 
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
