import { mapPizzaType, PizzaSize, PizzaType } from '../constans/pizza';
import { CartStateItem } from './get-cart-details';

export const getCartItemsDetails = (
  ingredients: CartStateItem['ingredients'],
  pizzaType: PizzaType | null,
  pizzaSize: PizzaSize | null
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} см`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(', ');
};
