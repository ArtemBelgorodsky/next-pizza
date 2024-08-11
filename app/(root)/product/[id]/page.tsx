import { Container, ProductImage, Title } from '@/components/shared';
import { GroupVariants } from '@/components/shared/group-variats';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) return notFound();

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} className="" size={40} />
        <div className="w-[490px] bg-[#f7f7f7] p-7">
          <Title text={product.name} size="md" className="font-extrabold" />
          <p className="text-gray-400">LOREM IPSUM</p>

          <GroupVariants
            selectedValue="2"
            items={[
              { name: 'Маленькая пицца', value: '1', disabled: false },
              { name: 'Средняя пицца', value: '2', disabled: true },
              { name: 'Большая пицца', value: '3', disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
