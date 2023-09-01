import React, { useState } from 'react';
import {
  Box,
  Container,
  Drawer,
  IconButton,
  makeStyles,
  Typography,
  useTheme
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';

import { useEffect } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import AddNews from './AddNews';
import NewsResults from './NewsResult';

import AddImpLink from './AddImpLink';
import LinksResult from './LinksResult';
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

const NewsList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isLinksOpen, setIsLInksOpen] = useState(false);
  const [news, setNews] = useState([]);
  const [links, setLinks] = useState([]);
  const theme = useTheme();

 const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleImpLinksDrawerOpen = () => {
    setIsLInksOpen(true);
  };

  const handleImpLinksDrawerClose = () => {
    setIsLInksOpen(false);
  };

  const getAllNewsData = async () => {
    await axios
      .get('https://localhost:44312/api/News')
      .then(res => {
        console.log(res.data.data);
        setNews(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllNewsData();
  },[])
 

  return (
    <Page className={classes.root} title="News">
      <Container maxWidth={false}>
        <Toolbar
          handleDrawerOpen={handleDrawerOpen}
          handleImpLinksOpen={handleImpLinksDrawerOpen}
        />
        <Box mt={3} mb={3}>
          <Typography color="textPrimary" variant="h2">
            News
          </Typography>
          <NewsResults allNews={news} mt={3}/>
        </Box>
        <Box mt={3}>
          <Typography color="textPrimary" variant="h2">
            Important Links
          </Typography>
          <LinksResult links={links} />
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
          <AddNews handleDrawerClose={handleDrawerClose} />
        </Drawer>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={isLinksOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleImpLinksDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <AddImpLink handleDrawerClose={handleImpLinksDrawerClose} />
        </Drawer>
      </Container>
    </Page>
  );
};

export default NewsList;
