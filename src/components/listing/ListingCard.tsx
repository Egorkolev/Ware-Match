import React, { useState } from 'react';
import Image from 'next/image';
import { Listing } from '@/types/listings';
import { ListingDetails } from './ListingDetails';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ListingCardProps {
  listing: Listing;
  isPriority?: boolean;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, isPriority = false }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formattedLocation = () => {
    if (listing.city && listing.province) {
      return `${listing.city}, ${listing.province}`;
    }
    return listing.location;
  };

  return (
    <>
      <Card 
        className="overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative h-48 w-full">
          {listing.imageUrl ? (
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              priority={isPriority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
          
          <div className="absolute top-2 right-2 z-10">
            <Badge variant={listing.type === 'sublease' ? 'default' : 'secondary'}>
              {listing.type === 'sublease' ? 'Sublease' : '3PL'}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-4">
          <CardTitle className="text-lg truncate mb-2">{listing.title}</CardTitle>
          
          <div className="text-sm text-muted-foreground">
            <p className="truncate">{formattedLocation()}</p>
          </div>
          
          <div className="mt-3 flex justify-between items-center">
            <span className="font-bold text-lg">
              {listing.price ? `${listing.price.toLocaleString()} ${listing.type === 'sublease' ? '$/sq.ft.' : '$/pallet'}` : 'Price on request'}
            </span>
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/20">
              {listing.availableSqft.toLocaleString()} sq.ft.
            </Badge>
          </div>
        </CardContent>
      </Card>
      
      <ListingDetails 
        listing={listing} 
        open={showDetails} 
        onOpenChange={setShowDetails} 
      />
    </>
  );
}; 