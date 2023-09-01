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
import Toolbar from './Toolbar';
import { useEffect } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Results from './Results';
import AddLibraryData from './AddLIbraryData';
import axios from "axios";

const drawerWidth = '80%';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  staffCard: {
    height: '100%'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  title: {
    flexGrow: 1
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  }
}));

const Library = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [bookbank, setBookbank] = useState([]);
  const theme = useTheme();

 const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getAllLibraryData = async () => {
    await axios
      .get('https://localhost:44312/api/Library')
      .then(res => {
        console.log(res.data.data);
        let categoryData = res.data.data;
        let reportData = [];
        let achievementData = [];
        let bookbankData = [];
        categoryData.map((item,i)=>{
          if(item.Category==="REPORT"){
            reportData.push(item);
          }
          if(item.Category==="ACHIEVEMENT"){
            achievementData.push(item);
          }
          if(item.Category==="BOOKBANK"){
            bookbankData.push(item);
          }
        })
        setReports(reportData);
        setAchievements(achievementData);
        setBookbank(bookbankData);
        })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllLibraryData();
  },[])

  return (
    <Page className={classes.root} title="Academic Calendar">
      <Container maxWidth={false}>
        <Toolbar handleDrawerOpen={handleDrawerOpen} />
        <Box mt={3}>
          <Results library={reports} style={{marginBottom:"10px"}}/>
          <Results library={achievements} style={{marginBottom:"10px"}}/>
          <Results library={bookbank} style={{marginBottom:"10px"}}/> 
        </Box>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <AddLibraryData handleDrawerClose={handleDrawerClose} />
         </Drawer>
      </Container>
    </Page>
  );
};

export default Library;
