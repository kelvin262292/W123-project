import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton } from "../SignOutButton";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "../SignInForm";

interface HeaderProps {
  user: any;
  isAdmin: boolean;
  currentPage: string;
  onNavigate: (page: any, slug?: string) => void;
}

export function Header({ user, isAdmin, currentPage, onNavigate }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const cartItems = useQuery(api.cart.list) || [];
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate("category", `search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleAccountClick = () => {
    if (user) {
      onNavigate("account");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <button onClick={() => onNavigate("home")} className="flex items-center space-x-2" data-testid="logo-button">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">Y</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">Yapee</span>
            </button>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8" data-testid="search-form">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-l-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  data-testid="search-input"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-r-full hover:bg-blue-700 transition-colors font-semibold"
                data-testid="search-button"
              >
                Tìm
              </button>
            </form>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Poster Link */}
              <button
                onClick={() => onNavigate("poster")}
                className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                data-testid="poster-button"
              >
                <span className="text-2xl">🌟</span>
                <span>Poster</span>
              </button>

              {/* Cart */}
              <button
                onClick={() => onNavigate("cart")}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
                data-testid="cart-button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold" data-testid="cart-count">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <button
                onClick={handleAccountClick}
                className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                data-testid="login-button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>{user ? "Tài khoản" : "Đăng nhập"}</span>
              </button>

              {/* Admin */}
              {isAdmin && (
                <button
                  onClick={() => onNavigate("admin")}
                  className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors group"
                  data-testid="admin-button"
                >
                  <div className="relative">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <span>Admin</span>
                </button>
              )}

              {/* Sign Out - Only show when authenticated */}
              <Authenticated>
                <SignOutButton data-testid="logout-button" />
              </Authenticated>

              {/* Mobile menu button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                data-testid="mobile-menu-button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex" data-testid="mobile-search-form">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  data-testid="mobile-search-input"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                data-testid="mobile-search-button"
              >
                Tìm
              </button>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" data-testid="mobile-menu">
            <div className="bg-white h-full w-64 p-4 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="text-gray-500 hover:text-gray-700"
                  data-testid="close-mobile-menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => {
                    onNavigate("account");
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                  data-testid="mobile-account-button"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{user ? "Tài khoản" : "Đăng nhập"}</span>
                </button>
                
                <button
                  onClick={() => {
                    onNavigate("poster");
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                  data-testid="mobile-poster-button"
                >
                  <span className="text-xl">🌟</span>
                  <span>Poster</span>
                </button>
                
                {isAdmin && (
                  <button
                    onClick={() => {
                      onNavigate("admin");
                      setShowMobileMenu(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg"
                    data-testid="mobile-admin-button"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Admin</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-testid="auth-modal">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Đăng nhập</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-500 hover:text-gray-700"
                data-testid="close-auth-modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <SignInForm onSuccess={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
