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
  makeStyles,
  Button
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const LinksResult = ({ className, links, ...rest }) => {
  const classes = useStyles();
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  

  const handleSelectAll = event => {
    let newSelectedLinks;

    if (event.target.checked) {
      newSelectedLinks = links.map(update => update.key);
    } else {
      newSelectedLinks = [];
    }

    setSelectedLinks(newSelectedLinks);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedLinks.indexOf(id);
    let newSelectedLinks = [];

    if (selectedIndex === -1) {
      newSelectedLinks = newSelectedLinks.concat(selectedLinks, id);
    } else if (selectedIndex === 0) {
      newSelectedLinks = newSelectedLinks.concat(selectedLinks.slice(1));
    } else if (selectedIndex === selectedLinks.length - 1) {
      newSelectedLinks = newSelectedLinks.concat(selectedLinks.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedLinks = newSelectedLinks.concat(
        selectedLinks.slice(0, selectedIndex),
        selectedLinks.slice(selectedIndex + 1)
      );
    }

    setSelectedLinks(newSelectedLinks);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const convertTimestampToDate = tmstp => {
    let d = new Date(tmstp);
    let date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    return date;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Button
        color="secondary"
        variant="contained"
       
      >
        Delete Selected
      </Button>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                 
                </TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Raw</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Posted On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             
                  <TableRow
                    hover
                   
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                       
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        alignItems="center"
                        display="flex"
                      
                      ></Box>
                    </TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                       hgjhjh
                      </Box>
                    </TableCell>
                    <TableCell>
                     ttyhgjghj
                    </TableCell>
                    <TableCell>
                    ghgjhjh
                    </TableCell>
                  </TableRow>
              
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={links.length}
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
  customers: PropTypes.array.isRequired
};

export default LinksResult;
