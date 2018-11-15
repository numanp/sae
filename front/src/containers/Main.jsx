import React from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

//CONTAINERS
import HomeContainer from './HomeContainer'
import NavbarContainer from './NavbarContainer'

//COMPONENTS
// import AdminProfile from '../components/AdminProfile';

class Main extends React.Component{
    constructor(props){
        super(props);      
    }
   
    render(){
        return (    
                <div>
                <NavbarContainer />
                <HomeContainer />

                <Switch>
                     {/* <Route path="/register" component={RegisterContainer}/> */}
                        
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
