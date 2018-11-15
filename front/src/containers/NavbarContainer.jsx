import React, {Component} from 'react';
import { connect } from 'react-redux';

import SidebarLeftContainer from './SidebarLeftContainer'

class NavbarContainer extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div>
                <SidebarLeftContainer />
            </div>
        )
    }
}

function mapStateToProps(state){
    return{

    }
}

function mapDispatchToProps(dispatch){
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)