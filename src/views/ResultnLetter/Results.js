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


const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, items, ...rest }) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

 

  const handleSelectAll = event => {
    let newselectedData;

    if (event.target.checked) {
      newselectedData = items.map(update => update.key);
    } else {
      newselectedData = [];
    }

    setSelectedData(newselectedData);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedData.indexOf(id);
    let newselectedData = [];

    if (selectedIndex === -1) {
      newselectedData = newselectedData.concat(selectedData, id);
    } else if (selectedIndex === 0) {
      newselectedData = newselectedData.concat(selectedData.slice(1));
    } else if (selectedIndex === selectedData.length - 1) {
      newselectedData = newselectedData.concat(selectedData.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedData = newselectedData.concat(
        selectedData.slice(0, selectedIndex),
        selectedData.slice(selectedIndex + 1)
      );
    }

    setSelectedData(newselectedData);
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

  // useEffect(() => {
  //   console.log(selectedData);
  // }, [selectedData])

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
                <TableCell>Title</TableCell>
                <TableCell>description</TableCell>
                <TableCell>File</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Sem</TableCell>
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
                      <Box alignItems="center" display="flex">
                        <Typography color="textPrimary" variant="body1">
                         fgfgf
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>uyu</TableCell>
                    <TableCell>
                      <a href="dfg" target="blank">
                        Open File
                      </a>
                    </TableCell>
                    <TableCell>uyuyu</TableCell>
                    <TableCell>ytyu</TableCell>
                    <TableCell>ttyyu</TableCell>
                    <TableCell>
                    hjhjh
                    </TableCell>
                  </TableRow>
               
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={items.length}
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
