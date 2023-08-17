import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    TextField
  } from '@material-ui/core';
  import React from 'react';
  import clsx from 'clsx';
  import { deepPurple } from '@material-ui/core/colors';
  import { useState } from 'react';
  
  
  import { useEffect } from 'react';
  import DeleteIcon from '@material-ui/icons/Delete';
  
  const useStyles = makeStyles(theme => ({
    root: {
      height: '100%'
    },
    image: {
      height: 48,
      width: 48
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500]
    }
  }));
  const VideoCarousel = ({ className, ...rest }) => {
    const classes = useStyles();
  
    const [data, setData] = useState({
      title: '',
      url: ''
    });
    const [allData, setAllData] = useState([]);
  
   
  
   
   
       
   
    return (
      <Card className={clsx(classes.root, className)} {...rest}>
        <Grid spacing={1} container>
          <Grid item lg={4} md={4} xl={12} xs={12}>
            <Card className={clsx(classes.root)}>
              <CardHeader title="Add Video" />
              <Divider />
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                name="title"
                onChange={e => {
                  setData({ ...data, title: e.target.value });
                }}
                value="dffdg"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Video URL"
                margin="normal"
                FormHelperTextProps="help"
                name="url"
                onChange={e => {
                  setData({ ...data, url: e.target.value });
                }}
                value="dffgg"
                variant="outlined"
                required
              />
              <Box my={2}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                 
                >
                  Add
                </Button>
              </Box>
            </Card>
          </Grid>
          <Grid item lg={8} md={8} xl={12} xs={12}>
            <Card className={clsx(classes.root)}>
              <CardHeader subtitle="dfgfdg" title="All Videos" />
              <Divider />
              <Box
                height="450px"
                display="flex"
                flexDirection="column"
                overflow="scroll"
              >
                <List>
                 
                      <ListItem divider={10}>
                        <ListItemAvatar>
                          <Avatar className={classes.purple}>
                           fgfghgfh
                          </Avatar>
                        </ListItemAvatar>
                        <Grid container>
                          <Grid item lg={8} md={8} xl={12} xs={12}>
                            <ListItemText primary="dfdgf" />
                          </Grid>
                          <Grid item lg={4} md={4} xl={4} xs={4}>
                            <ListItemText secondary>
                              <Button
                                variant="outlined"
                                color="primary"
                                href="fffgh"
                                target="blank"
                              >
                                Open Video
                              </Button>
                            </ListItemText>
                          </Grid>
                        </Grid>
                        <Button
                          variant="outlilned"
                          color="secondary"
                         
                        >
                          <DeleteIcon />
                        </Button>
                      </ListItem>
                    
                </List>
              </Box>
              <Divider />
            </Card>
          </Grid>
        </Grid>
      </Card>
    );
  };
  
  export default VideoCarousel;
  