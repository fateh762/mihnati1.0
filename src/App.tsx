import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "./store/useStore";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import UserTypeSelection from "./pages/UserTypeSelection";
import WorkerRegistration from "./pages/worker/Registration";
import ClientRegistration from "./pages/client/Registration";
import WorkerDashboard from "./pages/worker/Dashboard";
import ClientDashboard from "./pages/client/Dashboard";
import PostJob from "./pages/client/PostJob";
import Explore from "./pages/worker/Explore";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { language } = useStore();

  useEffect(() => {
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/user-type" element={<UserTypeSelection />} />
            
            {/* Worker Routes */}
            <Route path="/worker/register" element={<WorkerRegistration />} />
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/worker/explore" element={<Explore />} />
            
            {/* Client Routes */}
            <Route path="/client/register" element={<ClientRegistration />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/post-job" element={<PostJob />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;