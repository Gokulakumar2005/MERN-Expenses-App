import { Link, Navigate, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Register from "./component/register";
import Login from "./component/Login";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Services from "./component/Services";
import AddExpenseComponent from "./component/AddExpense";
import ExpenseListComponent from "./component/ExpenseList";
import Dashboard from "./component/Dashboard";
import { UserAccount } from "./slices/authSlices";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "./slices/authSlices";
import { useEffect, useState } from "react";
import Profile from "./component/Profile";
import Reports from "./component/Reports";
import Budget from "./component/Budget";
import Receipts from "./component/Receipts";
import Help from "./component/Help";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./component/Footer";


function App() {
  const { isLoggedIn } = useSelector((state) => state.Auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(UserAccount());
    }
  }, [dispatch]);

  useEffect(() => {
    // close mobile menu when route changes
    setMobileOpen(false);
  }, [location.pathname]);

  const onLogout = () => {
    dispatch(handleLogout());
    navigate("/login");
  };

  if (localStorage.getItem("token") && isLoggedIn === false) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Inter']">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
              <span className="font-black text-xl italic">E</span>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
              Expense<span className="text-blue-600">Tracker</span>
            </span>
          </Link>

          <nav className="relative">
            <button
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-controls="primary-navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
            >
              <span className="sr-only">Toggle navigation</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            <ul id="primary-navigation" className={`${mobileOpen ? 'block' : 'hidden'} sm:flex items-center gap-1 sm:gap-4 font-bold text-sm`}> 
          {isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/add-expense"
                      className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      Add
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-expenses"
                      className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                      History
                    </Link>
                  </li>
                  <li>
                    <Link to="/reports" className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">Reports</Link>
                  </li>
                  <li>
                    <Link to="/budget" className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">Budget</Link>
                  </li>
                  <li>
                    <Link to="/receipts" className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">Receipts</Link>
                  </li>
                  <li>
                    <Link to="/profile" className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">Profile</Link>
                  </li>
                  <li className="ml-2">
                    <button
                      onClick={onLogout}
                      className="bg-slate-900 text-white px-5 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-md active:scale-95"
                    >
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                 <li>
                <Link
                  to="/"
                  className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="px-4 py-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                >
                  Contact
                </Link>
              </li>
                  <li><Link to="/login" className="px-4 py-2 text-slate-500 hover:text-blue-600 transition-colors">Login</Link></li>
                  <li><Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/add-expense" element={isLoggedIn ? <AddExpenseComponent /> : <Navigate to="/login" />} />
          <Route path="/my-expenses" element={isLoggedIn ? <ExpenseListComponent /> : <Navigate to="/login" />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
              <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/login" />} />
              <Route path="/budget" element={isLoggedIn ? <Budget /> : <Navigate to="/login" />} />
              <Route path="/receipts" element={isLoggedIn ? <Receipts /> : <Navigate to="/login" />} />
              <Route path="/help" element={<Help />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover draggable pauseOnFocusLoss />
    </div>
  )
}

export default App
