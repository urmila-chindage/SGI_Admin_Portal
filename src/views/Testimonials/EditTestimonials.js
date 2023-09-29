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

const EditTestimonials = ({ handleEditDrawerClose,currentTestimonialId }) => {
  const classes = useStyles();

 const [avatarPreview, setAvatarPreview] = useState("");

 
 const [testimonials, setTestimonials] = useState({
  TId:"",
    Name:"",
    Desc:"",
    Image:""
  });

 let getTestimonialRecord = async () =>{
  
    await axios
    .get(`https://localhost:44312/api/Testimonials/CounterId?TId=${currentTestimonialId}`)
    .then(res => {
      console.log('Record is edited', res.data.data);
      console.log(currentTestimonialId)
      setTestimonials({
        ...testimonials,
        TId:res.data.data.TId,
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
              TId:"",
              Name: "",
              Desc: "",
              Image: ""
            }}
           
           
            onSubmit={async (currentTestimonialId,{resetForm}) => {
             
              await axios.put(`https://localhost:44312/api/Testimonials/${currentTestimonialId}`,testimonials)
              .then((res)=>{
                console.log(res);
                console.log(testimonials);
                toast.success(`${res.data.Message}`) 
                handleEditDrawerClose();         
              })
              .catch((error)=>{
                console.log(error);
                toast.error(`${error.message}`);
              })
            }}
          >
            {({ errors, handleBlur, handleSubmit, isSubmitting,touched,handleChange,setFieldValue }) => (
              <form onSubmit={handleSubmit}>
              <div hidden>
                <TextField 
                  type="string"
                  fullWidth
                  label="Id"
                  margin="normal"
                  name="Id"
                  onBlur={handleBlur}
                  onChange={e => {
                    setTestimonials({ ...testimonials, TId: e.target.value });
                  }}
                  value={testimonials.TId}
                  variant="outlined"
                  error={Boolean(touched.TId && errors.TId)}
                  helperText={touched.TId && errors.TId}
                  hidden
                />
                </div>
              
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
                    // const fileReader = new FileReader();
                    // fileReader.onload = () => {
                    //   if (fileReader.readyState === 2) {
                    //     setFieldValue('Image', fileReader.result);
                    //     setAvatarPreview(fileReader.result);
                    //   }
                    // };
                    // fileReader.readAsDataURL(e.target.files[0]);

                    if (e.target.files && e.target.files[0]) {
                    let reader = new FileReader();
                    reader.onload = (e) => {
                      setTestimonials({ ...testimonials, Image: e.target.result });
                    };
                    reader.readAsDataURL(e.target.files[0]);
    }
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
                    Update
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
