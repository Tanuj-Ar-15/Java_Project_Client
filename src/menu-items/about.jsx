// assets
import {  QuestionOutlined } from '@ant-design/icons';
import { keyBy } from 'lodash';

// icons
const icons = {

  QuestionOutlined,
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const about = {
  id: 'pages',
  title: 'Pages',
  type: 'group',
  children: [
    {
      id: 'About',
      title: 'About',
      type: 'item',
      url: '/about',
      icon: icons.QuestionOutlined,
  
    }
  ]
};

export default about;
