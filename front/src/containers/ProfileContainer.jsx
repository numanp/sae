import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, removeUser, makeUserAdmin, remplaceIdSube, updateUser, createUser } from '../redux/actions/userActions';
import axios from 'axios'

import UserForm from '../components/UserForm'
import { updateDateAndTime } from '../redux/actions/horariosActions'

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
                telefono: 0,
            }
        }
        this.handleSwitch = this.handleSwitch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        // this.handleAdminMaker = this.handleAdminMaker.bind(this)
    }

    componentDidMount() {


        var aux = this.props.match.params.id
        if(aux){
            this.props.getUser(aux)
        }
        
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            controledUser : nextProps.user
        })
    }

    handleSwitch(e){
        e.preventDefault();
        this.setState({ switcher: !this.state.switcher })
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
            this.props.updateDateAndTime(this.props.match.params.id,{
                dias:this.props.horarios.dias,
                fechaInicio:this.props.horarios.selectedDateInicio,
                fechaFin:this.props.horarios.selectedDateFin,
                horarioMin:this.props.horarios.selectedTimeMin.toString().slice(15,24),
                horarioMax: this.props.horarios.selectedTimeMax.toString().slice(15,24)
                })
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
        return(
                <UserForm logout={this.props.logOut} switcher={this.state.switcher} user={this.state.controledUser} handleSwitch={this.handleSwitch} handleChange={this.handleChange} deleteUser={this.deleteUser} changeSube={this.remplaceIdSube} handleSubmit={this.handleSubmit} handleAdminMaker={this.handleAdminMaker}/>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        user: state.user.user,
        horarios:state.horarios,
    }
}
function mapDispatchToProps(dispatch, ownProps){
    return{
        getUser: (userId) => {
            dispatch(getUser(userId));
          },
        remplaceIdSube: userId => {
            dispatch(remplaceIdSube(userId))
        },
        createUser: controledUser => {
            dispatch(createUser(controledUser))
        },
        updateDateAndTime: function(userId,dateTime){
            dispatch(updateDateAndTime(userId,dateTime))
        },
        logOut : function(){
            dispatch(logOutUser())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)




