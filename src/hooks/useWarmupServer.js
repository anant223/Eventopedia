import React, { useEffect, useState } from 'react'

const useWarmupServer = (endPoint) => {
    const [isWakingUp, setIsWakingUp] = useState(false)

    useEffect(() => {
      if (!endPoint) return;

      const warmup = async () => {
        setIsWakingUp(true);
        try {
          await fetch(endPoint);
        } catch (err) {
          console.error("Warmup failed:", err);
        } finally {
          setIsWakingUp(false);
        }
      };

      warmup();
    }, [endPoint]);
    
    return isWakingUp
}

export default useWarmupServer
