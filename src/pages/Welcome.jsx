import { BodyContainer } from '@/components/containers/Container';
import Onboarding from '@/components/onBoarding/OnBoarding';
import useAuth from '@/hooks/useAuth';
import React from 'react';


const Welcome = () => {
    const {onBoardingCompletion} = useAuth()
    return (
      <div className="w-full min-h-screen">
        <BodyContainer>
          <Onboarding createOnboarding={onBoardingCompletion} />
        </BodyContainer>
      </div>
    );
}

export default Welcome;
