'use client';

import { useState } from 'react';
import { ListingType, Listing } from '@/types/listings';
import { ListingCard } from '@/components/listing/ListingCard';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface ClientHomeProps {
  listings: Listing[];
  refreshListings: () => Promise<void>;
}

export default function ClientHome({ listings, refreshListings }: ClientHomeProps) {
  const router = useRouter();
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const subleaseListings = listings.filter(
    listing => listing.type === ListingType.SUBLEASE
  );
  
  const threePlListings = listings.filter(
    listing => listing.type === ListingType.THREE_PL
  );

  const handleRefresh = async () => {
    setIsValidating(true);
    try {
      await refreshListings();
      router.refresh();
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Listings Service</h1>
          <div className="flex items-center gap-2">
            {isValidating && (
              <Badge variant="outline" className="bg-blue-50">
                Refreshing...
              </Badge>
            )}
            <Button
              onClick={handleRefresh}
              size="sm"
              variant="outline"
            >
              Refresh Data
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          <div>
            {!listings || listings.length === 0 ? (
              <EmptyState message="No listings found" />
            ) : (
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Sublease Listings
                    </h2>
                    <Badge variant="outline">
                      {subleaseListings.length} listings
                    </Badge>
                  </div>

                  {subleaseListings.length === 0 ? (
                    <EmptyState message="No sublease listings found" />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subleaseListings.map((listing, index) => (
                        <ListingCard key={listing.id} listing={listing} isPriority={index < 2} />
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      3PL Listings
                    </h2>
                    <Badge variant="outline">
                      {threePlListings.length} listings
                    </Badge>
                  </div>

                  {threePlListings.length === 0 ? (
                    <EmptyState message="No 3PL listings found" />
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {threePlListings.map((listing, index) => (
                        <ListingCard key={listing.id} listing={listing} isPriority={index < 2} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
