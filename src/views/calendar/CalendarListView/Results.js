import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, calendars, ...rest }) => {
  const classes = useStyles();
  const [calendarData, setCalendarData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteCalendarData = async id => {
    await axios
      .delete(
        `https://localhost:44312/api/Calendar?CId=${id}`
      )
      .then(res => {
        console.log('Record is deleted', res);
        NotificationManager.success('Calendar Data Deleted', 'Successful!', 2000);
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    
  }, [calendarData]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
            {calendars
                .slice(page * limit, page * limit + limit)
                .map(calendar => {
                  return (
              <TableRow hover key={calendar.CId}>
              
                <TableCell>
                  <Box alignItems="center" display="flex">
                    <Typography color="textPrimary" variant="body1">
                      {calendar.Year}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{calendar.Level}</TableCell>
                <TableCell>
                  <a href={calendar.File} target={calendar.File}>
                    Open File
                  </a>
                </TableCell>
                <TableCell>{calendar.Department}</TableCell>
                <TableCell>{calendar.CreatedDate}</TableCell>

                <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteCalendarData(calendar.CId)}
                        >
                          Delete
                        </Button>
                      </TableCell>
              </TableRow>
               );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={calendars.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
