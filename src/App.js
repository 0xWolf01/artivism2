import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Weapons from './pages/Weapons';
import Exhibition from './pages/Exhibition';
import Gioconda from './pages/Gioconda';

import Lesmeules from './pages/Lesmeules';
import Deathandlife from './pages/Deathandlife';
import Thesower from './pages/Thesower';
import Sunflowers from './pages/Sunflowers';
import Giverny from './pages/Giverny';
import LePrintemps from './pages/LePrintemps';
import Campbells from './pages/Campbells';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="mt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))] px-0 max-w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pieces" element={<Gallery />} />
            <Route path="/gallery" element={<Navigate to="/pieces" replace />} />
            <Route path="/weapons" element={<Weapons />} />
            <Route path="/exhibition" element={<Exhibition />} />
            <Route path="/gioconda" element={<Gioconda />} />

            <Route path="/lesmeules" element={<Lesmeules />} />
            <Route path="/deathandlife" element={<Deathandlife />} />
            <Route path="/thesower" element={<Thesower />} />
            <Route path="/sunflowers" element={<Sunflowers />} />
            <Route path="/giverny" element={<Giverny />} />
            <Route path="/leprintemps" element={<LePrintemps />} />
            <Route path="/campbells" element={<Campbells />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
