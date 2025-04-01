'use server';

import { Listing, ApiListing } from '@/types/listings';
import { apiClient, mapApiListingToListing } from './utils';
import { serverLogin } from './auth';
import { getValidToken } from './auth';

export async function fetchListingById(
  id: string, 
  credentials?: { email: string; password: string }
): Promise<{ success: boolean; listing?: Listing; message?: string }> {
  try {
    if (credentials) {
      await serverLogin(credentials.email, credentials.password);
    }
    
    try {
      const token = await getValidToken();
      
      const response = await apiClient.get<ApiListing>(`/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });
      
      if (response.status === 200) {
        const listing = mapApiListingToListing(response.data);
        
        return {
          success: true,
          listing
        };
      } else {
        return {
          success: false,
          message: `Server responded with status ${response.status}: ${response.statusText}`
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: `Failed to fetch listing: ${errorMessage}`
      };
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      message: `Failed to fetch listing: ${errorMessage}`
    };
  }
} 