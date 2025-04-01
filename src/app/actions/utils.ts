import axios from 'axios';
import { Listing, ApiListing, ListingType } from '@/types/listings';

export function mapApiListingToListing(apiListing: ApiListing): Listing {
  const type = apiListing.listing_type.toLowerCase() === "3pl" 
    ? ListingType.THREE_PL 
    : ListingType.SUBLEASE;
  
  let price = 0;
  if (apiListing.price_per_standard_pallet_stackable_per_month) {
    price = parseFloat(apiListing.price_per_standard_pallet_stackable_per_month);
  } else if (apiListing.price_per_standard_pallet_non_stackable_per_month) {
    price = parseFloat(apiListing.price_per_standard_pallet_non_stackable_per_month);
  } else if (apiListing.sublease_per_sqft_price) {
    price = parseFloat(apiListing.sublease_per_sqft_price);
  }
  
  const availableSqft = apiListing.available_square_footage 
    ? parseFloat(apiListing.available_square_footage) 
    : 0;
  
  let imageUrl;
  if (apiListing.images && apiListing.images.length > 0) {
    imageUrl = apiListing.images[0].image_url;
  }
  
  return {
    id: apiListing.id,
    title: apiListing.ListingName,
    description: apiListing.ListingDetails,
    price: price,
    availableSqft: availableSqft,
    location: apiListing.Location,
    type: type,
    imageUrl: imageUrl,
    images: apiListing.images,
    city: apiListing.city,
    province: apiListing.province,
    services: apiListing.services,
    amenities: apiListing.amenities,
    contacts: apiListing.contacts,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ceiling_height: apiListing.ceiling_height,
    dock_doors: apiListing.dock_doors,
    dock_door_quantity: apiListing.dock_door_quantity,
    product_types: apiListing.product_types,
    storage_conditions: apiListing.storage_conditions
  };
}

export const BASE_URL = 'http://54.242.149.77:8000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const serverTokensStorage = {
  accessToken: '',
  refreshToken: '',
  expiresAt: 0,
}; 