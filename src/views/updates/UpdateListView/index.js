import React, { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  useTheme
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useEffect } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddUpdate from './AddUpdate';
import axios from "axios";
import loader from "../../../Images/1920x1080-0724884440e8ddd0896ff557b75a222a.gif"

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

const UpdateListView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [updates, setUpdates] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(true);

  const getAllUpdateData = async () => {
    await axios
      .get('https://localhost:44312/api/LatestUpdate/GetAllLUpdates')
      .then(res => {
        console.log(res.data.data);
        setUpdates(res.data.data);
        setisLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllUpdateData();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Updates"
    >
    { isLoading ?
      (
            <Box className='custom-loader'></Box>
          ):(
      <Container maxWidth={false}>
        <Toolbar openDrawer={handleDrawerOpen}/>
        <Box mt={3}>
          <Results updates={updates} />
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
        <AddUpdate handleDrawerClose={handleDrawerClose} />
       
      </Drawer>
      </Container>
      )
    }
    </Page>
  );
};

export default UpdateListView;
