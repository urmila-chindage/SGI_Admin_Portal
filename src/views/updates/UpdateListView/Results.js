import React, { useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
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
import getInitials from 'src/utils/getInitials';
import { useEffect } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, updates, ...rest }) => {
  const classes = useStyles();
  const [updateData, setUpdateData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

const deleteUpdateData = async id => {
  console.log(id);
    await axios
      .delete(
        `https://localhost:44312/api/LatestUpdate/DeleteLUpdateByUId?UId=${id}`
      )
      .then(res => {
        console.log('Record is deleted', res);
        toast.success(`${res.data.Message}`)
      })
      .catch(error => {
        console.log(error);
        toast.error(`${error.message}`);
      });
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

useEffect(() => {
    
  }, [updates]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
     <ToastContainer></ToastContainer>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Uploaded on</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {updates
                .slice(page * limit, page * limit + limit)
                .map(update => {
                  return (
                    <TableRow hover key={update.UId}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <a href={update.Image} target="_blank">
                            <Avatar className={classes.avatar} src={update.Image}>
                              {update.Image}
                            </Avatar>
                          </a>
                          <Typography color="textPrimary" variant="body1">
                            {update.Title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{update.Description}</TableCell>
                      <TableCell>
                        <a  href={update.File} target="_blank">
                          Open File
                        </a>
                      </TableCell>
                      <TableCell>{update.CreatedDate}</TableCell>

                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteUpdateData(update.UId)}
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
        count={updates.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  updates: PropTypes.array.isRequired
};

export default Results;
