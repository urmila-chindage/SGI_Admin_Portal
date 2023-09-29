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
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string()
                .max(255)
                .required('Password is required')
            })}
            onSubmit={async (values) => {
             let payload={
                Email : values.email,
                Password : values.password 
              }
              //console.log(values)
              setIsDisabled(true);
               await axios.post("https://localhost:44312/api/Registration/Login",payload)
               .then((res)=>{
                console.log(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
                if(values.email===res.data.Email && values.password === res.data.Password){
                  navigate('/app/dashboard', { replace: true });
                  
                }
                else {
                 toast.error("User Data does not found");
                }
               
                setIsDisabled(false);
               })
               .catch((error)=>{
                console.log(error);
               })
               
            }}
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
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
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
