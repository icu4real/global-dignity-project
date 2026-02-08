import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import MembersPage from "./pages/MembersPage";
import OurWorkPage from "./pages/OurWorkPage";
import ImpactPage from "./pages/ImpactPage";
import GetHelpPage from "./pages/GetHelpPage";
import DonatePage from "./pages/DonatePage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import TransparencyPage from "./pages/TransparencyPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminDonationsPage from "./pages/admin/AdminDonationsPage";
import AdminDonorsPage from "./pages/admin/AdminDonorsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/our-work" element={<OurWorkPage />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/get-help" element={<GetHelpPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/transparency" element={<TransparencyPage />} />
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/donations" element={<AdminDonationsPage />} />
            <Route path="/admin/donors" element={<AdminDonorsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
