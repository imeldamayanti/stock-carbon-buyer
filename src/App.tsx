import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import RegisterCompany from "./pages/RegisterCompany";
import Login from "./pages/Login";
import CompanyNeeds from "./pages/CompanyNeeds";
import DashboardCompany from "./pages/DashboardCompany";
import PurchaseHistory from "./pages/PurchaseHistory";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" >
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <div className="min-h-screen flex flex-col">
//             {/* Content area */}
//             <div className="flex flex-1">
//               <SidebarProvider>
//                 <AppSidebar />
                
//                 <main className="flex-1">
//                   <Routes>
//                     <Route path="/" element={<Index />} />
//                     <Route path="/admin" element={<Admin />} />
//                     <Route path="/register-company" element={<RegisterCompany />} />
//                     <Route path="/company-needs" element={<CompanyNeeds />} />
//                     <Route path="/dashboard-company" element={<DashboardCompany />} />
//                     <Route path="/purchase-history" element={<PurchaseHistory />} />
//                     <Route path="/profile" element={<Profile />} />
//                     <Route path="/help" element={<Help />} />
//                     {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//                     <Route path="*" element={<NotFound />} />
//                   </Routes>
//                 </main>
//               </SidebarProvider>
//             </div>
            
//             {/* Global Footer */}
//             {/* <Footer /> */}
//           </div>
//         </BrowserRouter>
//       </TooltipProvider>
//     </ThemeProvider>
//   </QueryClientProvider>
// );

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppLayout /> {/* ini komponen baru di bawah */}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppLayout = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/register-company","/login-company"];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <SidebarProvider>
          {!shouldHideSidebar && <AppSidebar />}

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/register-company" element={<RegisterCompany />} />
              <Route path="/login-company" element={<Login />} />
              <Route path="/company-needs" element={<CompanyNeeds />} />
              <Route path="/dashboard-company" element={<DashboardCompany />} />
              <Route path="/purchase-history" element={<PurchaseHistory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </SidebarProvider>
      </div>
    </div>
  );
};

export default App;
