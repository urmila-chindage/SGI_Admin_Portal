import React, { useEffect,useState } from 'react';
import { Link as RouterLink, useLocation,useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Award as AchivementIcon
} from 'react-feather';

import WorkIcon from '@material-ui/icons/Work';
import UpdateIcon from '@material-ui/icons/Update';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MailIcon from '@material-ui/icons/Mail';
import NavItem from './NavItem';
import axios from "axios";

/*const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};*/

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
 
 /* {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },*/
  {
    href: '/app/testimonial',
    icon: UserIcon,
    title: 'Testimonials'
  },
  {
    href: '/app/updates',
    icon: UpdateIcon,
    title: 'Updates'
  },
  {
    href: '/app/staff',
    icon: UsersIcon,
    title: 'Staff'
  },
  {
    href: '/app/achivements',
    icon: AchivementIcon,
    title: 'Achivements'
  },
  {
    href: '/app/activities',
    icon: WorkIcon,
    title: 'Activity'
  },
  {
    href: '/app/academicCalender',
    icon: CalendarTodayIcon,
    title: 'Academic Calendar'
  },
  {
    href: '/app/publication',
    icon: MenuBookIcon,
    title: 'Publication'
  },
  {
    href: '/app/committee',
    icon: SupervisedUserCircleIcon,
    title: 'Committee'
  },
  {
    href: '/app/news',
    icon: AnnouncementIcon,
    title: 'News'
  },
  {
    href: '/app/library',
    icon: LibraryBooksIcon,
    title: 'Library'
  },
  {
    href: '/app/placement',
    icon: AttachMoneyIcon,
    title: 'Placement'
  },
  {
    href: '/app/resultnletter',
    icon: AssessmentIcon,
    title: 'Result & Letter'
  },
  {
    href: '/app/email',
    icon: MailIcon,
    title: 'Email'
  },
 /* {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },*/
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
 /* {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }*/
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [userData, setUserData] = useState({
    displayName: '',
    email: ''
  });

  const [loginUser,setLoginUser] = useState([]);
  const navigate = useNavigate();

  //const getUserName = async(id) => {
    //await axios.get(`https://localhost:44312/api/Registration/RId?RId=${id}`)
    /*if(user){
      user.RId.then(val=>{
          console.log(val);
          localStorage.setItem('Token', val);
      })
      setUserData({
        displayName: user.FName + user.LName,
        email: user.Email
      });
    }*/
   
  //}
  const signOut = () =>{
    localStorage.clear();
    navigate('/login');
  }
   
  useEffect(() => {
    const loginUser = JSON.parse(localStorage.getItem('user'));
    if (loginUser) {
      setLoginUser(loginUser);
    }
    console.log(loginUser)
  }, []);


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

 

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          to="/app/account"
        >
       </Avatar>
      <Typography className={classes.name} color="textPrimary" variant="h5">
         {loginUser.Emailid}
      </Typography>

        <Typography
          color="textSecondary"
          variant="body2"
        >
         Admin
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
      <Box p={2} m={2}>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => signOut()}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Box>
     
   
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
