'use server';

import { ListingsResponse, ApiListing } from '@/types/listings';
import { apiClient, mapApiListingToListing } from './utils';
import { serverLogin } from './auth';
import { getValidToken } from './auth';

export async function fetchListings(credentials?: { email: string; password: string }): Promise<ListingsResponse> {
  try {
    if (credentials) {
      await serverLogin(credentials.email, credentials.password);
    }
    
    try {
      const token = await getValidToken();
      
      const response = await apiClient.get<ApiListing[] | { listings: ApiListing[] }>(`/listings/listings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });
      
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          const apiListings = response.data;
          
          const mappedListings = apiListings.map(mapApiListingToListing);
          
          return {
            success: true,
            listings: mappedListings
          };
        } 
        else if (response.data && Array.isArray(response.data.listings)) {
          const apiListings = response.data.listings;
          
          const mappedListings = apiListings.map(mapApiListingToListing);
          
          return {
            success: true,
            listings: mappedListings
          };
        }
        else {
          return {
            success: false,
            listings: [],
            message: 'Data received in unexpected format'
          };
        }
      } else {
        return {
          success: false,
          listings: [],
          message: `Server responded with status ${response.status}: ${response.statusText}`
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        listings: [],
        message: `Failed to fetch listings: ${errorMessage}`
      };
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      listings: [],
      message: 'Failed to fetch listings: ' + errorMessage
    };
  }
} 