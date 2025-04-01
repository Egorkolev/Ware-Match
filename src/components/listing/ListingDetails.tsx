import React from 'react';
import Image from 'next/image';
import { Listing, Contact } from '@/types/listings';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface ListingDetailsProps {
  listing: Listing;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ListingDetails: React.FC<ListingDetailsProps> = ({
  listing,
  open,
  onOpenChange,
}) => {

  const formatPrice = () => {
    if (!listing.price) return "Price on request";
    return `${listing.price.toLocaleString()} ${
      listing.type === "sublease" ? "$/sq.ft." : "$/pallet"
    }`;
  };

  const formatLocation = () => {
    if (listing.city && listing.province) {
      return `${listing.city}, ${listing.province}`;
    }
    return listing.location;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{listing.title}</DialogTitle>
          <DialogDescription>
            <Badge variant={listing.type === "sublease" ? "default" : "secondary"}>
              {listing.type === "sublease" ? "Sublease" : "3PL"}
            </Badge>
            <span className="ml-2 text-muted-foreground">{formatLocation()}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="relative h-64 md:h-80 mt-4 rounded-lg overflow-hidden">
          {listing.imageUrl ? (
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-medium">{formatPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Area:</span>
                <span className="font-medium">{listing.availableSqft.toLocaleString()} sq.ft.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-medium">{formatLocation()}</span>
              </div>
              
              <>
                  {listing.ceiling_height && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ceiling Height:</span>
                      <span className="font-medium">{listing.ceiling_height} ft</span>
                    </div>
                  )}
                  {listing.dock_doors && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dock Doors:</span>
                      <span className="font-medium">{listing.dock_door_quantity}</span>
                    </div>
                  )}
                </>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Features</CardTitle>
            </CardHeader>
            <CardContent>
              {listing.services && listing.services.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Services</h4>
                  <div className="flex flex-wrap gap-1">
                    {listing.services.map((service: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {listing.amenities && listing.amenities.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Amenities</h4>
                  <div className="flex flex-wrap gap-1">
                    {listing.amenities.map((amenity: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {listing && listing.product_types && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Product Types</h4>
                  <div className="flex flex-wrap gap-1">
                    {listing.product_types.map((type: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-4" />

        <div>
          <h3 className="text-lg font-medium mb-2">Description</h3>
          <p className="text-muted-foreground whitespace-pre-line">
            {listing.description || "No description available."}
          </p>
        </div>

        {listing.contacts && listing.contacts.length > 0 && (
          <>
            <Separator className="my-4" />
            <div>
              <h3 className="text-lg font-medium mb-2">Contact Information</h3>
              <div className="space-y-2">
                {listing.contacts.map((contact: Contact) => (
                  <Card key={contact.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between">
                        <span className="font-medium">{contact.name}</span>
                        <span>{contact.phone_number}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {contact.email}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}; 