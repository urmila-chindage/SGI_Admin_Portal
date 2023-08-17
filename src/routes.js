import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/AccountView';
import DashboardView from './views/reports/DashboardView';
import NotFoundView from './views/errors/NotFoundView';
import TestimonialsList from './views/Testimonials';
/*import StaffList from 'src/views/staff/StaffListView';
import HighlightListView from './views/Highlight/HighlightListView';
import AchivementsListView from './views/achivements/AchivementListView';
import ActivitiesListView from './views/activities/ActivitiesListView';
import UpdateListView from './views/updates/UpdateListView';
import CalendarList from './views/calendar/CalendarListView';
import PublicationsList from './views/publications';

import Committee from './views/committee';
import LoginView from './views/auth/LoginView';
import firebase from 'firebase';
import NewsList from './views/News';
import EmailView from './views/email';
import Library from './views/Library';
import Placement from './views/Placement';*/
//import ResultnLetter from './views/ResultnLetter';
 import LoginView from 'src/views/auth/LoginView';
 import RegisterView from './views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'testimonial', element: <TestimonialsList /> },
     /* { path: 'updates', element: <UpdateListView /> },
      { path: 'staff', element: <StaffList /> },
      { path: 'highlights', element: <HighlightListView /> },
      { path: 'achivements', element: <AchivementsListView /> },
      { path: 'activities', element: <ActivitiesListView /> },
      { path: 'academicCalender', element: <CalendarList /> },
      { path: 'publication', element: <PublicationsList /> },
    
      { path: 'committee', element: <Committee /> },
      { path: 'news', element: <NewsList /> },
      { path: 'library', element: <Library /> },
      { path: 'placement', element: <Placement /> },
      { path: 'resultnletter', element: <ResultnLetter /> },
      { path: 'email', element: <EmailView /> },*/
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
