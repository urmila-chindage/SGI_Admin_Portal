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
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const useStyles = makeStyles(theme => ({
  root: {marginBottom:theme.spacing(2)},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, committees, ...rest }) => {
  const classes = useStyles();
  const [committeeData, setCommitteeData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

 const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteCommitteeData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Committee?CId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
      toast.success(`${res.data.Message}`);
        
      })
      .catch(error => {
        console.log(error);
        toast.error(error);
      });
  };

  useEffect(() => {
    
  }, [committeeData]);


  
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <ToastContainer/>
      <PerfectScrollbar>
      {committees.slice(page * limit, page * limit + limit).map((d, i) => (
          <Box key={i}>
           
            <Typography color="textPrimary" variant="body1">
            {'Name: ' + d.CName + '  '}
              {'Year: ' + d.CYear}
            </Typography>
            <Button
                          color="secondary"
                          variant="contained"
                         
                          onClick={() => deleteCommitteeData(d.CId)}
                        >
                          Delete
                        </Button>
            <Box minWidth={1050}>
              <Table>
                <TableHead>
                  <TableRow>
                   
                    <TableCell>Sr. No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Designation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {d.addCommitteeData.map((committee, i) => (
                    <TableRow
                      hover
                      key={i}
                     
                    >
                     
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                          {i + 1}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{committee.MemberName}</TableCell>
                      <TableCell>{committee.Designation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>
          ))}
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={committees.length}
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
  committees: PropTypes.array.isRequired
};

export default Results;
