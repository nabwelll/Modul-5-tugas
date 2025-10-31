// src/utils/favorites.js
const FAVORITES_KEY = 'resep-nusantara-favorites';

/**
 * Get all favorite recipes from localStorage
 * @returns {Array} Array of favorite recipe objects
 */
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

/**
 * Add a recipe to favorites
 * @param {Object} recipe - Recipe object to add
 * @returns {Array} Updated favorites array
 */
export const addFavorite = (recipe) => {
  try {
    const favorites = getFavorites();
    const exists = favorites.some(fav => fav.id === recipe.id && fav.type === recipe.type);
    
    if (!exists) {
      const updatedFavorites = [...favorites, recipe];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return updatedFavorites;
    }
    return favorites;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return getFavorites();
  }
};

/**
 * Remove a recipe from favorites
 * @param {number} recipeId - ID of the recipe to remove
 * @param {string} type - Type of recipe ('makanan' or 'minuman')
 * @returns {Array} Updated favorites array
 */
export const removeFavorite = (recipeId, type) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(
      fav => !(fav.id === recipeId && fav.type === type)
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return getFavorites();
  }
};

/**
 * Check if a recipe is in favorites
 * @param {number} recipeId - ID of the recipe
 * @param {string} type - Type of recipe ('makanan' or 'minuman')
 * @returns {boolean} True if recipe is favorited
 */
export const isFavorite = (recipeId, type) => {
  try {
    const favorites = getFavorites();
    return favorites.some(fav => fav.id === recipeId && fav.type === type);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};
