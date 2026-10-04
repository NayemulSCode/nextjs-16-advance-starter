import { Suspense } from 'react';
import { FoodMap } from '@/components/FoodMap';

export default function Home() {
  return (
    <Suspense>
      <FoodMap />
    </Suspense>
  );
}
