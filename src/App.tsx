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
import JobDetails from "./pages/worker/JobDetails";
import WorkerJobs from "./pages/worker/MyJobs";
import ClientJobs from "./pages/client/MyJobs";
import WorkerProfile from "./pages/worker/Profile";
import ClientProfile from "./pages/client/Profile";
import WorkerEarnings from "./pages/worker/Earnings";
import JobBids from "./pages/client/JobBids";
import Tracking from "./pages/client/Tracking";
import Navigation from "./pages/worker/Navigation";
import Messages from "./pages/Messages";
import Chat from "./pages/Chat";
import Review from "./pages/client/Review";
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
            
            {/* Shared Routes */}
            <Route path="/messages" element={<Messages />} />
            <Route path="/chat/:id" element={<Chat />} />
            
            {/* Worker Routes */}
            <Route path="/worker/register" element={<WorkerRegistration />} />
            <Route path="/worker/dashboard" element={<WorkerDashboard />} />
            <Route path="/worker/explore" element={<Explore />} />
            <Route path="/worker/job/:id" element={<JobDetails />} />
            <Route path="/worker/jobs" element={<WorkerJobs />} />
            <Route path="/worker/job/:id/navigation" element={<Navigation />} />
            <Route path="/worker/earnings" element={<WorkerEarnings />} />
            <Route path="/worker/profile" element={<WorkerProfile />} />
            
            {/* Client Routes */}
            <Route path="/client/register" element={<ClientRegistration />} />
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/post-job" element={<PostJob />} />
            <Route path="/client/jobs" element={<ClientJobs />} />
            <Route path="/client/job/:id/bids" element={<JobBids />} />
            <Route path="/client/job/:id/tracking" element={<Tracking />} />
            <Route path="/client/job/:id/review" element={<Review />} />
            <Route path="/client/profile" element={<ClientProfile />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;