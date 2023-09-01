import React ,{useEffect} from 'react';
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

const EditTestimonials = ({ handleEditDrawerClose,currentTestimonialId }) => {
  const classes = useStyles();

 const [avatarPreview, setAvatarPreview] = useState("");

 
 const [testimonials, setTestimonials] = useState({
    Name:"",
    Desc:"",
    Image:""
  });

 const getTestimonialRecord = async () =>{
    await axios
    .get(`https://localhost:44312/api/Testimonials/CounterId?TId=${currentTestimonialId}`)
    .then(res => {
      console.log('Record is edited', res.data.data);
      console.log(currentTestimonialId)
      setTestimonials({
        ...testimonials,
        Name: res.data.data.Name,
        Desc: res.data.data.Desc,
        Image: res.data.data.Image,
        
      });
    })
    .catch(error => {
      if(!error){
        handleEditDrawerClose();
      }
     
      console.log(error);
    });
  }

  useEffect(()=>{
    getTestimonialRecord();
    
  },[])

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
           
           
            onSubmit={async (testimonials,{resetForm}) => {
             let testimonialsData = {
                 Name : testimonials.Name,
                 Desc : testimonials.Desc,
                 Image : testimonials.Image
             }
              await axios.put(`https://localhost:44312/api/Testimonials/${currentTestimonialId}`,testimonialsData)
              .then((res)=>{
                console.log(res);
                console.log(testimonials);
               
              })
              .catch((error)=>{
                console.log(error);
              })
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting,touched,handleChange,setFieldValue }) => (
              <form onSubmit={handleSubmit}>
              
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Edit Testimonial
                  </Typography>
                </Box>

              
                <TextField
                  type="string"
                  fullWidth
                  label="Name"
                  margin="normal"
                  name="Name"
                  onBlur={handleBlur}
                  onChange={e => {
                    setTestimonials({ ...testimonials, Name: e.target.value });
                  }}
                  value={testimonials.Name}
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
                  onChange={e => {
                    setTestimonials({ ...testimonials, Desc: e.target.value });
                  }}
                  value={testimonials.Desc}
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
              
              <img src={testimonials.Image} alt="Testimonials" className='profileImage'/>
                 
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

export default EditTestimonials;
