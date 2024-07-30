import { useRouter, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useState } from 'react';

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

export interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.get('priceFrom') ? searchParams.get('sizes')?.split(',') : []
    )
  );

  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(
      searchParams.get('pizzaTypes')
        ? searchParams.get('pizzaTypes')?.split(',')
        : []
    )
  );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const filters = {
    ...prices,
    pizzaTypes: Array.from(pizzaTypes),
    sizes: Array.from(sizes),
    ingredients: Array.from(selectedIngredients),
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices,
    setPrice: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setSizes: toggleSizes,
    setIngredients: toggleIngredients,
  };
};
