import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, removeUser, makeUserAdmin, remplaceIdSube, updateUser, createUser } from '../redux/actions/userActions';

import UserForm from '../components/UserForm'

class ProfileContainer extends Component {
    constructor (props){
        super(props)
        this.state = {
            switcher: false,
            controledUser: {
                nombre: '',
                apellido: '',
                dni: 0,
                email: '',
                imgPerfil: '',
                levelAccess: '',
                password: '',
                subeId: '',
                telefono: 0
            }
        }
        this.handleSwitch = this.handleSwitch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.getUser(1)
        
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            controledUser : nextProps.user.user
        })
    }

    handleSwitch(e){
        e.preventDefault();
        this.setState({ switcher: !e.switcher })
    }

    handleChange(e){
        e.preventDefault();
        console.log('HOLAAA', e.target)
        let keyValue = e.target.id
        let value = e.target.value
        this.setState({
            controledUser : {
                ...this.state.controledUser,
                [keyValue] : value
            }
        })
    }



    render() {
        console.log(this.state)
        return(
                <UserForm switcher={this.state.switcher} user={this.state.controledUser} handleSwitch={this.handleSwitch} handleChange={this.handleChange} saveChanges={this.props.updateUser} deleteUser={this.props.removeUser} changeSube={this.props.remplaceIdSube} handleSubmit={this.props.createUser}/>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        user: state.user
    }
}
function mapDispatchToProps(dispatch, ownProps){
    return{
        getUser: (userId) => {
            dispatch(getUser(userId));
          },
        removeUser: userId => {
            dispatch(removeUser(userId));
          },
        makeUserAdmin: userId => {
            dispatch(makeUserAdmin(userId));
          },
        remplaceIdSube: userId => {
            dispatch(remplaceIdSube(userId))
        },
        updateUser: userId => {
            dispatch(updateUser(userId))
        },
        createUser: controledUser => {
            dispatch(createUser(controledUser))
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
