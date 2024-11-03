import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipeList.css'; // Importing the CSS file

function RecipeList({ query }) {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1); // Page state

  async function downloadRecipe(searchQuery, pageNumber) {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        apiKey: import.meta.env.VITE_API_KEY,
        query: searchQuery,
        number: 10, // Number of results per page
        offset: (pageNumber - 1) * 10, // Offset based on the page number
      },
    });
    setRecipes(response.data.results || []);
  }

  useEffect(() => {
    downloadRecipe(query, page); // Fetch recipes for the current query and page
  }, [query, page]);

  return (
    <>
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <Link to={`/recipe/${recipe.id}`}>
                <h3 className="recipe-title">{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} />
              </Link>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </>
  );
}

export default RecipeList;
