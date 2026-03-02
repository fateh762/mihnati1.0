import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

export default function NetworkStatus() {
  const { isOnline } = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-red-500/90 backdrop-blur-sm py-2 text-white text-sm font-medium"
        >
          <WifiOff className="w-4 h-4" />
          <span>No internet connection</span>
        </motion.div>
      )}
      {isOnline && (
        <motion.div
          key="back-online"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-teal-500/90 backdrop-blur-sm py-2 text-white text-sm font-medium"
        >
          <Wifi className="w-4 h-4" />
          <span>Back online</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
