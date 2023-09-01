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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, library, ...rest }) => {
  const classes = useStyles();
  const [libraryData, setLibraryData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteLibraryData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Library?LId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        NotificationManager.success(
          'Library Data is Deleted',
          'Successful!',
          2000
        );
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    
  }, [libraryData]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             
              {library
                .slice(page * limit, page * limit + limit)
                .map(lab => {
                  return (
                    <TableRow hover key={lab.LId}>
                <TableCell>
                  <Box alignItems="center" display="flex">
                    <Typography color="textPrimary" variant="body1">
                     {lab.Title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <a href={lab.File} target="_blank">
                    Open File
                  </a>
                </TableCell>
                <TableCell>{lab.Category}</TableCell>
                <TableCell>{lab.CreatedDate}</TableCell>
                <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteLibraryData(lab.LId)}
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
        count={library.length}
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
