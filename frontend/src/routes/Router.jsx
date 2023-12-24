import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout/index';
import MinimalLayout from 'layout/MinimalLayout/index';
import Home from 'pages/Landing/Home';
import Login from 'pages/authentication/Login';
import Register from 'pages/authentication/Register';
import React, { Fragment, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Router = () => {
  // pages
  const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

  // render - sample page
  const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

  // render - utilities
  //   const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
  //   const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
  //   const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
  //   const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<MinimalLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/app" element={<MainLayout />}>
          <Route path="/app/" element={<DashboardDefault />} />
          <Route path="/app/sample-page" element={<SamplePage />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

export default Router;
