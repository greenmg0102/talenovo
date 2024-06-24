// hooks/useConsoleOverride.js
import { useEffect } from 'react';

const useConsoleOverride = () => {
  useEffect(() => {
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;

    console.log = function () {};
    console.warn = function () {};
    console.error = function () {};

    return () => {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);
};

export default useConsoleOverride;
