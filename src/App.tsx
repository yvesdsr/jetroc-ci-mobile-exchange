import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";
import IphonesPage from "./pages/IphonesPage";
import AndroidPage from "./pages/AndroidPage";
import OrdinateursPage from "./pages/OrdinateursPage";
import AutresPage from "./pages/AutresPage";
import ContactPage from "./pages/ContactPage"; // <-- AJOUTE CETTE LIGNE

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

=======
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/iphones" element={<IphonesPage />} />
          <Route path="/android" element={<AndroidPage />} />
          <Route path="/ordinateurs" element={<OrdinateursPage />} />
          <Route path="/autres" element={<AutresPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* <-- AJOUTE CETTE ROUTE */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;