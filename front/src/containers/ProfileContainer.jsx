import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, removeUser, makeUserAdmin, remplaceIdSube, updateUser, createUser, denunciarSUBE } from '../redux/actions/userActions';
import axios from 'axios'
import UserForm from '../components/UserForm'
import { updateDateAndTime, fetchDateAndTime } from '../redux/actions/horariosActions';
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
                dni: '',
                email: '',
                imgPerfil: '',
                levelAccess: '',
                password: '',
                subeId: '',
                telefono: 0,
                denuncia : false
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
        this.denunciarSUBE = this.denunciarSUBE.bind(this);
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

    bindSetState(value){
        console.log(value)
        this.setState({
            controledUser: {
                ...this.state.controledUser,
                imgPerfil: value
            }
        })
    }

    handleOnDrop(files, rejectedFiles, e) {
        let changeFiles = files[0]
        e.preventDefault()
        if(rejectedFiles && rejectedFiles.length > 0){
            const currentRejectedFile = rejectedFiles[0]
            const currentRejectedFileSize = currentRejectedFile.size
            if(currentRejectedFileSize > 250000){
                alert('Los MB de la imagen es demasiado grande')
            }
        }else{

            
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
                     getBase64(changeFiles)
        }
        //  return new Promise(function(resolve) {
        //     resolve(fn)
        // })
        // .then((res) => (res.data.id) ? this.props.history.push(`/userProfile/${res.data.id}`):
        // this.props.history.push('/userProfile/')
        // )

    }
    

    handleSwitch(e){
        e.preventDefault();
        this.setState({ switcher: !this.state.switcher })
    }

    handleChangeSube(e){
        e.preventDefault();
        this.setState({ buttonChangeSube: !this.state.buttonChangeSube,
                        controledUser : {
                            ...this.state.controledUser,
                            denuncia : false
                        } })
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
    denunciarSUBE(){
        let alturo = Object.assign({}, this.state.controledUser)
        alturo.denuncia = true;
        this.setState({
            controledUser : alturo
        })
        this.props.denunciarSUBE(this.state.controledUser.subeId)
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
                loggedUser={this.props.loggedUser}
                denunciarSUBE={this.denunciarSUBE} />
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
        },
        fetchDateAndTime: function(userID){
            dispatch(fetchDateAndTime(userID))
        },
        denunciarSUBE: (subeId) => {
            dispatch(denunciarSUBE(subeId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)




