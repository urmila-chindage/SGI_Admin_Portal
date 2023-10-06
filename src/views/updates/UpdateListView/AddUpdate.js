import React from 'react';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AddUpdate = ({ handleDrawerClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Update">
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
              title: '',
              description: '',
              image: File,
              file: File
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios
              .post('https://localhost:44312/api/LatestUpdate/AddLUpdates', values)
                .then(res => {
                  console.log(res.data);
                  console.log(values);
                  toast.success(`${res.data.Message}`)
                  handleDrawerClose();
                  resetForm();
                  navigate(0);
                })
                .catch(error => {
                  console.log(error);
                  toast.error(`${error.message}`);
                });
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              isSubmitting,
              touched,
              setFieldValue,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add new Update
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  label="Title"
                  margin="normal"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Description"
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  variant="outlined"
                />

                <Typography color="textPrimary" variant="h4">
                  Image:
                </Typography>
                <TextField
                  error={Boolean(touched.image && errors.image)}
                  fullWidth
                  helperText={touched.image && errors.image}
                  margin="normal"
                  name="image"
                  onBlur={handleBlur}
                  onChange={e => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue('image', fileReader.result);
                        
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  type="file"
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

export default AddUpdate;
