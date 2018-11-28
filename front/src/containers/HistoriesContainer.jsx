import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchHistories } from '../redux/actions/historiesActions';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from '../containers/TablePaginationContainer';

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
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
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
      fontSize: 14,
    },
    body: {
      fontSize: 20,
    },
  }))(TableCell);


class HistoriesContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5,
          }
        }
    componentDidMount(){
       this.props.fetchLogs()
    }
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
      };
    render(){
        const { logs, classes } = this.props;
        const { rowsPerPage, page } = this.state; 

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, (logs[0] ? logs.length : 0) - page * rowsPerPage);   

        return(
            <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Nombre Completo</CustomTableCell>
              <CustomTableCell >Hora de ingreso</CustomTableCell>
            </TableRow>
        </TableHead>
            <TableBody>
              {logs[0] && logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  console.log(row)
                return (
                  <TableRow key={row.id} hover >
                    <TableCell component="th" scope="row">
                      {row.nombrecompleto}
                    </TableCell>
                    <TableCell>{row.createdAt}</TableCell>
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
                  count={(logs[0] ? logs.length: 0)}
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
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        logs: state.logs,
    }
}
function mapDispatchToProps(dispatch, ownProps){
    return {
        fetchLogs : function(){
            dispatch(fetchHistories())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( withStyles(styles)(HistoriesContainer));