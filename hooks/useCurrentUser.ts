"use client"

import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  const currentUser = data?.currentUser; 
  
  return {
    currentUser,
    error,
    isLoading,
    mutate
  }
};

export default useCurrentUser;