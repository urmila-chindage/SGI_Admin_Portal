import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(({
  root: {}
}));



const Password = ({ className ,RId , ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    RId: "",
    FName: "",
    LName: "",
    Email: "",
    Password: "",
    Mobileno: "",
    State: "",
    Country: "",
  });

  const getPassword = async (RId) =>{
    await axios
    .get(`https://localhost:44312/api/Registration/RId?RId=${RId}`)
    .then(res => {
      console.log("responce:",res.data.data)
      setValues(res.data.data);
    })
    .catch(error => {     
      console.log(error);
    });
  }

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  useEffect(()=>{
    getPassword();
  },[])

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
      onSubmit={async (RId) => {
             
             await axios.put(`https://localhost:44312/api/Registration/${RId}`,values)
             .then((res)=>{
               console.log(res);
               console.log(values);
               toast.success(`${res.data.Message}`)        
             })
             .catch((error)=>{
               console.log(error);
               toast.error(`${error.message}`);
             })
           }}
    >
      <Card>
      <ToastContainer/>
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Old Password"
            margin="normal"
            name="password"
            // onChange={handleChange}
            type="password"
            // value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            // value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
