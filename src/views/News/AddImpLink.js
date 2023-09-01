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
  Switch
} from '@material-ui/core';
import Page from 'src/components/Page';
import { useState } from 'react';


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

const AddImpLink = ({ handleDrawerClose }) => {
  const classes = useStyles();
  const [data, setData] = useState({
    content: '',
    file: null,
    isFiles: false
  });

  const uploadFileAsync = async (file, storageRef, name) => {
    const ref = storageRef.child('impLinks').child(name);
    const snapshot = await ref.put(file);
    return await snapshot.ref.getDownloadURL();
  };

  return (
    <Page className={classes.root} content="News">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              content: '',
              file: null
            }}
            onSubmit={async () => {
              console.log("Submited")
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting, touched }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3} spacing={2}>
                  <Typography color="textPrimary" variant="h2">
                    Add Important Link
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  label="HTML content (dont add anchor tag if file is to be uploaded)"
                  margin="normal"
                  name="content"
                  onBlur={handleBlur}
                  onChange={e => {
                    setData({ ...data, content: e.target.value });
                  }}
                  value={data.content}
                  variant="outlined"
                  multiline
                  rows={5}
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

                {data.isFiles && (
                  <>
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
                        setData({ ...data, file: e.target.files[0] });
                      }}
                      type="file"
                      variant="outlined"
                    />
                  </>
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

export default AddImpLink;
