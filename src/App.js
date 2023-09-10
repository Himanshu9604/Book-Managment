
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookDetail from './components/BookDetails';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/book/:id" element={<BookDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;




