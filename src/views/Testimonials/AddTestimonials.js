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

  const [Name,setName] = useState("");
  const [Desc,setDesc] = useState("");
  const [Image,SetImage] = useState(""); 

  const changeProfileImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
         SetImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
 

  

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
              .string()
              .required('Image is Required!'),
            })}
           
            onSubmit={async () => {
              const payload = {
                Name:Name,
                Desc:Desc,
                Image:Image
              }
              await axios.post("https://localhost:44312/api/Testimonials",payload)
              .then((res)=>{
                console.log(res.data);
              
               
              })
              .catch((error)=>{
                console.log(error);
              })
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting, touched ,data,payload }) => (
              <form onSubmit={handleSubmit}>
              
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add new Testimonial
                  </Typography>
                </Box>

              
                <TextField
                  
                  fullWidth
                 
                  label="Name"
                  margin="normal"
                  name="Name"
                  onBlur={handleBlur}
                  onChange={e=>setName(e.target.value)}
                  value={Name}
                  variant="outlined"
                 
                />
               
                <TextField
                
                 fullWidth
              
                  label="Message"
                  margin="normal"
                  name="Desc"
                  onBlur={handleBlur}
                  onChange={e=>setDesc(e.target.value)}
                  value={Desc}
                  variant="outlined"
                  multiline
                  rows={6}
                  
                />
                <Typography color="textPrimary" variant="h4">
                  Image:
                </Typography>
                
                <input
                   type="file"
                   name="Image"
                   accept="image/*"
                   onChange={changeProfileImage}
                   required
                 />
              
                 <img className="profileImage" src={Image} alt=""/>
                 
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
