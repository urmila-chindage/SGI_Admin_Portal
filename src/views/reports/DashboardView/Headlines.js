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
  import { useEffect } from 'react';
 
  
  const Headline = ({ className, ...rest }) => {
    const useStyles = makeStyles(theme => ({
      root: {
        height: '100%'
      }
    }));
  
    const [data, setData] = useState({
      headline: ''
    });
    const classes = useStyles();
  
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Marquee Headline" />
        <Divider />
        <TextField
          fullWidth
          label="Enter headline"
          margin="normal"
          name="this year"
          onChange={e => {
            setData({ ...data, headline: e.target.value });
          }}
          value={data.headline}
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
           
          >
            Set
          </Button>
        </Box>
      </Card>
    );
  };
  
  export default Headline;
  