import React, { useCallback, useState } from 'react'
import { toast } from 'sonner';
import { getAuthURL } from '@/lib/authURL';

const useSocialAuth  = () => {
  const [isLoading, setIsLoading] = useState({});

  const handleSocialAuth = useCallback(async (provider) => {

    if(!provider) {
      toast.error("Undefined provider!")
      return
    };
    setIsLoading((prev) =>
      prev[provider] ? prev : { ...prev, [provider]: true }
    );
    try {
        const url = await getAuthURL(provider)
        if (!url) {
          throw new Error(
            `Failed to generate authentication URL for ${provider}`
          );
        }
        window.location.href = url;
    } catch (error) {
      toast.error("Something went wrong with provider try again!");
      setIsLoading((prev) => ({ ...prev, [provider]: false }));
    }
  }, [])

  return { isLoading, handleSocialAuth};

}

export default useSocialAuth 
