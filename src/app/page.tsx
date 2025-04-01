'use server'

import { LoadingState } from '@/components/LoadingState';
import { ErrorState } from '@/components/ErrorState';
import { fetchListings } from './actions/listings';
import ClientHome from '@/app/ClientHome';
import { Suspense } from 'react';

async function refreshListings() {
  'use server';
  
  await fetchListings({
    email: 'tester@gmail.com',
    password: 'Tester@1234'
  });
}

export default async function HomePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ListingsContainer />
    </Suspense>
  );
}

async function fetchListingsData() {
  return fetchListings({
    email: 'tester@gmail.com',
    password: 'Tester@1234'
  });
}

async function ListingsContainer() {
  const response = await fetchListingsData();

  if (!response.success) {
    return (
      <ErrorState
        message={response.message || 'Error loading data'}
        onRetry={refreshListings}
      />
    );
  }

  return (
    <ClientHome
      listings={response.listings || []}
      refreshListings={refreshListings}
    />
  );
}
