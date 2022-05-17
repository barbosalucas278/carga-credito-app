import { useState, useEffect } from "react";

const useSplashIsLoaded = () => {
  const [isLoaded, setIsloaded] = useState(false);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    setTimeout(() => {
      setIsloaded(true);
    }, 5000);
    return () => {
      cancel = true;
    };
  }, []);
  return { isLoaded: isLoaded };
};
export default useSplashIsLoaded;
