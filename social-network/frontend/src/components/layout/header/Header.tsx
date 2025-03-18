// Header.tsx
import useUsername from '../../../hooks/useUsername';
import { ResponsiveAppBar } from './MuiHeader';

export default function Header() {
  const links = [
    { path: '/profile', name: 'Profile', type: 'menu' as const },
    { path: '/feed', name: 'Feed', type: 'menu' as const },
    { path: '/logout', name: 'Logout', type: 'settings' as const },
    { path: '/logouta', name: 'Logouta', type: 'settings' as const },
  ];

  const profilePicUrl = "https://cdn.ozari.co.il/beery/noop.jpeg"; // Replace with dynamic URL
  const username = useUsername();

  return (
    <ResponsiveAppBar
      links={links}
      profilePicUrl={profilePicUrl}
      username={username}
    />
  );
}
