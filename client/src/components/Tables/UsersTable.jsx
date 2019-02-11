import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

function UsersTable({ ...props }) {
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
                  {prop.email}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.username}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.first_name}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.last_name}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.company}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.country}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {prop.city}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

UsersTable.defaultProps = {
  tableHeaderColor: "gray"
};

UsersTable.propTypes = {
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
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(UsersTable);
