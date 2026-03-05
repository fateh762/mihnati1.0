import { useEffect, useRef, useCallback } from 'react';
import { dyadService } from '@/services/dyadService';

export const useDyad = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  const trackEvent = useCallback((eventName: string, eventData: unknown) => {
    dyadService.logEvent(eventName, eventData);
  }, []);

  const trackComponentView = useCallback((componentName: string, properties: unknown) => {
    dyadService.trackComponentView(componentName, properties);
  }, []);

  const updateState = useCallback((stateKey: string, stateValue: unknown) => {
    dyadService.updateState(stateKey, stateValue);
  }, []);

  useEffect(() => {
    if (isInitializedRef.current) return;

    dyadService.initialize();
    isInitializedRef.current = true;

    if (componentRef.current) {
      const componentName = componentRef.current.getAttribute('data-component-name') || 'Unknown';
      trackComponentView(componentName, {
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
      });
    }

    return () => {
      dyadService.cleanup();
    };
  }, [trackComponentView]);

  return {
    componentRef,
    trackEvent,
    trackComponentView,
    updateState,
  };
};

export default useDyad;