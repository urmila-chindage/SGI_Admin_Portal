import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    makeStyles,
    TextField
  } from '@material-ui/core';
  import React from 'react';
  import { useState,useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { NotificationManager } from 'react-notifications';
  import clsx from 'clsx';
  import axios from "axios";
 
  
  const Headline = ({ className, ...rest }) => {
    const useStyles = makeStyles(theme => ({
      root: {
        height: '100%',
        padding: '15px'
      }
    }));
  
    const [headlineInfo, setHeadlineInfo] = useState({
      headline: ''
    });
    const navigate = useNavigate();
    

     const classes = useStyles();

    const getHeadline = async () =>{
        await axios.get("https://localhost:44312/api/Marquee")
        .then((res)=>{
          console.log(res.data.data);
          let headlineData = res.data.data;
          setHeadlineInfo(headlineData[headlineData.length-1]);
         
        })
        .catch((error)=>{
          console.log(error)
        })
    }

    const setHeadline = async() =>{
      const payload = {
        Data : headlineInfo.headline
      }
      await axios.post("https://localhost:44312/api/Marquee",payload)
      .then((res)=>{
        console.log(res.data)
        navigate('/');
        NotificationManager.success('HeadLine Data is Set!', 'Successful!', 2000);
      })
      .catch((error)=>{
        console.log(error);
      })
    }

    useEffect(()=>{
      getHeadline();
    },[])
  
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Marquee Headline" />
        <Divider />
        <TextField
          fullWidth
          label="Enter headline"
          margin="normal"
          name="headline"
          onChange={e => {
            setHeadlineInfo({ ...headlineInfo, headline: e.target.value });
          }}
          value={headlineInfo.headline}
          variant="outlined"
          multiline={true}
          rows={7}
        />
        <Box my={2}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={()=>setHeadline()}
          >
            Set
          </Button>
        </Box>
      </Card>
    );
  };
  
  export default Headline;
  