import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, removeUser, makeUserAdmin, remplaceIdSube, updateUser } from '../redux/actions/userActions';


class ProfileContainer extends Component {
    constructor (props){
        super(props)
        this.state = {
            switcher: false,
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            dni: '',
            telefono: '',
            imgPerfil: '',
            levelAcces: '',
            subeId: '',
        }
    }

    componentDidMount() {
        this.props.getUser();
      }

    handleSwitch(e){
        e.preventDefault();
        this.setState({ switcher: !e.switcher })
    }

    render() {
        return(
            <div>
                hola
            </div>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        user: state.users.user
    }
}
function mapDispatchToProps(dispatch, ownProps){
    return{
        getUser: (userId) => {
            dispatch(getUser(userId));
          }, //OK
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
