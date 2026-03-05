import axios from 'axios';
import dyadConfig from '@/dyad.config';

interface DyadEventData {
  eventName: string;
  eventData: unknown;
  timestamp: string;
  url: string;
}

interface DyadComponentView {
  componentName: string;
  properties: unknown;
  timestamp: string;
}

class DyadService {
  private apiClient = axios.create({
    baseURL: dyadConfig.baseUrl,
    timeout: 5000,
  });

  private isInitialized = false;

  initialize(): void {
    if (this.isInitialized) return;

    window.addEventListener('popstate', this.handlePageChange);
    this.isInitialized = true;

    console.log('[Dyad] Service initialized');
  }

  cleanup(): void {
    window.removeEventListener('popstate', this.handlePageChange);
    this.isInitialized = false;
  }

  logEvent(eventName: string, eventData: unknown): void {
    const payload: DyadEventData = {
      eventName,
      eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    console.log('[Dyad Event]', payload);

    if (import.meta.env.VITE_DYAD_ENDPOINT) {
      this.apiClient.post('/api/events', payload).catch((err) => {
        console.warn('[Dyad] Failed to log event:', err.message);
      });
    }
  }

  trackComponentView(componentName: string, properties: unknown): void {
    const payload: DyadComponentView = {
      componentName,
      properties,
      timestamp: new Date().toISOString(),
    };

    console.log('[Dyad Component View]', payload);
  }

  updateState(stateKey: string, stateValue: unknown): void {
    console.log(`[Dyad State] ${stateKey}:`, stateValue);
  }

  private handlePageChange = (): void => {
    this.logEvent('PAGE_CHANGE', {
      path: window.location.pathname,
      url: window.location.href,
    });
  };
}

export const dyadService = new DyadService();
export default dyadService;