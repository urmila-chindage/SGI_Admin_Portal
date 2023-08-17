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
    TextField
  } from '@material-ui/core';
  import React from 'react';
  import { useState } from 'react';
  import clsx from 'clsx';
  import { useEffect } from 'react';

  import AddIcon from '@material-ui/icons/Add';
  import { v4 as uuid } from 'uuid';
  import profile from "../../../Images/avatar_6.png";
  
  const ImgCarousel = ({ className, ...rest }) => {
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
  
    const [data, setData] = useState([]);
    const classes = useStyles();
  
    const handleButtonClick = () => {
      let ele = document.getElementById('gallery-file');
      ele.click();
    };
  
   
  
   
  
    
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Image Gallery" />
        <Divider />
        <Box m={3}>
          
            <Chip
              color="primary"
              avatar={<Avatar alt="Natacha" src={profile}/>}
              label="Avatar image"
             
              
            />
         
        </Box>
        <TextField
          fullWidth
          label="Students This Year"
          margin="normal"
          name="this year"
          type="file"
          id="gallery-file"
         
          style={{ display: 'none' }}
        />
        <Box my={2} bottom="0" width="100%" position="relative">
          <Button
            color="primary"
            fullWidth
            size="large"
            variant="contained"
          
          >
            <AddIcon />
          </Button>
        </Box>
      </Card>
    );
  };
  
  export default ImgCarousel;
  