import { Api } from '@/shared/services/api-client';
import React from 'react';
import { Ingredient } from '@prisma/client';

export const useIngredients = () => {
  const [loading, setLoading] = React.useState(true);
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchIngredients();
  }, []);
  return {
    ingredients,
    loading,
  };
};
