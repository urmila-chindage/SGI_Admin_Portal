import {
  AppBar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
  Tab,
  Tabs,
  TextField
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';
import ViewAuditReports from './ViewAuditReports';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  floatingBtn: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    float: 'right'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function AddAuditReport() {
  const [data, setData] = React.useState({
    title: '',
    file: null
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    const payload={
      Title : data.title,
      File : data.file
    }
    await axios
      .post('https://localhost:44312/api/AuditReport', payload)
      .then(res => {
        console.log(res.data);
        toast.success(`${res.data.Message}`);
        navigate(0);
      })
      .catch(error => {
        console.log(error);
        toast.error(error);
      });
  };
  const classes = useStyles();
  return (
    <Box m={2}>
       <ToastContainer/>
      <TextField
        fullWidth
        label="Title"
        margin="normal"
        name="title"
        onChange={e => {
          setData({ ...data, title: e.target.value });
        }}
        value={data.title}
        variant="outlined"
      />
      <TextField
        fullWidth
        margin="normal"
        name="image"
        onChange={e => {
          const fileReader = new FileReader();
           fileReader.onload = () => {
            if (fileReader.readyState === 2) {
              setData({ ...data, file: fileReader.result });
            }
         };
          fileReader.readAsDataURL(e.target.files[0]);
        }}
        type="file"
        variant="outlined"
      />
      <Box my={2}>
        <Button
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={onSubmit}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}

const AuditReports = ({ className, ...rest }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Audit Reports" />
      <Divider />
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Add Audit Report" {...a11yProps(0)} />
            <Tab label="List Audit Reports" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AddAuditReport />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ViewAuditReports />
        </TabPanel>
      </div>
    </Card>
  );
};

export default AuditReports;
