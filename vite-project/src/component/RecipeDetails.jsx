import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './RecipeDetails.css'; // Importing the CSS file

function RecipeDetails() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`);
      setRecipe(response.data);
    }
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-details">
      <h2 className="recipe-title">{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <p className="recipe-instructions">{recipe.instructions}</p>
      {/* You can add more recipe details here */}
    </div>
  );
}

export default RecipeDetails;
