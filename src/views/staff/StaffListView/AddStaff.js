import React from 'react';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const AddStaff = ({ handleDrawerClose }) => {
  const classes = useStyles();
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Staff">
    <ToastContainer></ToastContainer>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
         
          <Formik
            initialValues={{
              FullName: '',
              Designation: '',
              Department: '',
              Email: '',
              Qualification: '',
              Expertise: '',
              Experience: '',
              Image: File,
              Doc: File
            }}
            validationSchema={yup.object().shape({
              FullName: yup
                .string()
                .required('Your First Name Is Required!')
                .min(12, 'Your First Name Needs To Be Valid'),

              Designation: yup.string().required('designation Is Required!'),

              Department: yup.string().required('department Is Required!'),

              Email: yup
                .string()
                .email()
                .required('Your Email Is Required!'),

              Qualification: yup
                .string()
                .required('qualification Is Required!'),

              Expertise: yup.string().required('expertise Is Required!'),

              Experience: yup.string().required('experience Is Required!'),

              
            })}
            onSubmit={async (values, { resetForm }) => {
              await axios
                .post('https://localhost:44312/api/StaffData', values)
                .then(res => {
                  console.log(res.data);
                  console.log(values);
                  toast.success(`${res.data.Message}`)
                  resetForm();
                  handleDrawerClose();
                  navigate(0);
                })
                .catch(error => {
                  console.log(error);
                  toast.error(error)
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              isSubmitting,
              handleChange,
              touched,
              values,
              setFieldValue,
              data
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add new Staff
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Full Name"
                  margin="normal"
                  name="FullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="string"
                  value={values.FullName}
                  variant="outlined"
                  error={Boolean(touched.FullName && errors.FullName)}
                  helperText={touched.FullName && errors.FullName}
                />

                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="Designation"
                    type="string"
                    onChange={handleChange}
                    value={values.Designation}
                    error={Boolean(touched.Designation && errors.Designation)}
                    helperText={touched.Designation && errors.Designation}
                  >
                    <MenuItem value="HOD">HOD</MenuItem>
                    <MenuItem value="Lecturer">Lecturer</MenuItem>
                    <MenuItem value="Lab Assistant">Lab Assistant</MenuItem>
                    <MenuItem value="Office Superintendent">
                      Office Superintendent
                    </MenuItem>
                    <MenuItem value="Graphics Designer">
                      Graphics Designer
                    </MenuItem>
                    <MenuItem value="Clerk">Clerk</MenuItem>
                    <MenuItem value="Jr. Clerk">Jr. Clerk</MenuItem>
                    <MenuItem value="Senior Accountant">
                      Senior Accountant
                    </MenuItem>
                    <MenuItem value="Account Assistant">
                      Account Assistant
                    </MenuItem>
                    <MenuItem value="Account Clerk">Account Clerk</MenuItem>
                    <MenuItem value="Doctor">Doctor</MenuItem>
                    <MenuItem value="Librarian">Librarian</MenuItem>
                    <MenuItem value="Library Assistant">
                      Library Assistant
                    </MenuItem>
                    <MenuItem value="Jr. Clerk">Jr. Clerk</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Department
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                    value={values.Department}
                    name="Department"
                    type="string"
                    error={Boolean(touched.Department && errors.Department)}
                    helperText={touched.Department && errors.Department}
                  >
                    <MenuItem value="Computer Science">
                      Computer Science
                    </MenuItem>
                    <MenuItem value="Mechanical">Mechanical</MenuItem>
                    <MenuItem value="E & TC">E &amp; TC</MenuItem>
                    <MenuItem value="Civil">Civil</MenuItem>
                    <MenuItem value="Electrical">Electrical</MenuItem>
                    <MenuItem value="Basic Science & Humanities">
                      Basic Science &amp; Humanities
                    </MenuItem>
                    <MenuItem value="Library">Library</MenuItem>
                    <MenuItem value="Administrative">Administrative</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="Email"
                  onBlur={handleBlur}
                  type="email"
                  onChange={handleChange}
                  value={values.Email}
                  variant="outlined"
                  error={Boolean(touched.Email && errors.Email)}
                  helperText={touched.Email && errors.Email}
                />
                <TextField
                  fullWidth
                  type="string"
                  label="Qualification"
                  margin="normal"
                  name="Qualification"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Qualification}
                  variant="outlined"
                  error={Boolean(touched.Qualification && errors.Qualification)}
                  helperText={touched.Qualification && errors.Qualification}
                />
                <TextField
                  fullWidth
                  type="string"
                  label="Area Of Expertise"
                  margin="normal"
                  name="Expertise"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Expertise}
                  variant="outlined"
                  error={Boolean(touched.Expertise && errors.Expertise)}
                  helperText={touched.Expertise && errors.Expertise}
                />
                <TextField
                  fullWidth
                  type="string"
                  label="Experience"
                  margin="normal"
                  name="Experience"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Experience}
                  variant="outlined"
                  error={Boolean(touched.Experience && errors.Experience)}
                  helperText={touched.Experience && errors.Experience}
                />

                <Typography color="textPrimary" variant="h4">
                  Image:
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  type="file"
                  name="Image"
                  accept="image/*"
                  onChange={e => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue('Image', fileReader.result);
                        setProfile(fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  error={Boolean(touched.Image && errors.Image)}
                  helperText={touched.Image && errors.Image}
                />

                <img
                  src={profile}
                  alt="Profile Picture"
                  style={{
                    width: '100px',
                    height: '100px',
                    border: '1px solid #000'
                  }}
                />

                <Typography color="textPrimary" variant="h4">
                  File:
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  name="Doc"
                  onBlur={handleBlur}
                  onChange={e => {
                    const fileReader = new FileReader();
                    
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue('Doc', fileReader.result);
                      }
                      
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  type="file"
                  variant="outlined"
                  error={Boolean(touched.Doc && errors.Doc)}
                  helperText={touched.Doc && errors.Doc}
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
                    Add
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

export default AddStaff;
