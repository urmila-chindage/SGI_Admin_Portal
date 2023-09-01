import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/AccountView';
import DashboardView from './views/reports/DashboardView';
import NotFoundView from './views/errors/NotFoundView';
import TestimonialsList from './views/Testimonials';
import StaffList from 'src/views/staff/StaffListView';
import AchivementsListView from './views/achivements/AchivementListView';
import ActivitiesListView from './views/activities/ActivitiesListView';
import CalendarList from './views/calendar/CalendarListView';
import Committee from './views/committee';
import EmailView from './views/email';
import Library from './views/Library';
import NewsList from './views/News';
import Placement from './views/Placement';
import PublicationsList from './views/publications';
import ResultnLetter from './views/ResultnLetter';
import UpdateListView from './views/updates/UpdateListView';
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
      { path: 'staff', element: <StaffList /> },
      { path: 'achivements', element: <AchivementsListView /> },
      { path: 'activities', element: <ActivitiesListView /> },
      { path: 'academicCalender', element: <CalendarList /> },
      { path: 'committee', element: <Committee /> },
      { path: 'email', element: <EmailView /> },
      { path: 'library', element: <Library /> },
      { path: 'news', element: <NewsList /> },
      { path: 'placement', element: <Placement /> },
      { path: 'publication', element: <PublicationsList /> },
      { path: 'resultnletter', element: <ResultnLetter /> },
      { path: 'updates', element: <UpdateListView /> },
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
