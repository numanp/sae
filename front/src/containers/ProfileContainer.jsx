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
        this.handleOnDrop = this.handleOnDrop.bind(this)
        this.bindSetState = this.bindSetState.bind(this)
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

    bindSetState(value){
        console.log(value)
        this.setState({
            controledUser: {
                ...this.state.controledUser,
                imgPerfil: value
            }
        })
    console.log('LLEGOOOOO', this.state)
    }

    handleOnDrop(files, rejectedFiles,e) {
        let changeFiles = files[0]
        e.preventDefault()
        if(rejectedFiles && rejectedFiles.length > 0){
            const currentRejectedFile = currentRejectedFile[0]
            const currentRejectedFileSize = currentRejectedFile.size
            if(currentRejectedFileSize > 250000){
                alert('Los MB de la imagen es demasiado grande')
            }
        }

        const bindThis = this

        function getBase64(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
              bindThis.bindSetState(reader.result)
            };
            reader.onerror = function (error) {
              console.log('Error: ', error);
            };
         }
        //  return new Promise(function(resolve) {
        //     resolve(fn)
        // })
        // .then((res) => (res.data.id) ? this.props.history.push(`/userProfile/${res.data.id}`):
        // this.props.history.push('/userProfile/')
        // )
         getBase64(changeFiles)

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
                handleOnDrop = {this.handleOnDrop}
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




