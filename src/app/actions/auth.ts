'use server';

import { apiClient, serverTokensStorage } from './utils';

export async function serverLogin(email: string, password: string): Promise<void> {
  try {
    const response = await apiClient.post(`/auth/jwt/create/`, {
      email,
      password,
    });
    
    serverTokensStorage.accessToken = response.data.access;
    serverTokensStorage.refreshToken = response.data.refresh;
    serverTokensStorage.expiresAt = Date.now() + 5 * 60 * 1000;
  } catch {
    throw new Error('Authentication failed');
  }
}

export async function refreshToken(): Promise<string> {
  try {
    if (!serverTokensStorage.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ access: string }>(`/auth/jwt/refresh/`, {
      refresh: serverTokensStorage.refreshToken,
    });
    
    serverTokensStorage.accessToken = response.data.access;
    serverTokensStorage.expiresAt = Date.now() + 5 * 60 * 1000;
    
    return response.data.access;
  } catch (error: unknown) {
    throw error;
  }
}

export async function getValidToken(): Promise<string> {
  if (!serverTokensStorage.accessToken || Date.now() >= serverTokensStorage.expiresAt) {
    if (serverTokensStorage.refreshToken) {
      try {
        const newToken = await refreshToken();
        return newToken;
      } catch {
        throw new Error('Session expired. Please login again.');
      }
    } else {
      throw new Error('No authentication tokens available. Please login.');
    }
  }
  
  return serverTokensStorage.accessToken;
} 