import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <span className="font-black text-xl italic">E</span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Expense<span className="text-blue-400">Tracker</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Manage your finances with ease. Track expenses, create budgets, and achieve your financial goals.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 rounded-lg transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 rounded-lg transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 rounded-lg transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-6">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-6">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Mail size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span>crushgokul1455@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Phone size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span>+91 9944351752</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={16} className="mt-0.5 text-blue-400 flex-shrink-0" />
                <span>123 Basavanagudi,<br />Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {currentYear} ExpenseTracker. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
