import { createCampaign, dashboard, logout, profile } from '../assets';
import { useStateContext } from '../context/index';

// const { address } = useStateContext();

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'operation',
    imgUrl: createCampaign,
    link: '/create-operation',
    // Display the "operation" link only if `address` matches the specified value
    // disabled: address != '0x53F25b4b2b7AA33F3c5B3a08F5C9a06d24EDb196',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true, // Keep the logout link disabled for now
  },
];
