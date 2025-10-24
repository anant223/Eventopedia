import React, { useCallback, useState } from 'react';
import { DISCORD_ICON, GOOGLE_ICON } from '@/assets/web-assets/Assets';
import { AppButton } from '../common/index';

const SocialAuthButtons = () => {
    const [isLoading, setIsLoading] = useState({
        google : false,
        discord: false
    })
    const getAuthURL = (provider) => {
      const allowed = ["google", "discord"]
      if(!allowed.includes(provider)) throw new Error("Invalid provider")
      return `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/${provider}/auth`
    }

    const handleAuth = useCallback(async (provider) => {
        if(isLoading[provider]) return;

        setIsLoading(prev => ({...prev, [provider] : true}))

        try {
            const authUrl = getAuthURL(provider);
            window.location.href = authUrl;

        } catch (error) {
            console.error(`${provider} Auth Error:`, error.message);
            setIsLoading(prev => ({...prev, [provider] : false}))
        }
    }, [isLoading])

    const isAnyLoading = isLoading.google || isLoading.discord
    
    return (
      <div className="flex flex-col gap-4 mb-6">
        <AppButton
          onClick={() => handleAuth("google")}
          size="md"
          isLoading={isLoading.google}
          isDisable={isAnyLoading}
          buttonStyle={"google"}
          aria-label="Continue with Google"
        >
          {GOOGLE_ICON}
          <span className="whitespace-nowrap">
            {isLoading.google ? "Connecting..." : "Continue with Google"}
          </span>
        </AppButton>
        <AppButton
          onClick={() => handleAuth("discord")}
          size="md"
          isLoading={isLoading.discord}
          isDisable={isAnyLoading}
          buttonStyle={"discord"}
          aria-label = "Continue with Discord"
        >
          {DISCORD_ICON} {/*svg*/}
          <span className="whitespace-nowrap">
            {isLoading.discord ? "Connecting..." : "Continue with Discord"}
          </span>
        </AppButton>
      </div>
    );
}


export default SocialAuthButtons