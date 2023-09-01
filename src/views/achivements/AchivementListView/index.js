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
import AchivementCard from './AchivementCard';
import AddAchivement from './AddAchivement';
import axios from "axios";

const drawerWidth = '80%';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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

const AchivementsListView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [achivements, setAchivements] = useState([]);
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getAllAcheivementData = async () => {
    await axios
      .get('https://localhost:44312/api/Achivement')
      .then(res => {
        console.log(res.data.data);
        setAchivements(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllAcheivementData();
  },[])


 

  return (
    <Page className={classes.root} title="Achievements">
      <Container maxWidth={false}>
        <Toolbar handleDrawerOpen={handleDrawerOpen} />
        <Box mt={3}>
          <Grid container spacing={3}>
            {achivements.map((achivement) => (
              <AchivementCard achivement={achivement} key={achivement.AId} style={{margin:'3px'}}/>
            ))}
          </Grid>
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
          {/* <AddUpdate handleDrawerClose={handleDrawerClose} /> */}
          <AddAchivement handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Container>
    </Page>
  );
};

export default AchivementsListView;