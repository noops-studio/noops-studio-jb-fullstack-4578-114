// Header.tsx
import React from 'react';
import { ResponsiveAppBar } from './MuiHeader';
import { patch } from '@mui/material';

export default function Header() {
  const links = [
    { path: '/profile', name: 'Profile' ,type: 'menu'},
    { path: '/feed', name: 'Feed' ,type: 'menu' },
    {path: '/logout', name: 'logout', type: 'settings' },
  ];

  return <ResponsiveAppBar links={links} />;
}
