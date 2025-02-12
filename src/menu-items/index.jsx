// project import
import about from './about';
import logout from './logout';
import pages from './page';

import support from './album';

// ==============================|| MENU ITEMS ||============================== //
function getMenu() {
  let token = localStorage.getItem('token');

  let pageHead = token ? logout : pages;

  const menuItems = {
    items: [pageHead, support, about]
  };

  return menuItems
}

export default getMenu;
