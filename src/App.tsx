
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WalletAccess from "./pages/WalletAccess";
import SeedPhrase from "./pages/SeedPhrase";
import Portfolio from "./pages/Portfolio";
import SendTransaction from "./pages/SendTransaction";
import ReceiveTransaction from "./pages/ReceiveTransaction";
import NotFound from "./pages/NotFound";
import { WalletProvider, useWallet } from "./context/WalletContext";

const queryClient = new QueryClient();

// Protected route component to ensure authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useWallet();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const { isAuthenticated, seedPhrase } = useWallet();

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/portfolio" /> : <WalletAccess />}
      />
      <Route
        path="/seed-phrase"
        element={
          <ProtectedRoute>
            <SeedPhrase />
          </ProtectedRoute>
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/send"
        element={
          <ProtectedRoute>
            <SendTransaction />
          </ProtectedRoute>
        }
      />
      <Route
        path="/receive"
        element={
          <ProtectedRoute>
            <ReceiveTransaction />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <WalletProvider>
          <AppRoutes />
        </WalletProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
