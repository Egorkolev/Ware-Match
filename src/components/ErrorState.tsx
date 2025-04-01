'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onRetry?: (() => void) | (() => Promise<void>);
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  const handleRetry = async () => {
    if (onRetry) {
      await onRetry();
    }
  };

  return (
    <Card className="w-full p-6">
      <CardHeader className="flex items-center justify-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 text-destructive" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <CardTitle className="mt-4 text-lg">An error occurred</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        {message}
      </CardContent>
      {onRetry && (
        <CardFooter className="flex justify-center pt-2">
          <Button onClick={handleRetry} variant="default">
            Try again
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}; 