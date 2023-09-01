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

const useStyles = makeStyles((theme) => ({
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

const ActivityCard = ({ className, activity, ...rest }) => {
  const classes = useStyles();

  


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          
          
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          dfgfgdffg
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          ghghfggh
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Type: {" "}gjhgjhj
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Department: {" "}ghhgj
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Duration: {" "}ytuyu
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Category: {" "}tytuyu
        </Typography>
        <Divider />
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          Date: {" "}hgfjhgj
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
       
          <a href="fgfgfgh" target="blank">
          <Grid
            className={classes.statsItem}
            item
          >
            <GetAppIcon
              className={classes.statsIcon}
              color="action"
            />
            
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
        <Grid
            className={classes.statsItem}
            item
          >
            <DeleteIcon
              className={classes.statsIcon}
              color="action"
            />
            
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

ActivityCard.propTypes = {
  className: PropTypes.string,
  activity: PropTypes.object.isRequired
};

export default ActivityCard;
