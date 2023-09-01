import React, { useEffect } from 'react';
import { Formik } from 'formik';
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
import { Fullscreen } from '@material-ui/icons';

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

const EditStaff = ({ handleEditDrawerClose, currentStaffId }) => {
  const classes = useStyles();
  const [profile,setProfile] = useState("");
  const [staff, setStaff] = useState({
    FullName: '',
    Designation: '',
    Department: '',
    Email: '',
    Qualification: '',
    Expertise: '',
    Experience: '',
    Image: '',
    Doc: ''
  });
  const [currentFileName, setCurrentFileName] = useState('');
  const [isFiles, setIsFiles] = useState(false);

  const handleInput= (e)=>{
    setStaff({...staff, [e.target.name]:e.target.value});
}

  const getStaffRecord = async () =>{
    await axios
    .get(`https://localhost:44312/api/StaffData/StaffId?StaffId=${currentStaffId}`)
    .then(res => {
      console.log('Record is edited', res.data.data);
      console.log(currentStaffId)
      setStaff(res.data.data);
    })
    .catch(error => {
      if(!error){
        handleEditDrawerClose();
      }
     
      console.log(error);
    });
  }

  useEffect(()=>{
    getStaffRecord();
  },[currentStaffId])

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
              FullName: '',
              Designation: '',
              Department: '',
              Email: '',
              Qualification: '',
              Expertise: '',
              Experience: '',
              Image: '',
              Doc: ''
            }}
            onSubmit={async ({resetForm} ) => {
              //let staff = {FullName,Designation,Department,Email,Qualification,Expertise,Experience,Image,Doc}
              let staffData1 = {
                FullName : staff.FullName,
                Designation : staff.Designation,
                Department : staff.Department,
                Email : staff.Email,
                Qualification : staff.Qualification,
                Expertise : staff.Expertise,
                Experience : staff.Experience,
                Image : staff.Image,
                Doc : staff.Doc
              }
              await axios.put(`https://localhost:44312/api/StaffData/${currentStaffId}`,staffData1)
              .then((res)=>{
                console.log(res)
               
              })
              .catch((error)=>{
                console.log(error);
              })
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting, touched ,setFieldValue}) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Edit Staff Member
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.FullName && errors.FullName)}
                  fullWidth
                  helperText={touched.FullName && errors.FullName}
                  label="Full Name"
                  margin="normal"
                  name="FullName"
                  onBlur={handleBlur}
                  onChange={e => {
                    setStaff({ ...staff, FullName: e.target.value });
                  }}
                  value={staff.FullName}
                  variant="outlined"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Designation
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={e => {
                      let val = e.target.value;
                      setStaff({ ...staff, Designation: val });
                    }}
                    value={staff.Designation}
                    name="Designation"
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
                    onChange={e => {
                      let val = e.target.value;
                      setStaff({ ...staff, Department: val });
                    }}
                    name="Department"
                    value={staff.Department}
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
                  error={Boolean(touched.Email && errors.Email)}
                  fullWidth
                  helperText={touched.Email && errors.Email}
                  label="Email"
                  margin="normal"
                  name="Email"
                  onBlur={handleBlur}
                  type="email"
                  onChange={e => {
                    setStaff({ ...staff, Email: e.target.value });
                  }}
                  value={staff.Email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Qualification && errors.Qualification)}
                  fullWidth
                  helperText={touched.Qualification && errors.Qualification}
                  label="Qualification"
                  margin="normal"
                  name="Qualification"
                  onBlur={handleBlur}
                  onChange={e => {
                    setStaff({ ...staff, Qualification: e.target.value });
                  }}
                  value={staff.Qualification}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Expertise && errors.Expertise)}
                  fullWidth
                  helperText={touched.Expertise && errors.Expertise}
                  label="Area Of Expertise"
                  margin="normal"
                  name="Expertise"
                  onBlur={handleBlur}
                  onChange={e => {
                    setStaff({ ...staff, Expertise: e.target.value });
                  }}
                  value={staff.Expertise}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.Experience && errors.Experience)}
                  fullWidth
                  helperText={touched.Experience && errors.Experience}
                  label="Experience"
                  margin="normal"
                  name="Experience"
                  onBlur={handleBlur}
                  onChange={e => {
                    setStaff({ ...staff, Experience: e.target.value });
                  }}
                  value={staff.Experience}
                  variant="outlined"
                />

                <Typography color="textPrimary" variant="h4">
                  Image:
                </Typography>
                <TextField
                   type="file"
                   name="Image"
                   accept="image/*"
                   onChange={e => {
                    setStaff({ ...staff, Image: e.target.value });
                  }}
                 
                  error={Boolean(touched.Image && errors.Image)}
                  helperText={touched.Image && errors.Image}
                 />
              
                 <img className="profileImage" src={staff.Image} alt="Profile Picture"/>

                 <Typography color="textPrimary" variant="h4">
                  File:
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  name="Doc"
                  onBlur={handleBlur}
                  onChange={e => {
                    setStaff({ ...staff, Doc: e.target.value });
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
                    Save
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

export default EditStaff;
