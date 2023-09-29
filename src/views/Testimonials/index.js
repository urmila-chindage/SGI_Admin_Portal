
import React, { useState,useEffect } from 'react';
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Results from './Results';
import AddTestimonial from './AddTestimonials';
import EditTestimonials from "./EditTestimonials";
import axios from "axios";
import loader from "../../Images/1920x1080-0724884440e8ddd0896ff557b75a222a.gif"


const drawerWidth = "40%";

const useStyles = makeStyles((theme) => ({
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
  }
}));

const TestimonialsList = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [testimonilInfo,setTestimonialInfo] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState('');
  const theme = useTheme();
  const [isLoading, setisLoading] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleEditDrawerOpen = () => {
    setIsEditOpen(true);
  };

  const handleEditDrawerClose = () => {
    setIsEditOpen(false);
  };

  const getAllTestimonials = async () => {
    await axios
      .get('https://localhost:44312/api/Testimonials')
      .then(res => {
        console.log(res.data.data);
        setTestimonialInfo(res.data.data);
        setisLoading(false);
        })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getAllTestimonials();
  },[])

 return (
    <Page
      className={classes.root}
      title="Testimonials"
      
    >
     { isLoading ?
      (
            <Box className='custom-loader'></Box>
          ):(
      <Container maxWidth={false}>
        <Toolbar handleDrawerOpen={handleDrawerOpen} />
        <Box mt={3}>
       
          <Results testimonials={testimonilInfo}  handleEditDrawerOpen={handleEditDrawerOpen}
                  setCurrentlyEditing={setCurrentlyEditing}/>
            
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
        <AddTestimonial handleDrawerClose={handleDrawerClose} />
      </Drawer>

      <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={isEditOpen}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleEditDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          {Boolean(isEditOpen && currentlyEditing !== '') && (
            <EditTestimonials
              handleEditDrawerClose={handleEditDrawerClose}
              currentTestimonialId={currentlyEditing}
              
            />
           
          )}
          
        </Drawer>
      </Container>
      )
    }

    
    
      
    </Page>
  );
};

export default TestimonialsList;
