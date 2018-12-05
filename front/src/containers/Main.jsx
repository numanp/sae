import React, { Fragment } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { isLogged } from '../redux/actions/userActions';

//CONTAINERS
import ListaUsuarios from './ListaUsuariosContainers'
import HomeContainer from './HomeContainer'
import LogIn from './LogInContainer'
import NavbarSidebarContainer from './NavbarSidebarContainer'
import ProfileContainer from './ProfileContainer';
import HistoriesContainer from './HistoriesContainer';


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
                    <Route path='/*' component={NavbarSidebarContainer} />
                    <Switch>
                        {(this.props.loggedUser) ? (
                            <Fragment> 
                                <Route exact path="/" render={() => (
                                    <Redirect to="/home"/>
                                )}/>
                                <Route path='/home' component={HomeContainer} />
                                <Route path='/horarios' component={HistoriesContainer} />
                                <Route path='/lista' component={ListaUsuarios} />    
                                <Route path='/userprofile/:id' component={ProfileContainer} />
                                <Route exact path='/userprofile' component={ProfileContainer} />
                            </Fragment>) 
                            :
                            
                            <Route path='/' component={LogIn}  />
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