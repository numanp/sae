import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { isLogged } from '../redux/actions/userActions';

//CONTAINERS
import ListaUsuarios from './ListaUsuariosContainers'
import HomeContainer from './HomeContainer'
import Horarios from '../components/Horarios';
import LogIn from './LogInContainer'
import NavbarSidebarContainer from './NavbarSidebarContainer'
import ProfileContainer from './ProfileContainer';
import { func } from 'prop-types';


//COMPONENTS
// import AdminProfile from '../components/AdminProfile';

class Main extends React.Component{
    constructor(props){
        super(props);      
    }
    componentDidMount(){
        this.props.isLogged()
    }
    render(){
        console.log(this.props)
        return (    
                <div>
                    
                <NavbarSidebarContainer />
                <Switch>
                    <Route path='/horarios' component={Horarios} />
                    <Route path='/lista' component={ListaUsuarios} />    
                    <Route path='/login' component={LogIn} />
                    <Route path='/userProfile/:id' component={ProfileContainer} />
                    <Route path='/userProfile' component={ProfileContainer} />
                </Switch>
                
                </div>
             
        )
    }
}

function mapStateToProps(state){
    return{ 
        loggedUser : state.user.loggedUser
    }
};

function mapDispatchToProps(dispatch){
    return{
        isLogged : function(){
            dispatch(isLogged())
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Main)
