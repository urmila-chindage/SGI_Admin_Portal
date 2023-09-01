import React from 'react';
import { Formik } from 'formik';
import { v4 as uuid } from 'uuid';
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
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';


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

const AddNews = ({ handleDrawerClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();

 return (
    <Page className={classes.root} title="News">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              title: '',
              file: null
              
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios
              .post('https://localhost:44312/api/News', values)
                .then(res => {
                  console.log(res.data);
                  console.log(values);
                  resetForm();
                  handleDrawerClose();
                  NotificationManager.success('Achievement Data Added', 'Successful!', 2000);
                  navigate(0);
                })
                .catch(error => {
                  console.log(error);
                })
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting, touched,values,handleChange,setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3} m={2}>
                  <Typography color="textPrimary" variant="h2">
                    Add new News
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Title"
                  margin="normal"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  variant="outlined"
                />

                <Typography color="textPrimary" variant="h4">
                  File:
                </Typography>
                <TextField
                  error={Boolean(touched.file && errors.file)}
                  fullWidth
                  helperText={touched.file && errors.file}
                  margin="normal"
                  name="file"
                  onBlur={handleBlur}
                  onChange={e => {
                    const fileReader = new FileReader();
                    
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue('file', fileReader.result);
                      }
                      
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  type="file"
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

export default AddNews;
