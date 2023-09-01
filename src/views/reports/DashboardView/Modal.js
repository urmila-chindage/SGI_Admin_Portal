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
  import React, { useEffect } from 'react';
  import { useState } from 'react';
  import { useRef } from 'react';
  import clsx from 'clsx';
  import axios from "axios";
  
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      padding: theme.spacing(3),
      //paddingTop: theme.spacing(3)
    }
  }));

  const Modal = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [uploadImage,setUploadImage] = useState('');
    const [moreInfoLink,setMoreInfoLink] = useState('');

    const [displayModalImage,setDisplayModalImage] = useState([]);

    const fileRef = useRef(null);
  
    const modalUploadImage = e => {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
         
          setUploadImage(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    const handleImageChange = e => {
      fileRef.current.click();
    };

    const saveModalData = async() =>{
      const payload = {
        MWImage : uploadImage,
        MWLink : moreInfoLink
       
      }
       await axios.post("https://localhost:44312/api/ModalWindow",payload)
      .then((res)=>{
        console.log(res);
       
      })
      .catch((error)=>{
        console.log(error);
      })
    }

    const getModalData = async() =>{
      await axios
      .get('https://localhost:44312/api/ModalWindow')
      .then(res => {
        console.log(res.data.data);
        const modalImageData = res.data.data;
       
        console.log(modalImageData[modalImageData.length-1])

        const latestData = modalImageData[modalImageData.length-1];

        setDisplayModalImage({
          uploadImage : latestData.MWImage,
          moreInfoLink : latestData.MWLink
        })
      })
      .catch(error => {
        console.log(error);
      });
    }

    useEffect(()=>{
      getModalData();
    },[])

    

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
        <Avatar alt="Modal Image" src={displayModalImage.MWImage}/>
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={handleImageChange}
        >
          Change Image
        </Button>
         
        <input
          type="file"
          name="modalImage"
          id="file"
          ref={fileRef}
          hidden
          onChange={modalUploadImage}
        />

        <img src={uploadImage} style={{width:"60px",height:"60px",border:"1px solid #000",marginLeft:"5px"}}/>

      <TextField
          fullWidth
          label="More Info Link"
          margin="normal"
          name="this year"
          onChange={e => setMoreInfoLink(e.target.value)}
          
          value={moreInfoLink}
          variant="outlined"
        />
        <Box my={2}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
           onClick={()=>saveModalData()}
          >
            Set
          </Button>
        </Box>
      </Card>
    );
  };
  
  export default Modal;
  