import React, { useState, useEffect } from 'react';
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
  Button,
  ListItemAvatar,
  Avatar
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  handleEditDrawerOpen,
  setCurrentlyEditing,
  testimonials,
  ...rest
}) => {
  const classes = useStyles();
  const [selectedTestimonial, setSelectedTestimonial] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteTestiminials = async id => {
    await axios
      .delete(`https://localhost:44312/api/Testimonials?TId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        toast.success("Record Deleted Successfully");
        navigate(0);
      })
      .catch(error => {
        console.log(error);
        toast.error(`${error.message}`);
        
      });
  };

useEffect(() => {
  console.log(testimonials);
  }, [testimonials]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
      <ToastContainer/>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Profile Image</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Action</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {testimonials
                .slice(page * limit, page * limit + limit)
                .map(testimonials => {
                  return (
                    <TableRow hover key={testimonials.TId}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {testimonials.Name}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>{testimonials.Desc}</TableCell>

                      <TableCell>
                        <img
                          src={testimonials.Image}
                          className="profileImage"
                        />
                      </TableCell>
                      <TableCell>{testimonials.CreatedDate}</TableCell>

                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteTestiminials(testimonials.TId)}
                        >
                          Delete
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          onClick={() => {
                            setCurrentlyEditing(testimonials.TId);
                            console.info(testimonials.TId);
                            handleEditDrawerOpen();
                          }}
                          color="secondary"
                          variant="contained"
                        >
                          Edit
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
        count={testimonials.length}
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
  testimonials: PropTypes.array.isRequired
};

export default Results;
