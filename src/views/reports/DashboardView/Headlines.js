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
    import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
 
  
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

        let headLineData = res.data.data
        console.log(headLineData.length)
        for(let i = 0; i < headLineData.length; i++)
        {
          setHeadlineInfo({
            ...headlineInfo,
            headline: headLineData[i].Data
          });
        }
         
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
        toast.success(`${res.data.Message}`);
        navigate(0);
      })
      .catch((error)=>{
        console.log(error);
                toast.error(`${error.message}`);
      })
    }

    useEffect(()=>{
      getHeadline();
    },[])
  
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
                <ToastContainer />
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
  