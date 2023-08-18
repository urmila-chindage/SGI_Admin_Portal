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
import { store } from 'react-notifications-component';
import axios from "axios";

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
  const [profile,setProfile] = useState("");

  const changeProfileImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfile(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Page className={classes.root} title="Staff">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              fullName: '',
              designation: '',
              department: '',
              email: '',
              qualification: '',
              expertise: '',
              experience: '',
              image: "",
              file: ""
            }}
            validationSchema={yup.object().shape({
              fullName: yup
              .string()
              .required('Your First Name Is Required!')
              .min(12, 'Your First Name Needs To Be Valid'),

              designation: yup
              .string()
              .required('designation Is Required!'),

              department: yup
              .string()
              .required('department Is Required!'),

              email: yup
              .string()
              .email()
              .required('Your Email Is Required!'),

              qualification: yup
              .string()
              .required('qualification Is Required!'),

              expertise: yup
              .string()
              .required('expertise Is Required!'),

              experience: yup
              .string()
              .required('experience Is Required!'),
             
            })}
            onSubmit={async (values) => {
              const formData = new FormData();
              formData.append("profile", values.profile);
              await axios.post("https://localhost:44312/api/StaffData",formData)
              .then((res)=>{
                console.log(res.data);
              })
              .catch((error)=>{
                console.log(error);
              })
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting, handleChange,touched ,values,setFieldValue}) => (
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
                  name="fullName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.fullName}
                  variant="outlined"
                  error={Boolean(touched.fullName && errors.fullName)}
                  helpertext={touched.fullName && errors.fullName}
                />

                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="designation"
                    onChange={handleChange}
                    value={values.designation}
                    error={Boolean(touched.designation && errors.designation)}
                    helpertext={touched.designation && errors.designation}
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
                    value={values.department}
                    name="department"
                    error={Boolean(touched.department && errors.department)}
                    helpertext={touched.department && errors.department}
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
                  name="email"
                  onBlur={handleBlur}
                  type="email"
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                  error={Boolean(touched.email && errors.email)}
                  helpertext={touched.email && errors.email}
                />
                <TextField
                 
                  fullWidth
                 
                  label="Qualification"
                  margin="normal"
                  name="qualification"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.qualification}
                  variant="outlined"
                  error={Boolean(touched.qualification && errors.qualification)}
                  helpertext={touched.qualification && errors.qualification}
                />
                <TextField
                
                  fullWidth
                
                  label="Area Of Expertise"
                  margin="normal"
                  name="expertise"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.expertise}
                  variant="outlined"
                  error={Boolean(touched.expertise && errors.expertise)}
                  helpertext={touched.expertise && errors.expertise}
                />
                <TextField
                 
                  fullWidth
                 
                  label="Experience"
                  margin="normal"
                  name="experience"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.experience}
                  variant="outlined"
                  error={Boolean(touched.experience && errors.experience)}
                  helpertext={touched.experience && errors.experience}
                />

                <Typography color="textPrimary" variant="h4">
                  Image:
                </Typography>
                <TextField
                
                  fullWidth
              
                  margin="normal"
                  name="image"
                  onBlur={handleBlur}
                  onChange={changeProfileImage}
                  type="file"
                  variant="outlined"
                 
                  error={Boolean(touched.image && errors.image)}
                  helpertext={touched.image && errors.image}
                />
                <Typography color="textPrimary" variant="h4">
                  File:
                </Typography>
                <TextField
                
                  fullWidth
                
                  margin="normal"
                  name="file"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="file"
                  variant="outlined"
                  error={Boolean(touched.file && errors.file)}
                  helpertext={touched.file && errors.file}
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
