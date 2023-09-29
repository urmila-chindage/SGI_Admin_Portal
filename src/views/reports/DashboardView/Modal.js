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
  import { NotificationManager } from 'react-notifications';
  import { useNavigate } from 'react-router-dom';
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  
  const useStyles = makeStyles(theme => ({
    root: {
      //backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      padding: theme.spacing(3),
      //paddingTop: theme.spacing(3)
    },
    Button : {
        marginTop : "10px"
    }
  }));

  const Modal = ({ className, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();

    //const [uploadImage,setUploadImage] = useState('');
    //const [moreInfoLink,setMoreInfoLink] = useState('');

    const [modalImage,setModalImage] = useState({
       uploadImage : "",
       moreInfoLink : ""
    })

    const navigate = useNavigate();

    const [displayModalImage,setDisplayModalImage] = useState([]);

    const fileRef = useRef(null);
  
    const modalUploadImage = e => {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          setModalImage({...modalImage,uploadImage : e.target.result})
          //setUploadImage(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };

    const handleImageChange = e => {
      fileRef.current.click();
    };

    const saveModalData = async() =>{
      const payload = {
        MWImage : modalImage.uploadImage,
        MWLink : modalImage.moreInfoLink
       
      }
       await axios.post("https://localhost:44312/api/ModalWindow",payload)
      .then((res)=>{
        console.log(res);
        // NotificationManager.success('Modal Image is Added!', 'Successful!', 2000);
        toast.success(`${res.data.Message}`);
        // navigate('/');
      })
      .catch((error)=>{
        console.log(error);
        toast.error(`${error.message}`);
      })
    }

    const getModalData = async() =>{
      await axios
      .get('https://localhost:44312/api/ModalWindow')
      .then(res => {
        let modalData = res.data.data
        console.log(modalData.length)
        for(let i = 0; i < modalData.length; i++){
          setModalImage({
            ...modalImage,
            uploadImage: modalData[i].MWImage,
            moreInfoLink: modalData[i].MWLink,
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    }

    useEffect(()=>{
      getModalData();
    },[])

    

   return (
    <>
          <ToastContainer />
      <Card
        className={clsx(classes.root)}
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
        <Avatar alt="Modal Image" src={modalImage.uploadImage} m={3} onClick={() => {
              window.open(modalImage.uploadImage, 'width=200, height=200');
            }}/>
        <Box my={2}> 
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={handleImageChange}
          >
              Change Image
          </Button>
         </Box>
        <input
          type="file"
          name="modalImage"
          id="file"
          ref={fileRef}
          hidden
          onChange={modalUploadImage}
        />

        <img src={modalImage.uploadImage} style={{width:"60px",height:"60px",border:"1px solid #000",marginLeft:"5px",marginTop:"10px"}}/>

      <TextField
          fullWidth
          label="More Info Link"
          margin="normal"
          name="this year"
          onChange={e => {
            setModalImage({ ...modalImage, moreInfoLink: e.target.value });
          }}
          
          value={modalImage.moreInfoLink}
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
      </>
    );
  };
  
  export default Modal;
  