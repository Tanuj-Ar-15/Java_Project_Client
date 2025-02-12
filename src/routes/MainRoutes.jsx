import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';



// render - sample page
const SampleAlbums = Loadable(lazy(() => import('pages/albums/albums')));
const SampleAbout = Loadable(lazy(() => import('pages/staticPages/about')));
const SampleAddAlbum = Loadable(lazy(() => import('pages/albums/addAlbum')));
const SampleEditAlbum = Loadable(lazy(() => import('pages/albums/editAlbum')));
const SampleShowAlbum = Loadable(lazy(() => import('pages/albums/albumShow')));
const SampleUploadPhotos = Loadable(lazy(() => import('pages/albums/uploadPhoto')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <SampleAlbums />
    },

    {
      path: '/about',
      element: <SampleAbout/>
    },
    {
      path: '/add-album',
      element: <SampleAddAlbum/>
    },   {
      path: '/show-photos',
      element: <SampleShowAlbum/>
    },
    {
    path: '/upload-photos',
    element: <SampleUploadPhotos/>
  },
  { 
    path: '/edit-album',
    element: <SampleEditAlbum/>
  }




  ]
};

export default MainRoutes;
