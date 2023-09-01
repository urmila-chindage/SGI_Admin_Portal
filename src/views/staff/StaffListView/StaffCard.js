import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

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

  const navigate= useNavigate();

  const handleFileChange = e => {
    fileRef.current.click();
  };

  const handleImageChange = e => {
    imageRef.current.click();
  };
  
  const deleteStaffData = async id => {
    await axios
      .delete(`https://localhost:44312/api/StaffData?StaffId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        navigate(0)
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent key={staff.StaffId}>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar alt="Staff Image" src={staff.Image} variant="square" />
        </Box>

        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {staff.FullName}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {staff.Designation}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {staff.Department}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {staff.Email}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {staff.Qualification}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {staff.Expertise}
        </Typography>
        <Divider />
        <Typography align="center" color="textPrimary" variant="body1">
          {staff.Experience}
        </Typography>
      </CardContent>

      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item>
           
            <a href={staff.Doc} target={staff.Doc}>
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
            <Button onClick={() => deleteStaffData(staff.StaffId)}>
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
                setCurrentlyEditing(staff.StaffId);
                console.info(staff.StaffId);
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
              name="Image"
              id="image"
              hidden
              ref={imageRef}
              onChange={e => e.target.files[0]}
              
            />
            <input 
              type="file" 
              name="Doc" 
              id="file" 
              hidden 
              ref={fileRef} />
          </>
          <Grid className={classes.statsItem} item>
            <Button onClick={handleImageChange}>
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
            <Button onClick={handleFileChange}>
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
