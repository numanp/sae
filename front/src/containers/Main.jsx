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
                    
                    {/* <NavbarSidebarContainer /> */}
                    <Route path='/*' component={NavbarSidebarContainer} />
                   
                    <Switch>
                        {(this.props.loggedUser) ? (
                            <div> 
                                <Route exact path="/" render={() => (
                                    <Redirect to="/home"/>
                                )}/>
                                <Route path='/home' component={HomeContainer} />
                                <Route path='/horarios' component={Horarios} />
                                <Route path='/lista' component={ListaUsuarios} />    
<<<<<<< HEAD
                                <Route path='/userProfile/:id' component={ProfileContainer} />
                                <Route exact path='/userProfile' component={ProfileContainer} />
                                <Route path='/logs' component={HistoriesContainer} />
                            </div>) 
                            :
                                <Route path='/' component={LogIn} />
=======
                                <Route path='/userprofile/:id' component={ProfileContainer} />
                                <Route exact path='/userprofile' component={ProfileContainer} />
                            </div>) 
                            :

                            <Route path='/' component={LogIn}  />
>>>>>>> d7111e175377701d7613a7b1c149cd639f2aeeff
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



{/* <Switch>
{(this.props.loggedUser) ? (
    <div> 
        <Route path='/home' component={HomeContainer} />
        <Route path='/horarios' component={Horarios} />
        <Route path='/lista' component={ListaUsuarios} />    
        <Route path='/userprofile/:id' component={ProfileContainer} />
        <Route exact path='/userprofile' component={ProfileContainer} />
    </div>) 
    :

    <Route path='/' component={LogIn}  />
}
</Switch> */}