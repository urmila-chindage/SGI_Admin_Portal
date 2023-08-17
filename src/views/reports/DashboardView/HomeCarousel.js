import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Container,
  Divider,
  Fab,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const HomeCarousel = ({ className, ...rest }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%'
    },
    floatingBtn: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      float: 'right'
    }
  }));


  const classes = useStyles();
  const [profile, setProfile] = useState('');

  const uploadImages = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        setProfile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const submitImage = () => {
    const payload = {
      Images: profile
    };
    axios
      .post(
        'https://localhost:44312/api/SliderImage/InsertSliderImage',
        payload
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Carousel Images" />
      <Divider />
     
      <Typography color="textPrimary" variant="h4">
        Home Carousel Images:
      </Typography>
      <input
        type="file"
        name="profile"
        accept="image/*"
        onChange={uploadImages}
        required
      />

      <img className="profileImage" src={profile} alt="" />

      <Box my={2} bottom="0" width="100%" position="relative">
        <Button
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          onClick={() => submitImage()}
        >
          <AddIcon />
        </Button>
      </Box>
    </Card>
  );
};

export default HomeCarousel;
