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

let counter = 0;
function createData(name, horarios, levelAccess) {
  counter += 1;
  return { id: counter, name, horarios, levelAccess };
}

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
    fontSize: 14,
  },
}))(TableCell);

class ListaUsuariosContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rows: [
              createData('Cupcake', 305, 3.7),
              createData('Donut', 452, 25.0),
              createData('Eclair', 262, 16.0),
              createData('Frozen yoghurt', 159, 6.0),
              createData('Gingerbread', 356, 16.0),
              createData('Honeycomb', 408, 3.2),
              createData('Ice cream sandwich', 237, 9.0),
              createData('Jelly Bean', 375, 0.0),
              createData('KitKat', 518, 26.0),
              createData('Lollipop', 392, 0.2),
              createData('Marshmallow', 318, 0),
              createData('Nougat', 360, 19.0),
              createData('Oreo', 437, 18.0),
            ].sort((a, b) => (a.horarios < b.horarios ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
            inputValue:'',
          };
          this.handleChange=this.handleChange.bind(this);
    }


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
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.horarios}</TableCell>
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
                  count={rows.length}
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

  }
}
function mapDispatchToProps(dispatch){
  return {

  }
}

export default connect(mapStateToProps,mapDispatchToProps)( withStyles(styles)(ListaUsuariosContainer) );