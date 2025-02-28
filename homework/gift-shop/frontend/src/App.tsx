import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './ui/components/common/Layout';
import HomePage from './ui/pages/HomePage';
import GiftsPage from './ui/pages/GiftsPage';
import AddGiftPage from './ui/pages/AddGiftPage';


const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gifts" element={<GiftsPage />} />
        <Route path="/add-gift" element={<AddGiftPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
