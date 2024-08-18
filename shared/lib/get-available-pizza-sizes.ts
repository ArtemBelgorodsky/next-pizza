import { ProductVariation } from '@prisma/client';
import { PizzaType, pizzaSizes } from '../constans/pizza';

export const getAvailabelPizzaSizes = (
  type: PizzaType,
  items: ProductVariation[]
) => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType == type);

  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) == Number(item.value)
    ),
  }));
};
