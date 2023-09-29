import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Drawer,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  useTheme
} from '@material-ui/core';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import { useEffect } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddPlacement from './AddPlacement';
import PlacementReportCard from './PlacementReportCard';
import { useRef } from 'react';
import clsx from 'clsx';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const drawerWidth = '70%';

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

const Placement = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
    const [isLoading, setisLoading] = useState(true);
  
  const [placementData,setPlacementData] = useState([]);
  const [open, setOpen] = useState(false);
  const [placementOfficer, setPlacementOfficer] = useState({
    name: '',
    image: '',
    description: ''
  });

  const fileRef = useRef(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleImageChange = e => {
    fileRef.current.click();
  };

  const setOfficerData = async() =>{
    const payload = {
      Name : placementOfficer.name,
      Image : placementOfficer.image,
      Description : placementOfficer.description
    }
      await axios.post("https://localhost:44312/api/PlacementOfficer",payload)
      .then((res)=>{
          console.log(res.data)
          toast.success(`${res.data.Message}`);
      })
      .catch((error)=>{
        console.log(error)
        toast.error(error);
      })
  }

  const getOfficerData = async() =>{
    await axios.get("https://localhost:44312/api/PlacementOfficer")
      .then((res)=>{
        
        let officerData = res.data.data
        console.log(officerData.length)
                setisLoading(false);
        for(let i = 0; i < officerData.length; i++){
          setPlacementOfficer({
            ...placementOfficer,
            name: officerData[i].Name,
            description: officerData[i].Description,
            image: officerData[i].Image
        });
      }
    })
    .catch((error)=>{
      console.log(error)
      toast.error(error);
    })
  }

  const getAllPlacementData = async () => {
    await axios
      .get('https://localhost:44312/api/Placement')
      .then(res => {
        console.log(res.data.data);
        setPlacementData(res.data.data);
        setisLoading(false);
      })
      .catch(error => {
        console.log(error);
        toast.error(error);
      });
  };

  useEffect(() => {
    getAllPlacementData();
    getOfficerData();
  }, []);

   
  return (
    <Page className={classes.root} title="Placement">
    { isLoading ?
      (
            <Box className='custom-loader'></Box>
          ):(
      <Container maxWidth={false}>
        <Toolbar handleDrawerOpen={handleDrawerOpen} />
        <Card
          className={clsx(classes.root, className)}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding:'20px',
            marginTop:"20px"
          }}
          {...rest}
        >
          <CardHeader title="Placement Officer" />
          <Divider />
          <Avatar alt={placementOfficer.name} src={placementOfficer.image} />
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={handleImageChange}
          >
            Change Image
          </Button>
          <input
            type="file"
            name="image"
            id="file"
            hidden
            ref={fileRef}
            onChange={(e)=>{
              if (e.target.files && e.target.files[0]) {
                let reader = new FileReader();
                reader.onload = e => {
                 setPlacementOfficer({
                    ...placementOfficer,
                    image: e.target.result
                  });
                };
                reader.readAsDataURL(e.target.files[0]);
              }
            }}
           
          />
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="name"
            onChange={e => {
              setPlacementOfficer({
                ...placementOfficer,
                name: e.target.value
              });
            }}
            value={placementOfficer.name}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            margin="normal"
            name="description"
            onChange={e => {
              setPlacementOfficer({
                ...placementOfficer,
                description: e.target.value
              });
            }}
            value={placementOfficer.description}
            multiline
            rows={5}
            variant="outlined"
          />
          <Box my={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={setOfficerData}
            >
              Set
            </Button>
          </Box>
        </Card>
        <Box mt={3}>
        <Grid container spacing={3}>
         {placementData.map((d, i) => (
            <Grid item key={d.PId} lg={4} md={6} xs={12}>
                <PlacementReportCard placement={d} />
            </Grid>
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
          <AddPlacement handleDrawerClose={handleDrawerClose} />
        </Drawer>
      </Container>
            )
    }
    </Page>
  );
};

export default Placement;
