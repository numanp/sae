import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from '../containers/TablePaginationContainer'
import Search from '../components/Search'
import { fetchUsers } from '../redux/actions/allUsersActions'

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);



const styles = theme => ({
  root: {
    margin: '0 auto',
    width: '700px',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

class ListaUsuariosContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rows: [],
            page: 0,
            rowsPerPage: 5,
            inputValue:'',
          };
          this.handleChange=this.handleChange.bind(this);
    }
componentDidMount(){
    this.props.fetchUsers()
};
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChange = (e) => {
    this.setState({inputValue: e.target.value})
  }

  render() {
    const { classes,users } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, (users ? users.length : 0) - page * rowsPerPage);   

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
        <Search handleChange={this.handleChange} inputValue={this.state.inputValue} />
          <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Apellido y Nombre</CustomTableCell>
              <CustomTableCell >Horarios Permitidos</CustomTableCell>
              <CustomTableCell>Nivel de acceso</CustomTableCell>
            </TableRow>
        </TableHead>
            <TableBody>
              {users && users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.nombreCompleto}
                    </TableCell>
                    <TableCell>{row.subeId}</TableCell>
                    <TableCell>{row.levelAccess}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={(users ? users.length: 0)}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  }
}

function mapStateToProps(state){
  return {
    users: state.users[0],
  }
}
function mapDispatchToProps(dispatch){
  return {
    fetchUsers: function(){
        dispatch(fetchUsers())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)( withStyles(styles)(ListaUsuariosContainer) );