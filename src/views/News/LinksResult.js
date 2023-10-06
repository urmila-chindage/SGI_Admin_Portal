import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  makeStyles,
  Button
} from '@material-ui/core';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const LinksResult = ({ className, importantLinks, ...rest }) => {
  const classes = useStyles();
  const [linksData, setLinksData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const deleteImportantLinksData = async id => {
    await axios
      .delete(`https://localhost:44312/api/ImportantLink?ILId=${id}`)
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

  useEffect(() => {}, [linksData]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
    <ToastContainer/>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Content</TableCell>
                <TableCell>Raw</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {importantLinks
                .slice(page * limit, page * limit + limit)
                .map(links => {
                  return (
                    <TableRow hover key={links.ILId}>
                      <TableCell>
                        <Box
                          alignItems="center"
                          display="flex"
                          dangerouslySetInnerHTML={{ __html: links.HtmlContent }}
                        ></Box>
                      </TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          {links.HtmlContent}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {links.FileButton ? (
                          <a href={links.File} target={links.File}>
                            Download File
                          </a>
                        ) : (
                          'No File'
                        )}
                      </TableCell>
                      <TableCell>
                        {links.CreatedDate}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="secondary"
                          variant="contained"
                          onClick={() => deleteImportantLinksData(links.ILId)}
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
        count={importantLinks.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
      />
    </Card>
  );
};

LinksResult.propTypes = {
  className: PropTypes.string,
  importantLinks: PropTypes.array.isRequired
};

export default LinksResult;
