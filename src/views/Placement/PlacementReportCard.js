import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    maxWidth: '200px',
    maxHeight: '200px'
  }
}));

const PlacementReportCard = ({ className, placement, ...rest }) => {
  const classes = useStyles();

  

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
         
              <a href="ffgfh" target="blank">
                <img alt="Staff" src="hfghfg" className={classes.image} />
              </a>
           
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
       gfhgfh
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
         yutu
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Campus Type: uyuy
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Eligible Departments: yuyui
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Organized By: yuiuyi
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Company Name: hjj
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Date: yuii
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
         
            <a href="fgfhfg" target="blank">
              <Grid className={classes.statsItem} item>
                <GetAppIcon className={classes.statsIcon} color="action" />

                <Typography
                  color="textSecondary"
                  display="inline"
                  variant="body2"
                >
                  Download File
                </Typography>
              </Grid>
            </a>
          
          <Box
           
          >
            <Grid className={classes.statsItem} item>
              <DeleteIcon className={classes.statsIcon} color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Delete Record
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
};

PlacementReportCard.propTypes = {
  className: PropTypes.string,
  placement: PropTypes.object.isRequired
};

export default PlacementReportCard;
