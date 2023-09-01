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
  const [imagesPreview, setImagesPreview] = useState([]);

  const [data, setData] = useState({
    title: '',
    description: '',
    category: '',
    department: '',
    date: new Date(),
    isFiles: true,
    duration: '',
    type: '',
    file: File,
    images: []
  });

  const [inputCount, setInputCount] = useState({
    count: 1
  });

  const uploadMultipleFiles = e => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview([...images, reader.result]);
          setImages([...images, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <Page className={classes.root} title="Activities">
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
              images: File
            }}
            onSubmit={async () => {
              console.log(data);

              console.log('Submit Data');
            }}
          >
            {({
              handleSubmit,
              isSubmitting,
              handleChange,
              values,
              setFieldValue
            }) => (
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
                    Event For:{' '}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="category"
                    onChange={e => {
                      setData({ ...data, category: e.target.value });
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
                    name="department"
                    onChange={e => {
                      setData({ ...data, department: e.target.value });
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
                      setData({ ...data, type: e.target.value });
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
                    onChange={date => {
                      setData({ ...data, date });
                    }}
                    value={data.date}
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
                      name="image"
                      onChange={e => {
                        setData({ ...data, file: e.target.files[0] });
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
                        let list = data.images;
                        if (inputCount.count > 1) {
                          if (
                            data.images.length > 0 &&
                            data.images.length === inputCount.count
                          ) {
                            list.splice(data.images.length - 1, 1);
                          }
                          setInputCount({
                            ...inputCount,
                            count: inputCount.count - 1
                          });
                          setData({ ...data, images: list });
                        }
                      }}
                    >
                      -
                    </Button>
                    {_.times(inputCount.count, i => (
                      <TextField
                        fullWidth
                        margin="normal"
                        name="image"
                        onChange={e => {
                          const files = Array.from(e.target.files);

                          files.forEach(file => {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (reader.readyState === 2) {
                                setData({ ...data, images: reader.result});
                              }
                            };
                            reader.readAsDataURL(file);
                          });
                        }}
                        type="file"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                )}

                {/* <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    Image:
                </Typography>
                <TextField
                  error={Boolean(touched.image && errors.image)}
                  fullWidth
                  helperText={touched.image && errors.image}
                  margin="normal"
                  name="image"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setData({...data, image: e.target.files[0]});
                  }}
                  type="file"
                  variant="outlined"
                />
                <Typography
                    color="textPrimary"
                    variant="h4"
                >
                    File:
                </Typography>
                <TextField
                  error={Boolean(touched.file && errors.file)}
                  fullWidth
                  helperText={touched.file && errors.file}
                  margin="normal"
                  name="file"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setData({...data, file: e.target.files[0]});
                  }}
                  type="file"
                  variant="outlined"
                /> */}
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
