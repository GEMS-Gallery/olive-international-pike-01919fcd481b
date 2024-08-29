import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';
import MealPlan from './components/MealPlan';
import Recipes from './components/Recipes';
import ShoppingList from './components/ShoppingList';

function App() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedRecipes, fetchedMealPlan] = await Promise.all([
          backend.getRecipes(),
          backend.getMealPlan()
        ]);
        setRecipes(fetchedRecipes);
        setMealPlan(fetchedMealPlan);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Meal Prep Planner
          </Typography>
          <Box>
            <Link to="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Meal Plan</Link>
            <Link to="/recipes" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Recipes</Link>
            <Link to="/shopping-list" style={{ color: 'white', textDecoration: 'none' }}>Shopping List</Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<MealPlan mealPlan={mealPlan} recipes={recipes} />} />
          <Route path="/recipes" element={<Recipes recipes={recipes} />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
