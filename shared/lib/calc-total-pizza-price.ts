import { Ingredient, ProductVariation } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constans/pizza';
/**
 * Функция Подсчета общей стоимости пиццы
 * @param type
 * @param size
 * @param items
 * @param ingredients
 * @param selectedIngredients
 * @returns
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductVariation[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const PizzaPrice =
    items.find((item) => item.pizzaType == type && item.size == size)?.price ||
    0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return PizzaPrice + totalIngredientsPrice;
};
