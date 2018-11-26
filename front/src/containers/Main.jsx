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
        return (    
                <div>
                    
                    <NavbarSidebarContainer />
                   
                    <Switch>
                        {(this.props.loggedUser) ? (
                            <div> 
                                
                                <Route path='/horarios' component={Horarios} />
                                <Route path='/lista' component={ListaUsuarios} />    
                                <Route path='/userProfile/:id' component={ProfileContainer} />
                                <Route exact path='/userProfile' component={ProfileContainer} />
                            </div>) 
                            :
                            <Route path='/' component={LogIn} />
                        }
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
        },
        logOut : function(){
            dispatch(logOutUser())
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Main)
