'use client';

import { Suspense } from 'react';
import Loading from './loading';

export default async function Home() {
  return <Suspense fallback={<Loading />} />;
}
