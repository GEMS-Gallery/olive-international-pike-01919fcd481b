import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Recipes = ({ recipes }) => {
  return (
    <Grid container spacing={3}>
      {recipes.map((recipe) => (
        <Grid item xs={12} sm={6} md={4} key={recipe.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {recipe.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Meal Type: {recipe.mealType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ingredients: {recipe.ingredients.join(', ')}
              </Typography>
              <Typography variant="body2">
                Instructions: {recipe.instructions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Recipes;
