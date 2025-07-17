import { useState, useContext, useRef, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";
import BookSearch from "./components/BookSearch";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow sticky top-0 z-40 w-screen">
        <nav className="w-full flex items-center justify-between py-5 px-4 relative">
          <Link to="/dashboard" className="text-3xl font-bold text-indigo-800 tracking-tight">
          📚 Personal Library Tracker
          </Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4">
            {user && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-900 font-medium hover:underline hover:font-bold underline-offset-4 decoration-4 transition">Dashboard</Link>
                <Link to="/add-book" className="text-gray-700 hover:text-blue-900 font-medium hover:underline hover:font-bold underline-offset-4 decoration-4 transition">Add Book</Link>
                <Link to="/search" className="text-gray-700 hover:text-blue-900 font-medium hover:underline hover:font-bold underline-offset-4 decoration-4 transition">Search Book</Link>
              </>
            )}
          </div>
          {/* User Info Dropdown */}
          <div className="hidden md:flex items-center gap-3 ml-6 relative" ref={dropdownRef}>
            {user && (
              <>
                <button
                  className="inline-flex items-center gap-2 focus:outline-none bg-gray-100 hover:bg-gray-200 rounded px-2 py-1 transition"
                  onClick={() => setDropdownOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg">
                    {user.name ? user.name[0].toUpperCase() : (user.email ? user.email[0].toUpperCase() : "U")}
                  </span>
                  <span className="text-sm text-gray-700 font-medium truncate max-w-[120px]" title={user.email}>{user.name || user.email}</span>
                  <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="font-semibold text-gray-800">{user.name || user.email}</div>
                      <div className="text-xs text-gray-500 truncate">{user.email}</div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-b"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center px-2 py-1 border rounded text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute right-4 top-14 bg-white shadow-lg rounded-lg flex flex-col w-40 md:hidden animate-fade-in z-30">
              {user && (
                <>
                  <Link to="/dashboard" className="px-4 py-2 hover:bg-indigo-50 border-b border-gray-100 hover:text-blue-900 hover:underline hover:font-bold underline-offset-4 decoration-4 transition" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <Link to="/add-book" className="px-4 py-2 hover:bg-indigo-50 border-b border-gray-100 hover:text-blue-900 hover:underline hover:font-bold underline-offset-4 decoration-4 transition" onClick={() => setMenuOpen(false)}>Add Book</Link>
                  <Link to="/search" className="px-4 py-2 hover:bg-indigo-50 border-b border-gray-100 hover:text-blue-900 hover:underline hover:font-bold underline-offset-4 decoration-4 transition" onClick={() => setMenuOpen(false)}>Search Book</Link>
                  <button onClick={logout} className="px-4 py-2 text-left text-red-500 hover:bg-red-50">Logout</button>
                </>
              )}
            </div>
          )}
        </nav>
      </header>
      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-2 sm:px-4 py-6">
        <div className="w-full max-w-7xl">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<BookSearch />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-book"
              element={
                <ProtectedRoute>
                  <AddBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-book/:id"
              element={
                <ProtectedRoute>
                  <EditBook />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
