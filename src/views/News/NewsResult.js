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

const NewsResults = ({ className, allNews, ...rest }) => {
  const classes = useStyles();
  const [newsData, setNewsData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteNewsData = async id => {
    await axios
      .delete(`https://localhost:44312/api/News?NId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        NotificationManager.success('News Data Deleted', 'Successful!', 2000);
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    
  }, [newsData]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Content</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allNews.slice(page * limit, page * limit + limit).map(news => {
                return (
                  <TableRow hover key={news.NId}>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                          {news.Title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell><a href={news.File} target={news.File}>
                        Open File
                      </a></TableCell>
                    <TableCell>{news.CreatedDate}</TableCell>
                    <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteNewsData(news.NId)}
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
        count={allNews.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
      />
    </Card>
  );
};

NewsResults.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default NewsResults;
