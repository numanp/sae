import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

//CONTAINERS
<<<<<<< HEAD
import ListaUsuarios from './ListaUsuariosContainers'
=======
import HomeContainer from './HomeContainer'
import NavbarSidebarContainer from './NavbarSidebarContainer.'
>>>>>>> 9de65b0f1f2f563344a643bd582fcaba9e8df7f1

//COMPONENTS
// import AdminProfile from '../components/AdminProfile';

class Main extends React.Component{
    constructor(props){
        super(props);      
    }
   
    render(){
<<<<<<< HEAD
        return (        
            
                    <Switch>
                       <Route path='/' component={ListaUsuarios} />                        
                    </Switch>
=======
        return (    
                <div>
                <NavbarSidebarContainer />
                <HomeContainer />

                <Switch>
                     {/* <Route path="/register" component={RegisterContainer}/> */}
                        
                </Switch>
                </div>
>>>>>>> 9de65b0f1f2f563344a643bd582fcaba9e8df7f1
             
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
