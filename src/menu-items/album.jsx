// assets
import { PictureOutlined } from '@ant-design/icons';
import Albums from 'pages/albums/albums';

// icons
const icons = {
PictureOutlined
 
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const album = {
  id: 'album',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'sample-page',
        title: 'Album',
      type: 'item',
      url: '/',
      icon: icons.PictureOutlined
    },
    {
      id: 'Add Album',
        title: 'Add Album',
      type: 'item',
      url: '/add-album',
      icon: icons.PictureOutlined
    }
  ]
};

export default album;
