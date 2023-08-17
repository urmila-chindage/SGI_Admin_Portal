import React, {useState} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { store } from 'react-notifications-component';
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
import axios from "axios";




const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              Email: '',
              Password: ''
            }}
            validationSchema={Yup.object().shape({
              Email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              Password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={async values => {
              setIsDisabled(true);
              console.log(values.Email,values.Password);
              await axios
              
                .post("https://localhost:44312/api/Admin",values)
               
                .then((res) => {
                 console.log(res.data);
                 navigate('/app/dashboard', { replace: true });
                
                 
                })
              
                .catch(err => {
                  store.addNotification({
                    title: 'Login Failed!',
                    message: err.message,
                    type: 'danger',
                    insert: 'top',
                    container: 'bottom-right',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                      duration: 6000,
                      onScreen: true,
                      showIcon: true,
                      click: false
                    }
                  });
                setIsDisabled(false);
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
              <form onSubmit={handleSubmit}>
             
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  
                </Box>
              
               
                <TextField
                  error={Boolean(touched.Email && errors.Email)}
                  fullWidth
                  helperText={touched.Email && errors.Email}
                  label="Email Address"
                  margin="normal"
                  name="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="string"
                  value={values.Email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Password && errors.Password)}
                  fullWidth
                  helperText={touched.Password && errors.Password}
                  label="Password"
                  margin="normal"
                  name="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="string"
                  value={values.Password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
               
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
