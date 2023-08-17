import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    TextField,
    useTheme,
    makeStyles
  } from '@material-ui/core';
  import React from 'react';
  import { useState } from 'react';
  import { useRef } from 'react';
  import clsx from 'clsx';
  
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3)
    }
  }));
  const Modal = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [modalData, setModalData] = useState({
      imageURL: '',
      moreInfoURL: ''
    });
  
    const fileRef = useRef(null);
  
    const handleImageChange = e => {
      fileRef.current.click();
    };

   return (
      <Card
        className={clsx(classes.root, className)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
        {...rest}
      >
        <CardHeader title="Modal Window" />
        <Divider />
        <Avatar alt={modalData.imageURL} src={modalData.imageURL} />
        <Button
          color="primary"
          size="large"
          variant="contained"
         
        >
          Change Image
        </Button>
        <input
          type="file"
          name="file"
          id="file"
          hidden
          
        />
        <TextField
          fullWidth
          label="More Info Link"
          margin="normal"
          name="this year"
          onChange={e => {
            setModalData({
              ...modalData,
              moreInfoURL: e.target.value
            });
          }}
          value={modalData.moreInfoURL}
          variant="outlined"
        />
        <Box my={2}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
           
          >
            Set
          </Button>
        </Box>
      </Card>
    );
  };
  
  export default Modal;
  