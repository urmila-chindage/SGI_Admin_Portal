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
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className,handleEditDrawerOpen,testimonials,...rest }) => {
  const classes = useStyles();
  const [selectedTestimonial, setSelectedTestimonial] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

 
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  

    

  const getAllTestimonials = async () => {
    setLoading(true);
    await axios
      .get('https://localhost:44312/api/Testimonials')
      .then(res => {
        console.log(res.data.data);
           setSelectedTestimonial(res.data.data);
        })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteTestiminials = async(id) => {
    await axios.delete(`https://localhost:44312/api/Testimonials?TId=${id}`)
      .then(res => {
       
        console.log('Record is deleted', res);
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  const editTestimonials = async(id) => {
    await axios
      .put(`https://localhost:44312/api/Testimonials/${id}`)
      .then(res => {
       
        console.log('Record is edited', res);
      })
      .catch(error => {
        console.log(error);
      });
  };


  useEffect(() => {
    getAllTestimonials();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Profile Image</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {selectedTestimonial.slice((page * limit), ((page * limit) + limit)).map((testimonials) => {
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
                      <img src={testimonials.Image} className="profileImage" />
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
                        color="secondary"
                        variant="contained"
                        onClick={() => {
                          editTestimonials(testimonials.TId)
                         
                        }}
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
        count={selectedTestimonial.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1,2,3, 5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
