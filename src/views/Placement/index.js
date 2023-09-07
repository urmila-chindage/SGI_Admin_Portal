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

  const getAllPlacementData = async () => {
    await axios
      .get('https://localhost:44312/api/Placement')
      .then(res => {
        console.log(res.data.data);
        setPlacementData(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPlacementData();
  }, []);

   
  return (
    <Page className={classes.root} title="Placement">
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
          <Avatar alt="dfgffgh" src="fhfg" />
          <Button
            color="primary"
            size="large"
            variant="contained"
           
          >
            Change Image
          </Button>
          <input
            type="file"
            name="file"
            id="file"
            hidden
            ref={fileRef}
           
           
          />
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            name="this year"
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
    </Page>
  );
};

export default Placement;
