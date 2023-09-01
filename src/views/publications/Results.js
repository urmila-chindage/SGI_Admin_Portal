import React, { useState } from 'react';
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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, publications, ...rest }) => {
  const classes = useStyles();
  const [publicationData, setPublicationData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const deletePublicationData = async id => {
    await axios
      .delete(`https://localhost:44312/api/Publication?PId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        NotificationManager.success(
          'Publication Data is Deleted',
          'Successful!',
          2000
        );
        navigate(0);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    console.log(publicationData);
  }, [publicationData]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
               
                <TableCell>Title</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Published By</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Published in</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {publications
                .slice(page * limit, page * limit + limit)
                .map(publication => {
                  return (
                    <TableRow hover key={publication.PId}>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {publication.PTitle}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{publication.PName}</TableCell>
                      <TableCell>{publication.Publishedby}</TableCell>
                      <TableCell>{publication.PCategory}</TableCell>
                      <TableCell>{publication.PPlatformName}</TableCell>
                      <TableCell>{publication.PYear}</TableCell>
                      <TableCell>{publication.CreatedDate}</TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deletePublicationData(publication.PId)}
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
        count={publications.length}
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
