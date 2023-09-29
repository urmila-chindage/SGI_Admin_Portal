import React, { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  useTheme
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';

import { useEffect } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddCommittee from './AddCommittee';
import Results from './Results';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const drawerWidth = "40%";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

const Committee = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [committees, setcommittees] = useState([]);
  const [open, setOpen] = useState(false);
    const [isLoading, setisLoading] = useState(true);

  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getAllCommitteeData = async () => {
    await axios
      .get('https://localhost:44312/api/Committee')
      .then(res => {
        console.log(res.data.data);
        setcommittees(res.data.data);
                setisLoading(false);
      })
      .catch(error => {
        console.log(error);
        toast.error(error);
      });
  };
  useEffect(() => {
    getAllCommitteeData();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Committee"
    >
    { isLoading ?
      (
            <Box className='custom-loader'></Box>
          ):(
      <Container maxWidth={false}>
      <ToastContainer/>
        <Toolbar handleDrawerOpen={handleDrawerOpen}/>
        <Box mt={3}>
          <Results committees={committees}/>
        </Box>
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {/* <AddAchivement handleDrawerClose={handleDrawerClose} /> */}
        <AddCommittee handleDrawerClose={handleDrawerClose} />
      </Drawer>
      </Container>
            )
    }
    </Page>
  );
};

export default Committee;
