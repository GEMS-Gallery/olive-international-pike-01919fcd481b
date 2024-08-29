import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const MealPlan = ({ mealPlan, recipes }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getRecipeName = (recipeId) => {
    const recipe = recipes.find(r => r.id === recipeId);
    return recipe ? recipe.name : 'No meal planned';
  };

  return (
    <Grid container spacing={3}>
      {mealPlan.map((day, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {daysOfWeek[index]}
              </Typography>
              <Typography variant="body1">
                Breakfast: {getRecipeName(day.breakfast)}
              </Typography>
              <Typography variant="body1">
                Lunch: {getRecipeName(day.lunch)}
              </Typography>
              <Typography variant="body1">
                Dinner: {getRecipeName(day.dinner)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MealPlan;
