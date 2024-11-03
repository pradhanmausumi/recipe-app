import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Search from './component/Search';
import RecipeDetails from './component/RecipeDetails';
import RecipeList from './component/RecipeList';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Search onSearch={handleSearch} /> {/* Pass handleSearch to Search */}
      <Routes>
        <Route path="/" element={<RecipeList query={searchQuery} />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  );
}

export default App;
