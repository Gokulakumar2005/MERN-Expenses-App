import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./component/register";
import Login from "./component/Login";
import AddExpenseComponent from "./component/AddExpense";
import ExpenseListComponent from "./component/ExpenseList";
import Dashboard from "./component/Dashboard";
import { UserAccount } from "./slices/authSlices";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "./slices/authSlices";
import { useEffect } from "react";


function App() {
  const { isLoggedIn } = useSelector((state) => state.Auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(UserAccount());
    }
  }, [dispatch]);

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

          <nav>
            <ul className="flex items-center gap-1 sm:gap-4 font-bold text-sm">
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
          <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/add-expense" element={isLoggedIn ? <AddExpenseComponent /> : <Navigate to="/login" />} />
          <Route path="/my-expenses" element={isLoggedIn ? <ExpenseListComponent /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
