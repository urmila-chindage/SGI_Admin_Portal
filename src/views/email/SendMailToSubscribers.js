import {
  Box,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  TextField
} from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const SendMailToSubscribers = ({ className, ...rest }) => {
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      marginTop:'20px',
      padding:'10px'
    }
  }));

  const [data, setData] = useState({
    subject: '',
    html: ''
  });
  const [isDisabled, setIsDisables] = useState(false);
  const classes = useStyles();

 
  const previewEmail = () => {
    let html = data.html;
    html = html.replaceAll('"', "'");
    let win = window.open('', '', 'width=auto, height=auto');
    win.document.write(html);
  };

  const sendMail = async () => {
    setIsDisables(true);
    let html = data.html;
    html = html.replaceAll('"', "'");
    //const { subject } = data;
    console.log(html);
    console.log(data);
    let obj = {
      Subject : data.subject,
      HtmlCode :  html
    };
    await axios.post("https://localhost:44312/api/Email/SendEmail",obj)
    .then((res)=>{
      setIsDisables(false);
      console.log(res);
      setData({...data,html : ""})
      setData({...data,subject : ""});
     
    })
    .catch((error)=>{
      console.log(error);
    })

  }
 

  //   useEffect(() => {}, []);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Send Email To All Subscribers" />

      <Divider />
      <TextField
        fullWidth
        label="Subject"
        margin="normal"
        name="subject"
        onChange={e => {
          setData({ ...data, subject: e.target.value });
        }}
        value={data.subject}
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="Enter HTML (enter html with inline/internal CSS only)"
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        onChange={e => {
          setData({ ...data, html: e.target.value });
        }}
        value={data.html}
      />
      <Box my={2}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={sendMail}
          disabled={isDisabled}
        >
          Send
        </Button>
        </Box>
        <Box my={2}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          style={{ backgroundColor: '#35BDD0' }}
          onClick={previewEmail}
         
        >
          Preview
        </Button>
      </Box>
    </Card>
  );
};

export default SendMailToSubscribers;
