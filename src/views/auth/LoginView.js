import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import BgImage from "../../Images/bgimage.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    //backgroundColor: theme.palette.background.dark,
    backgroundImage: `url(${BgImage})`,
    backgroundSize: 'cover',
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  bgColor :{
    backgroundColor: theme.palette.background.dark,
    padding:theme.spacing(3)
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const [loginUser,setLoginUser] = useState([]);

  //const [otp,setOtp] = useState("");
  //const [email,setEmail] = useState('');

  const getOtp = async(values) => {
     await axios.get("https://localhost:44312/api/WebSiteLogin/AdmissionFormLogin")
     .then((res)=>{
      console.log(res.data.data);
      setLoginUser(res.data.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      //localStorage.clear();
     })
     .catch((error)=>{
      console.log(error);
     })
  }

 return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
        <Formik
            initialValues={{
              email: '',
              otp: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              otp: Yup.string()
                .max(255)
                .required('otp is required')
            })}
            onSubmit={ (values) => {
              const authUser = JSON.parse(localStorage.getItem('user'));
              console.log(values.email,authUser)
                if(values.email===authUser.data[0].Email && values.otp === authUser.OTP){
                  
                  navigate('/app/dashboard', { replace: true });
                }
                else{
                  toast.error("User Data does not found");
                }
              }}
             //let payload={
              //  Email : values.email,
              //  OTP : values.otp 
             // }
              //console.log(values)
             // setIsDisabled(true);
             //  await axios.post("https://localhost:44312/api/WebSiteLogin",payload)
             //  .then((res)=>{
             //   console.log(res.data);
               // localStorage.setItem("user", JSON.stringify(res.data));
               // if(values.email===res.data.Email && values.otp === res.data.otp){
                //  navigate('/app/dashboard', { replace: true });
                  
               // }
               // else {
               //  toast.error("User Data does not found");
               // }
               
               // setIsDisabled(false);
               //})
              // .catch((error)=>{
               // console.log(error);
             // })
               
           

          
          >
            
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => ( 
              <form onSubmit={handleSubmit} className={classes.bgColor}>
                 <ToastContainer />
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box>
                {isDisabled && <LinearProgress/>}
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    onClick={()=>getOtp()}
                    fullWidth
                    size="large"
                   
                    variant="contained"
                  >
                    Send OTP
                  </Button>
                </Box>
                <TextField
                  error={Boolean(touched.otp && errors.otp)}
                  fullWidth
                  helperText={touched.otp && errors.otp}
                  label="Enter OTP"
                  margin="normal"
                  name="otp"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.otp}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isDisabled}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
               {/* <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
            </Typography> */}
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
