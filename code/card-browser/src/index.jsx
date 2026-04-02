import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Viewer from './Viewer.jsx';
import Printable from './Printable.jsx';
import Conflict from './Conflict.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Conflict />} />
      <Route path="/conflict" element={<Conflict />} />
      <Route path="/search" element={<Viewer />} />
      <Route path="/card/:cardName" element={<Printable />} />
    </Routes>
  </BrowserRouter>,
);
