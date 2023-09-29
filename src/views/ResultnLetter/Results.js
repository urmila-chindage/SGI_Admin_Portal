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
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, resultnLetter, ...rest }) => {
  const classes = useStyles();
  const [resultData, setResultData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteResultData = async id => {
    await axios
      .delete(`https://localhost:44312/api/ResultnLetter?RId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
     toast.success(`${res.data.Message}`);
      })
      .catch(error => {
        console.log(error);
        toast.error(error);
      });
  };

  useEffect(() => {}, [resultData]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
    <ToastContainer/>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>description</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Sem</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultnLetter
                .slice(page * limit, page * limit + limit)
                .map(result => {
                  return (
                    <TableRow hover key={result.RId}>
                     
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {result.Title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{result.Description}</TableCell>
                      <TableCell>
                        <a href={result.File} target="blank">
                          Open File
                        </a>
                      </TableCell>
                      <TableCell>{result.Category}</TableCell>
                      <TableCell>{result.Level}</TableCell>
                      <TableCell>{result.Semester}</TableCell>
                      <TableCell>{result.CreatedDate}</TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteResultData(result.RId)}
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
        count={resultnLetter.length}
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
  resultnLetter: PropTypes.array.isRequired
};

export default Results;
