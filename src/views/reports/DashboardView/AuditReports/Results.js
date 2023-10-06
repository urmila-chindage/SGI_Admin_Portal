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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, audit, ...rest }) => {
  const classes = useStyles();
  const [auditReport, setAuditReport] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

 const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteAuditData = async id => {
    await axios
      .delete(`https://localhost:44312/api/AuditReport?ARId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        toast.success(`${res.data.Message}`);
        navigate(0);
      })
      .catch(error => {
        console.log(error);
        toast.error(error);
      });
  };
  
  useEffect(() => {
    console.log(auditReport);
    }, [auditReport]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>title</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {audit
                .slice(page * limit, page * limit + limit)
                .map(auditItem => {
                  return (
                  <TableRow hover key={auditItem.ARId}>
                   
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          {auditItem.Title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <a href={auditItem.File} target={auditItem.File}>
                        Download File
                      </a>
                    </TableCell>
                    <TableCell>
                      {auditItem.CreatedDate}
                    </TableCell>

                    <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteAuditData(auditItem.ARId)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                  </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={audit.length}
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
  className: PropTypes.string
};

export default Results;
