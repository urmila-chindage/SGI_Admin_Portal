import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BgImage from "../../Images/bgimage.jpg";

const useStyles = makeStyles((theme) => ({
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

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Register"
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
              email: '',
              fName: '',
              lName: '',
              password: '',
              mobileno:"",
              state:"",
              country:"",
              policy:""
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                fName: Yup.string().max(255).required('First name is required'),
                lName: Yup.string().max(255).required('Last name is required'),
                password: Yup.string().max(255).required('password is required'),
                mobileno: Yup.string().max(255).required('Mobile Number is required'),
                state: Yup.string().max(255).required('State is required'),
                country: Yup.string().max(255).required('Country is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={async(values) => {
              await axios.post("https://localhost:44312/api/Registration",values)
              .then((res)=>{
                console.log(res);
                navigate('/', { replace: true });
                localStorage.setItem("user",JSON.stringify(values));
                toast.success("You are Registered successfully!!")
              })
              .then((error)=>{
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
                 <ToastContainer/>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.fName && errors.fName)}
                  fullWidth
                  helperText={touched.fName && errors.fName}
                  label="First name"
                  margin="normal"
                  name="fName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lName && errors.lName)}
                  fullWidth
                  helperText={touched.lName && errors.lName}
                  label="Last name"
                  margin="normal"
                  name="lName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lName}
                  variant="outlined"
                />
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

                <TextField
                  error={Boolean(touched.mobileno && errors.mobileno)}
                  fullWidth
                  helperText={touched.mobileno && errors.mobileno}
                  label="Mobile Number"
                  margin="normal"
                  name="mobileno"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.mobileno}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.state && errors.state)}
                  fullWidth
                  helperText={touched.state && errors.state}
                  label="State"
                  margin="normal"
                  name="state"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.state}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.country && errors.country)}
                  fullWidth
                  helperText={touched.country && errors.country}
                  label="Country"
                  margin="normal"
                  name="country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.country}
                  variant="outlined"
                />
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
