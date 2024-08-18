import { cn } from '@/shared/lib/utils';
import React from 'react';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variats';
import {
  mapPizzaType,
  PizzaSize,
  PizzaType,
  pizzaTypes,
} from '@/shared/constans/pizza';
import { Ingredient, ProductVariation } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { calcTotalPizzaPrice } from '@/shared/lib/calc-total-pizza-price';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductVariation[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  imageUrl,
  className,
  ingredients,
  items,
  onClickAddCart,
}) => {
  const {
    size,
    addIngredient,
    availableSizes,
    selectedIngredients,
    type,
    setSize,
    setType,
  } = usePizzaOptions(items);

  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const textDetails = `${size} см, ${mapPizzaType[type]} тесто.`;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className={cn(className, 'flex flex-1')}>
        <div className="flex items-center justify-center flex-1 relative w-full">
          <PizzaImage imageUrl={imageUrl} size={size} />
        </div>

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={name} size="md" className="mb-1 font-extrabold" />

          <p className="text-gray-400">{textDetails}</p>

          <div className="flex flex-col gap-4 mt-5">
            <GroupVariants
              items={availableSizes}
              value={String(size)}
              onClick={(value) => setSize(Number(value) as PizzaSize)}
            />
            <GroupVariants
              items={pizzaTypes}
              value={String(type)}
              onClick={(value) => setType(Number(value) as PizzaType)}
            />
          </div>

          <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
            <div className="grid grid-cols-3 gap-3 mt-3">
              {ingredients.map((ingredient) => (
                <IngredientItem
                  key={ingredient.id}
                  imageUrl={ingredient.imageUrl}
                  name={ingredient.name}
                  price={ingredient.price}
                  onClick={() => addIngredient(ingredient.id)}
                  active={selectedIngredients.has(ingredient.id)}
                />
              ))}
            </div>
          </div>

          <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
            Добавить в корзину за {totalPrice} ₽
          </Button>
        </div>
      </div>
    </div>
  );
};
