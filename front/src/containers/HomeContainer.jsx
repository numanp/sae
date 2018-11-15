import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeContainer extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)