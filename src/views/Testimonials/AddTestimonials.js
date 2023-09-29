import React from 'react';
import * as yup from 'yup';
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
import "../Testimonials/Testimonials.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Children, cloneElement } from 'react';
import loader from "../../Images/loader.gif";
import { useNavigate } from 'react-router-dom';



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

const AddTestimonial = ({ handleDrawerClose }) => {
  const classes = useStyles();

 const [avatarPreview, setAvatarPreview] = useState("");
 const [loader,setLoader] = useState(false);

 const navigate = useNavigate();

 return (
    <Page className={classes.root} title="Testimonials">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
      
          <Formik
            initialValues={{
              Name: "",
              Desc: "",
              Image: ""
            }}
            validationSchema={yup.object().shape({
              Name: yup
              .string()
              .required('Your Name is Required!'),

               Desc: yup
              .string()
              .required('Description is Required!')
              .min(12, 'Your Description Needs To Be Valid'),

              Image: yup
              .mixed()
              .required('Image is Required!'),
            })}
           
            onSubmit={async (values,{resetForm }) => {
             setLoader(true);
              await axios.post("https://localhost:44312/api/Testimonials",values)
              .then((res)=>{
                console.log(res.data);
                console.log(values);
                toast.success("Record Added Successfully")
                resetForm();
                handleDrawerClose();
                navigate(0);          
              })
              
              .catch((error)=>{
                console.log(error);
                toast.error(`${error.message}`);
              })
              
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting,touched,handleChange,setFieldValue,values }) => (
             
              <form onSubmit={handleSubmit}>
               
                <ToastContainer/>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add new Testimonial
                  </Typography>
                </Box>

              
                <TextField
                  type="string"
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Name}
                  variant="outlined"
                  error={Boolean(touched.Name && errors.Name)}
                  helperText={touched.Name && errors.Name}
                />
               
                <TextField
                 fullWidth
                 type="string"
                  label="Message"
                  margin="normal"
                  name="Desc"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.Desc}
                  variant="outlined"
                  multiline
                  rows={6}
                  error={Boolean(touched.Desc && errors.Desc)}
                  helperText={touched.Desc && errors.Desc}
                />

                <Typography color="textPrimary" variant="h4">
                  Image:
                </Typography>
                
                <TextField
                   type="file"
                   name="Image"
                   accept="image/*"
                   onChange={(e) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue('Image', fileReader.result);
                        setAvatarPreview(fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  error={Boolean(touched.Image && errors.Image)}
                  helperText={touched.Image && errors.Image}
                 />
              
                 <img className="profileImage" src={avatarPreview} alt=""/>
                 
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

export default AddTestimonial;
