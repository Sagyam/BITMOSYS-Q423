import Navbar from '@components/Navbar.tsx';
import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
