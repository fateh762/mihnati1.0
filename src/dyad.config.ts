export const dyadConfig = {
  appId: 'mihnati-1.0',
  appName: 'Mihnati - Job Marketplace',
  appVersion: '1.0.0',
  description: 'Full-featured job marketplace platform for workers and clients',
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5173',
  
  components: {
    pages: {
      index: 'Landing Page',
      auth: 'Authentication',
      'user-type': 'User Type Selection',
      'worker-register': 'Worker Registration',
      'client-register': 'Client Registration',
      'worker-dashboard': 'Worker Dashboard',
      'client-dashboard': 'Client Dashboard',
      'worker-explore': 'Job Exploration',
      'worker-jobs': 'My Jobs (Worker)',
      'client-jobs': 'My Jobs (Client)',
      'client-post-job': 'Post New Job',
      'worker-earnings': 'Earnings',
      'worker-profile': 'Worker Profile',
      'client-profile': 'Client Profile',
      messages: 'Messages',
      chat: 'Chat Conversation',
    },
    features: {
      payments: 'Payment Processing',
      notifications: 'Notifications',
      search: 'Job Search',
      reviews: 'Reviews & Ratings',
      analytics: 'Analytics',
      disputes: 'Dispute Resolution',
      media: 'Media Management',
      calls: 'Voice/Video Calls',
    },
  },

  rules: {
    allowedActions: [
      'READ_PAGE',
      'CLICK_BUTTON',
      'FILL_FORM',
      'NAVIGATE',
      'SEARCH',
      'FILTER',
      'SORT',
      'VIEW_DETAILS',
    ],
    restrictedAreas: [
      '/admin',
      '/settings/security',
      '/payment/sensitive',
    ],
  },

  features: {
    enableTracking: true,
    enableAnalytics: true,
    enableNotifications: true,
    enableRealTimeChat: true,
  },

  i18n: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'ar'],
  },
};

export default dyadConfig;