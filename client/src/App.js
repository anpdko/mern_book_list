import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import CreateBook from './pages/CreateBook';
import ShowBookList from './pages/ShowBookList';
import ShowBookDetails from './pages/ShowBookDetails';
import UpdateBookInfo from './pages/UpdateBookInfo';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ShowBookList/>} />
      <Route path='/create-book' element={<CreateBook/>} />
      <Route path='/edit-book/:id' element={<UpdateBookInfo/>}/>
      <Route path='/show-book/:id' element={<ShowBookDetails/>}/>
    </Routes>
  );
};

export default App;