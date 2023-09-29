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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
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

const AddPlacement = ({ handleDrawerClose }) => {
  const classes = useStyles();

  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: '',
    description: '',
    eligibleDept: '',
    organizedBy: '',
    companyName: '',
    campusType: '',
    date: new Date(),
    isFiles: true,
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
      .then((urls, i) => {
        setImages(prevArray => [...prevArray, ...urls]);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Page className={classes.root} title="Placement">
      <ToastContainer />
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
              eligibleDept: '',
              organizedBy: '',
              companyName: '',
              campusType: '',
              date: new Date(),
              isFiles: true,
              file: File,
              images: []
            }}
            onSubmit={async () => {
              const payload = {
                Title: data.title,
                Description: data.description,
                Eligible_Department: data.eligibleDept,
                Organizedby: data.organizedBy,
                CompanyName: data.companyName,
                CampusType: data.campusType,
                DatePicker: data.date,
                File1: data.file,
                File: images
              };

              await axios
                .post('https://localhost:44312/api/Placement', payload)
                .then(res => {
                  console.log(res.data);
                  handleDrawerClose();
                  toast.success(`${res.data.Message}`);
                })
                .catch(error => {
                  console.log(error);
                  toast.error(error);
                });
            }}
          >
            {({
              handleSubmit,
              isSubmitting,
              setFieldValue,
              handleChange,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add new Placement
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
                  label="Eligible Departments"
                  margin="normal"
                  name="eligibleDept"
                  onChange={e => {
                    setData({ ...data, eligibleDept: e.target.value });
                  }}
                  value={data.eligibleDept}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Organized By (EG: Sanjay Ghodawat Institute)"
                  margin="normal"
                  name="organizedBy"
                  onChange={e => {
                    setData({ ...data, organizedBy: e.target.value });
                  }}
                  value={data.organizedBy}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Company Name"
                  margin="normal"
                  name="companyName"
                  onChange={e => {
                    setData({ ...data, companyName: e.target.value });
                  }}
                  value={data.companyName}
                  variant="outlined"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">
                    Campus Type:{' '}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="campusType"
                    onChange={e => {
                      let val = e.target.value;
                      setData({ ...data, campusType: val });
                    }}
                    value={data.campusType}
                  >
                    <MenuItem value="Off Campus">Off Campus</MenuItem>
                    <MenuItem value="On Campus">On Campus</MenuItem>
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

export default AddPlacement;
