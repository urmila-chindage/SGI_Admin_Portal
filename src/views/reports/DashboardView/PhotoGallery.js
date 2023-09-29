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
  Typography,
  Grid,
  IconButton,
  makeStyles,
  TextField
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
// React Notification
import { NotificationManager } from 'react-notifications';


const PhotoGallery = ({ className, ...rest }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      padding: '15px'
    },
    floatingBtn: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      float: 'right'
    }
  }));

  const [photoGalleryImages, setPhotoGalleryImages] = useState([]);
  const [profile, setProfile] = useState('');

  const imageRef = useRef(null);

  const navigate = useNavigate();

  const classes = useStyles();

  const handleImageChange = e => {
    imageRef.current.click();
  };

  const uploadImages = e => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        setProfile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getPhotoGalleryImages = async () => {
    await axios
      .get('https://localhost:44312/api/ImageGallery')
      .then(res => {
        console.log(res.data.data);
        setPhotoGalleryImages(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const submitImage =  () => {
    const payload = {
      Images: profile
    };
     axios
      .post(
        'https://localhost:44312/api/ImageGallery',
        payload
      )
      .then(res => {
        console.log(res);
        //navigate(0);
        NotificationManager.success('Photo Gallery Image is added!', 'Successful!', 2000);
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deletePhotoGalleryImage =  (id) => {
   
     axios
      .delete(`https://localhost:44312/api/ImageGallery?IGId=${id}`)
      .then(res => {
        console.log('Record is deleted', res);
        //navigate(0);
        NotificationManager.success('Carousel Image is deleted!', 'Successful!', 2000);
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPhotoGalleryImages();
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      
      <CardHeader title="Photo Gallery Images" />
      <Divider />
      <Box m={3}>
        {photoGalleryImages.map((galleryImage, index) => (
          <Chip
            color="primary"
            avatar={<Avatar alt="Photo GAllery Images" src={galleryImage.Images} />}
            label={index + 1}
            target={galleryImage.Images}
            onClick={() => {
              window.open(galleryImage.Images, 'width=200, height=200');
            }}
            onDelete={() => {
              deletePhotoGalleryImage(galleryImage.IGId);
            }}
            key={index}
            style={{margin:"5px"}}
          />
        ))}
      </Box>

      <input
        type="file"
        name="Image"
        id="image"
        hidden
        ref={imageRef}
        onChange={uploadImages}
      />

      <Box m={1} display="flex" justifyContent="center" alignItems="center">
        <Button
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={handleImageChange}
        >
          <AddIcon />
        </Button>
        <img src={profile}  alt="Carousel Image" style={{width:"60px",height:"60px",border:"1px solid #000",marginLeft:"5px"}}/>
      </Box>

     

      <Box my={2} bottom="0" width="100%" position="relative">
        <Button
          color="primary"
          fullWidth
          size="large"
          variant="contained"
          onClick={() => submitImage()}
        >
          Set Image
        </Button>
      </Box>
    </Card>
  );
};

export default PhotoGallery;
