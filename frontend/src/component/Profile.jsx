import { useSelector } from "react-redux";
import { Mail, User, Phone, MapPin, Calendar, Shield, LogOut } from "lucide-react";

export default function Profile() {
  const { user } = useSelector((state) => state.Auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-slate-900 mb-2">My Profile</h1>
          <p className="text-slate-500 text-lg">Manage your account and personal information</p>
        </div>

        {user ? (
          <div className="space-y-8">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-10 rounded-[40px] shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center text-5xl border-2 border-white/30 shadow-lg">
                  <User size={48} />
                </div>
                <div>
                  <h2 className="text-4xl font-black">{user.userName || "User"}</h2>
                  <p className="text-blue-100 text-lg mt-1">Welcome back!</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/20">
                <p className="text-blue-100 text-sm">Account Status</p>
                <p className="text-white font-bold text-lg mt-1">✓ Active and Verified</p>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Email */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Mail size={20} />
                    </div>
                    <label className="text-slate-500 font-bold uppercase text-xs tracking-widest">Email Address</label>
                  </div>
                  <p className="text-slate-900 font-semibold text-lg ml-12">{user.email}</p>
                </div>

                {/* User Name */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all">
                      <User size={20} />
                    </div>
                    <label className="text-slate-500 font-bold uppercase text-xs tracking-widest">Full Name</label>
                  </div>
                  <p className="text-slate-900 font-semibold text-lg ml-12">{user.userName}</p>
                </div>

                {/* Account Created */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                      <Calendar size={20} />
                    </div>
                    <label className="text-slate-500 font-bold uppercase text-xs tracking-widest">Account Status</label>
                  </div>
                  <p className="text-slate-900 font-semibold text-lg ml-12">Active</p>
                </div>

                {/* Security */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                      <Shield size={20} />
                    </div>
                    <label className="text-slate-500 font-bold uppercase text-xs tracking-widest">Security</label>
                  </div>
                  <p className="text-slate-900 font-semibold text-lg ml-12">✓ Verified</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Account Age</h3>
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                    <Calendar size={18} />
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-900">Recent</p>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">Email Verification</h3>
                  <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                    ✓
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-900">Verified</p>
              </div>

              <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-slate-500 font-bold uppercase text-xs tracking-widest">2FA Status</h3>
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl">
                    <Shield size={18} />
                  </div>
                </div>
                <p className="text-3xl font-black text-slate-900">Enabled</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <LogOut size={20} /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-16 rounded-[40px] border border-slate-100 shadow-sm text-center">
            <p className="text-slate-500 font-medium text-lg">No account information available. Please log in.</p>
          </div>
        )}
      </div>
    </div>
  );
}
