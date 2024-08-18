import React from 'react';
import { Variant } from '../components/shared/group-variats';
import { PizzaSize, PizzaType } from '../constans/pizza';
import { useSet } from 'react-use';
import { getAvailabelPizzaSizes } from '../lib/get-available-pizza-sizes';
import { ProductVariation } from '@prisma/client';

interface RetornProps {
  size: PizzaSize;
  type: PizzaType;
  setSize: (size: PizzaSize) => void;
  setType: (type: PizzaType) => void;
  selectedIngredients: Set<number>;
  addIngredient: (id: number) => void;
  availableSizes: Variant[];
}

export const usePizzaOptions = (items: ProductVariation[]) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = getAvailabelPizzaSizes(type, items);

  React.useEffect(() => {
    const isDisabledSize = availableSizes?.find(
      (item) => Number(item.value) == size && !item.disabled
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);

    if (!isDisabledSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [type]);

  return {
    size,
    type,
    setSize,
    setType,
    selectedIngredients,
    addIngredient,
    availableSizes,
  };
};
