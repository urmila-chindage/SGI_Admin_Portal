import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewAttachment = ({ className, ...rest }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      marginTop:'20px',
      padding:'10px'
    }
  }));

  const [data, setData] = useState({
    fileName: '',
    file: null,
  });
  const [isDisabled, setIsDisables] = useState(false);
  const classes = useStyles();

  const navigate = useNavigate();

  const uploadAttachment = async() =>{
    setIsDisables(true);
    const payload = {
      FileName : data.fileName,
      File : data.file
    }
      await axios.post("https://localhost:44312/api/Email",payload)
       .then((res)=>{
          console.log(res.data);
          toast.success(`${res.data.Message}`);
          setData({fileName:"",file:null})
          navigate(0);
        })
        .catch((error)=>{
          console.log(error)
          toast.error(error);
        })
        setIsDisables(false);
  }

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
    <ToastContainer/>
      <CardHeader title="Upload Attachment To Cloud" />

      <Divider />
      <TextField
        fullWidth
        label="File Name"
        margin="normal"
        name="filename"
        onChange={e => {
          setData({ ...data, fileName: e.target.value });
        }}
        value={data.fileName}
        variant="outlined"
      />
      <Typography color="textPrimary" variant="h4">
        File:
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        name="file"
        onChange={e => {
          const fileReader = new FileReader();
          
          fileReader.onload = () => {
            if (fileReader.readyState === 2) {
              setData({ ...data, file: fileReader.result });
            }
            
          };
          fileReader.readAsDataURL(e.target.files[0]);
        }}
        type="file"
        variant="outlined"
      />
      {data.file && (
        <Box>
          <Typography color="primary" variant="h5">
            <a href={data.file} alt="Downloaded File">Download File</a>
          </Typography>
        </Box>
      )}
      <Box my={2}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={uploadAttachment}
          disabled={isDisabled}
        >
          Upload
        </Button>
      </Box>
    </Card>
  );
};

export default AddNewAttachment;
