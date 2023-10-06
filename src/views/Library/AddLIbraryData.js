import React from 'react';
import { v4 as uuid } from 'uuid';
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
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const AddLibraryData = ({ handleDrawerClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();

 

  return (
    <Page className={classes.root} title="Calendar">
    <ToastContainer/>
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
              category: '',
              file: File
            }}
            onSubmit={async (values, { resetForm }) => {
              await axios
              .post('https://localhost:44312/api/Library', values)
                .then(res => {
                  console.log(res.data);
                  console.log(values);
                  resetForm();
                  handleDrawerClose();
                  toast.success(`${res.data.Message}`);
                  navigate(0);
                })
                .catch(error => {
                  console.log(error);
                  toast.error(error);
                })
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              handleChange,
              isSubmitting,
              touched,
              values,
              resetForm,
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add Library Data
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  label="title"
                  margin="normal"
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  variant="outlined"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                    name="category"
                    value={values.category}
                  >
                    <MenuItem value="REPORT">report</MenuItem>
                    <MenuItem value="ACHIEVEMENT">achievement</MenuItem>
                    <MenuItem value="BOOKBANK">Book Bank</MenuItem>
                  </Select>
                </FormControl>
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

export default AddLibraryData;
