import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, remplaceIdSube, updateUser, createUser } from '../redux/actions/userActions';
import axios from 'axios'
import UserForm from '../components/UserForm'
import { updateDateAndTime, fetchDateAndTime } from '../redux/actions/horariosActions';
import { fetchUsers } from '../redux/actions/allUsersActions';

class ProfileContainer extends Component {
    constructor (props){
        super(props)
        this.state = {
            switcher: false,
            controledUser: {
                nombre: '',
                apellido: '',
                dni: '',
                email: '',
                imgPerfil: '',
                levelAccess: '',
                password: '',
                subeId: '',
                telefono: '',
            }
        }
        this.handleSwitch = this.handleSwitch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        // horarioMaxthis.handleAdminMaker = this.handleAdminMaker.bind(this)
    }

    componentDidMount() {
        var aux = this.props.match.params.id
        if(aux){
            this.props.getUser(aux)
            this.props.fetchDateAndTime(aux); 
        }else{
            this.setState({controledUser:{subeId:this.props.user.subeId}})
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
                horarioMin: new Date(this.props.horarios.selectedTimeMin).toLocaleTimeString('en-GB'),
                horarioMax: new Date(this.props.horarios.selectedTimeMax).toLocaleTimeString('en-GB')
                })
            }            
            axios.put('/api/usuarios/', this.state.controledUser)
            .then(alert('Se ha modificado el usuario correctamente'))
            .then(() => this.props.fetchUsers())
        } else {
            const objNuevo = {...this.state.controledUser, ...this.props.horarios}            
            // let fn = this.props.createUser(objNuevo)
            axios.post('/api/usuarios/', objNuevo)
            .then(() => this.props.fetchUsers())
            .then(alert('Se ha creado un nuevo usuario'))
            .then(() => this.props.history.push('/home/'))
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
        },
        fetchDateAndTime: function(userID){
            dispatch(fetchDateAndTime(userID))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)




