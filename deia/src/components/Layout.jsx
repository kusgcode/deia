import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AnnouncementBar from './AnnouncementBar';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchOverlay from './SearchOverlay';

export default function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="site-wrapper">
      <AnnouncementBar />

      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />

      {searchOpen && (
        <SearchOverlay onClose={() => setSearchOpen(false)} />
      )}
    </div>
  );
}