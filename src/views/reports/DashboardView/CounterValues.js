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
  import { useState } from 'react';
  import clsx from 'clsx';
  import axios from "axios";
  
  const CounterValues = ({ className, ...rest }) => {
    const useStyles = makeStyles(theme => ({
      root: {
        height: '100%'
      }
    }));

    const [TotalStudent,setTotalStudent] = useState(0);
    const [Course,setCourse] = useState(0);
    const [Teacher,setTeacher] = useState(0);

     const classes = useStyles();

    const counterData = async() =>{
      const payload = {
        TotalStudent : TotalStudent,
        Course : Course,
        Teacher : Teacher
      }
      await axios.post("https://localhost:44312/api/Counter",payload)
      .then((res)=>{
        console.log(res.data);
      })
      .catch((error)=>{
        console.log(error);
      })
    }

    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Counter Values" />
        <Divider />
        <TextField
          fullWidth
          label="Total Students"
          margin="normal"
          name="TotalStudent"
          onChange={(e)=>setTotalStudent(e.target.value)}
          value={TotalStudent}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Courses"
          margin="normal"
          name="Course"
          onChange={(e)=>setCourse(e.target.value)}
          value={Course}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Certified Teachers"
          margin="normal"
          name="Teacher"
          onChange={(e)=>setTeacher(e.target.value)}
          value={Teacher}
          variant="outlined"
        />
        <Box my={2}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={counterData}
          >
            Set
          </Button>
        </Box>
      </Card>
    );
  };
  
  export default CounterValues;
  