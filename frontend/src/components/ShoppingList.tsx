import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, CircularProgress, Box } from '@mui/material';
import { backend } from 'declarations/backend';

const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const list = await backend.generateShoppingList();
        setShoppingList(list);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shopping list:', error);
        setLoading(false);
      }
    };
    fetchShoppingList();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Shopping List
      </Typography>
      <List>
        {shoppingList.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ShoppingList;
