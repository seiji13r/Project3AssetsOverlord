import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "components/CustomButtons/Button.jsx";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

function ReadersTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key}>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.name}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.mac}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.ip}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.firmware}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.antenna_port}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.brand}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.model}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.location}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.notes}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  <Button
                    color="info"
                    onClick={() => props.onUpdateClick(prop.id)}
                    size="sm"
                  >
                    <Edit />
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    onClick={() => props.onDeleteClick(prop.id)}
                    size="sm"
                  >
                    <Delete />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

ReadersTable.defaultProps = {
  tableHeaderColor: "gray"
};

ReadersTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onDeleteClick: PropTypes.func,
  onUpdateClick: PropTypes.func
};

export default withStyles(tableStyle)(ReadersTable);
