import React from 'react';
import {connect} from 'react-redux'
import ListaUsuarios from '../components/ListaUsuarios'

class ListaUsuariosContainers extends React.Component {
    constructor(props){
        super(props)
    }
render(){
    return (
        <div>
        <ListaUsuarios />
        </div>
    )
}
}
function mapStateToProps(state){
    return {

    }
}
function mapDispatchToProps(dispatch){
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListaUsuariosContainers)