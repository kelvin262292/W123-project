import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { CategoryPage } from "./pages/CategoryPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { AccountPage } from "./pages/AccountPage";
import { PosterPage } from "./pages/PosterPage";
import { AboutPage } from "./pages/AboutPage";
import { FAQPage } from "./pages/FAQPage";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminProtectedRoute } from "./components/AdminProtectedRoute";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Toaster } from "sonner";

type Page = 
  | "home" 
  | "product" 
  | "category" 
  | "cart" 
  | "checkout" 
  | "account" 
  | "poster"
  | "about"
  | "faq"
  | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("");

  const user = useQuery(api.auth.loggedInUser);
  const isAdmin = useQuery(api.admin.isAdmin) || false;

  // Listen for navigation events from Footer
  useEffect(() => {
    const handleFooterNavigation = (event: CustomEvent) => {
      const page = event.detail as Page;
      if (page) {
        navigateTo(page);
      }
    };

    window.addEventListener('navigate', handleFooterNavigation as EventListener);
    
    return () => {
      window.removeEventListener('navigate', handleFooterNavigation as EventListener);
    };
  }, []);

  const navigateTo = (page: Page, slug?: string) => {
    setCurrentPage(page);
    if (page === "product" && slug) {
      setSelectedProductSlug(slug);
    }
    if (page === "category" && slug) {
      setSelectedCategorySlug(slug);
    }
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigateTo} />;
      case "product":
        return <ProductPage slug={selectedProductSlug} onNavigate={navigateTo} />;
      case "category":
        return <CategoryPage slug={selectedCategorySlug} onNavigate={navigateTo} />;
      case "cart":
        return <CartPage onNavigate={navigateTo} />;
      case "checkout":
        return <CheckoutPage onNavigate={navigateTo} />;
      case "account":
        return <AccountPage onNavigate={navigateTo} />;
      case "poster":
        return <PosterPage onNavigate={navigateTo} />;
      case "about":
        return <AboutPage />;
      case "faq":
        return <FAQPage />;
      case "admin":
        return (
          <AdminProtectedRoute>
            <AdminLayout onNavigate={navigateTo} />
          </AdminProtectedRoute>
        );
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" richColors />
        
        <div className="flex flex-col min-h-screen">
          <Header 
            user={user} 
            isAdmin={isAdmin}
            currentPage={currentPage}
            onNavigate={navigateTo}
          />
          
          <main className="flex-1">
            {renderPage()}
          </main>
          
          {currentPage !== "admin" && <Footer />}
        </div>
      </div>
    </ErrorBoundary>
  );
}
