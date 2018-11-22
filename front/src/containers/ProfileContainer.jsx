import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, removeUser, makeUserAdmin, remplaceIdSube, updateUser, createUser } from '../redux/actions/userActions';
import axios from 'axios'

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
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount() {
        this.props.getUser(1)
        
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            controledUser : nextProps.user
        })
    }

    handleSwitch(e){
        e.preventDefault();
        this.setState({ switcher: !e.switcher })
    }

    handleChange(e){
        e.preventDefault();
        let keyValue = e.target.id
        let value = e.target.value
        this.setState({
            controledUser : {
                ...this.state.controledUser,
                [keyValue] : value
            }
        })
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.controledUser.id){
            axios.put('/api/usuarios/', this.state.controledUser)
            .then(alert('Se ha modificado el usuario correctamente'))
        } else {
            this.props.createUser(this.state.controledUser)
        }
    }

    deleteUser(e){
        e.preventDefault();
        axios.delete('/api/usuarios/',{ params: {id: this.state.controledUser.id} })
        .then(<Redirect to='/'/>)

    }

    render() {
        console.log('STATEEEE', this.state)
        return(
                <UserForm switcher={this.state.switcher} user={this.state.controledUser} handleSwitch={this.handleSwitch} handleChange={this.handleChange} deleteUser={this.deleteUser} changeSube={this.remplaceIdSube} handleSubmit={this.handleSubmit}/>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        user: state.user.user
    }
}
function mapDispatchToProps(dispatch, ownProps){
    return{
        getUser: (userId) => {
            dispatch(getUser(userId));
          },
        makeUserAdmin: userId => {
            dispatch(makeUserAdmin(userId));
          },
        remplaceIdSube: userId => {
            dispatch(remplaceIdSube(userId))
        },
        createUser: controledUser => {
            dispatch(createUser(controledUser))
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
