// Header.tsx
import React from 'react';
import { ResponsiveAppBar } from './MuiHeader';

export default function Header() {
  const links = [
    { path: '/profile', name: 'Profile' },
    { path: '/feed', name: 'Feed' },
  ];

  return <ResponsiveAppBar links={links} />;
}
