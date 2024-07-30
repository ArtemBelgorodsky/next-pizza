'use client';

import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import React, { useEffect } from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';

interface Props {
  title: string;
  items: any['products'];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  className,
  listClassName,
  categoryId,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection && intersection.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="mb-5 font-extrabold" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((item: any) => (
          <ProductCard
            id={item.id}
            name={item.name}
            price={item.variations[0].price}
            imageUrl={item.imageUrl}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};
