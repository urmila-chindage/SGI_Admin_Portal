import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';
import { store } from 'react-notifications-component';
import EditIcon from '@material-ui/icons/Edit';

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
  }
}));

const StaffCard = ({
  className,
  staff,
  handleEditDrawerOpen,
  setCurrentlyEditing,
  ...rest
}) => {
  const classes = useStyles();

  const fileRef = useRef(null);
  const imageRef = useRef(null);

 

 
  const changeImageAsync = async image => {
    // const ref = storageRef.child('staff-picture').child(name);
    // const snapshot = await ref.put(image);
    // return await snapshot.ref.getDownloadURL();
    console.log("Staff Members Added")
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            alt="Staff Image"
            src={staff.imageDownloadUrl}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
         Urmila Sirase
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          FrontEnd Developer
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          urmilachindage@gmail.com
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          3
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          Development
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          IT
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
         BEIT
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
            <a href={staff.resumeDownloadUrl} target="blank">
              <GetAppIcon className={classes.statsIcon} color="action" />

              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Download Resume
              </Typography>
            </a>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Button>
              <DeleteIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Delete Staff
              </Typography>
            </Button>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Button
              onClick={() => {
                setCurrentlyEditing(staff.key);
                console.info(staff.key);
                handleEditDrawerOpen();
              }}
            >
              <EditIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Edit Data
              </Typography>
            </Button>
          </Grid>
          <>
            <input
              type="file"
              name="image"
              id="image"
              hidden
              ref={imageRef}
              onChange={e => {
                let file = e.target.files[0];
                // console.log(file);
                // console.log('Clicked on file');
                changeImageAsync(file);
              }}
            />
            <input
              type="file"
              name="file"
              id="file"
              hidden
              ref={fileRef}
            
            />
          </>
          <Grid className={classes.statsItem} item>
            <Button>
              <EditIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Change Image
              </Typography>
            </Button>
          </Grid>
          <Grid className={classes.statsItem} item>
            <Button>
              <EditIcon className={classes.statsIcon} color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              >
                Change Resume
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

StaffCard.propTypes = {
  className: PropTypes.string,
  staff: PropTypes.object.isRequired
};

export default StaffCard;
