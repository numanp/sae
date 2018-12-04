import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, removeUser, makeUserAdmin, remplaceIdSube, updateUser, createUser } from '../redux/actions/userActions';
import axios from 'axios'

import UserForm from '../components/UserForm'
import { updateDateAndTime } from '../redux/actions/horariosActions';
import { fetchUsers } from '../redux/actions/allUsersActions';

class ProfileContainer extends Component {
    constructor (props){
        super(props)
        this.state = {
            switcher: false,
            buttonChangeSube: false,
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
        this.handleChangeSube = this.handleChangeSube.bind(this)
        // horarioMaxthis.handleAdminMaker = this.handleAdminMaker.bind(this)
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

    handleChangeSube(e){
        e.preventDefault();
        this.setState({ buttonChangeSube: !this.state.buttonChangeSube })
    }

    handleChange(e){
        e.preventDefault();
        let keyValue = e.target.id
        let value = e.target.value
        this.setState(state => {
            const obj = {...state.controledUser,
                [keyValue] : value
            }
            this.props.updateUser(obj);
            return obj;
        })
    }

    handleSubmit(e){
        e.preventDefault();
       
        
        if(this.state.controledUser.id){  
            if(this.props.horarios.dias){        
            this.props.updateDateAndTime(this.props.match.params.id,{
                dias:this.props.horarios.dias,
                fechaInicio:this.props.horarios.selectedDateInicio,
                fechaFin:this.props.horarios.selectedDateFin,
                horarioMin:this.props.horarios.selectedTimeMin.toString().slice(15,24),
                horarioMax: this.props.horarios.selectedTimeMax.toString().slice(15,24)
                })
            }
            axios.put('/api/usuarios/', this.state.controledUser)
            .then(alert('Se ha modificado el usuario correctamente'))
            .then(() => this.props.fetchUsers())
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
                <UserForm logout={this.props.logOut} 
                switcher={this.state.switcher} 
                handleInputChangeSube={this.handleInputChangeSube} 
                changeSubeButton={this.state.buttonChangeSube}
                handleChangeSube={this.handleChangeSube}
                user={this.state.controledUser} 
                handleSwitch={this.handleSwitch} 
                handleChange={this.handleChange} 
                deleteUser={this.deleteUser} 
                handleSubmit={this.handleSubmit} 
                handleAdminMaker={this.handleAdminMaker}
                loggedUser={this.props.loggedUser} />
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        user: state.user.user,
        horarios:state.horarios,
        loggedUser : state.user.loggedUser
    }
}
function mapDispatchToProps(dispatch, ownProps){
    return{
        getUser: (userId) => {
            dispatch(getUser(userId));
          },
        updateUser: (usuario) =>{
            dispatch(updateUser(usuario))
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
        },
        fetchUsers: () => {
            dispatch(fetchUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)




