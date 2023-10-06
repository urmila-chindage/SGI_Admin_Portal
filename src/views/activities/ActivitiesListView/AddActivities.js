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
  Select,
  Switch
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useState } from 'react';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
var _ = require('lodash');

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

const AddActivity = ({ handleDrawerClose }) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    department: '',
    date: new Date(),
    isFiles: true,
    duration: '',
    type: '',
    file: File
  });

  const [inputCount, setInputCount] = useState({
    count: 1
  });

  const fileBase64 = img => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onerror = reject;
      fileReader.onload = function() {
        resolve(fileReader.result);
      };
      fileReader.readAsDataURL(img);
      console.log(img);
    });
  };

  const handleFileUpload = e => {
    let image = e.target.files;
    Promise.all(Array.from(image).map(fileBase64))
      .then(urls => {
        setImages(prevArray => [...prevArray, ...urls]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Page className={classes.root} title="Activities">
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
              description: '',
              category: '',
              department: '',
              date: '',
              duration: '',
              isFiles: true,
              type: '',
              file: File,
              images: []
            }}
            onSubmit={async () => {
             const payload = {
                Title: data.title,
                Description: data.description,
                EventFor: data.category,
                Department: data.department,
                DatePickerDialog: data.date,
                Duration: data.duration,
                Type: data.type,
                File1: data.file,
                File: images
              };

              await axios
                .post('https://localhost:44312/api/Activity', payload)
                .then(res => {
                  console.log(res.data);
                  toast.success(`${res.data.Message}`);
                  handleDrawerClose();
                  navigate(0);
                })
                .catch(error => {
                  console.log(error);
                  toast.error(error);
                });
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add new Activity
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="Title"
                  margin="normal"
                  name="title"
                  onChange={e => {
                    setData({ ...data, title: e.target.value });
                  }}
                  value={data.title}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Description"
                  margin="normal"
                  name="description"
                  onChange={e => {
                    setData({ ...data, description: e.target.value });
                  }}
                  value={data.description}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Duration"
                  margin="normal"
                  name="duration"
                  onChange={e => {
                    setData({ ...data, duration: e.target.value });
                  }}
                  value={data.duration}
                  variant="outlined"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Event For 
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    onChange={e => {
                      let val = e.target.value;
                      setData({ ...data, category: val });
                    }}
                    value={data.category}
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="college">College</MenuItem>
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
                      setData({ ...data, department: val });
                    }}
                    value={data.department}
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
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Type: </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="type"
                    onChange={e => {
                      let val = e.target.value;
                      setData({ ...data, type: val });
                    }}
                    value={data.type}
                  >
                    <MenuItem value="Visit">Visit</MenuItem>
                    <MenuItem value="Workshop">Workshop</MenuItem>
                    <MenuItem value="Guest Lecture">Guest Lecture</MenuItem>
                    <MenuItem value="Webinar">Webinar</MenuItem>
                    <MenuItem value="Teachers Training">
                      Teachers Training
                    </MenuItem>
                  </Select>
                </FormControl>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={data.date}
                    onChange={date => {
                      setData({ ...data, date });
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                  <Switch
                    checked={data.isFiles}
                    onChange={e => {
                      setData({ ...data, isFiles: e.target.checked });
                    }}
                    color="primary"
                    name="checkedB"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </MuiPickersUtilsProvider>

                {data.isFiles && (
                  <Box>
                    <Typography color="textPrimary" variant="h4">
                      File:
                    </Typography>
                    <TextField
                      fullWidth
                      margin="normal"
                      name="file"
                      onChange={e => {
                        const fileReader = new FileReader();

                        fileReader.onload = () => {
                          if (fileReader.readyState === 2) {
                            setData({ ...data, file: fileReader.result });
                          }
                        };
                        fileReader.readAsDataURL(e.target.files[0]);
                      }}
                      type="file"
                      variant="outlined"
                    />

                    <Typography color="textPrimary" variant="h4">
                      Upload Images:
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={e => {
                        setInputCount({
                          ...inputCount,
                          count: inputCount.count + 1
                        });
                      }}
                    >
                      +
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={e => {
                        let list = images;
                        if (inputCount.count > 1) {
                          if (
                            images.length > 0 &&
                            images.length === inputCount.count
                          ) {
                            list.splice(images.length - 1, 1);
                          }
                          setInputCount({
                            ...inputCount,
                            count: inputCount.count - 1
                          });
                          setImages({ ...images, images: list });
                        }
                      }}
                    >
                      -
                    </Button>

                    {_.times(inputCount.count, i => (
                      <TextField
                        fullWidth
                        margin="normal"
                        name="images"
                        onChange={handleFileUpload}
                        type="file"
                        variant="outlined"
                        multiple
                      />
                    ))}
                  </Box>
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

export default AddActivity;
