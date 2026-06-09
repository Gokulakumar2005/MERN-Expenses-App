

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetStats, ListExpenses } from '../slices/expenseSlices';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import {
    TrendingUp,
    DollarSign,
    Calendar,
    ChevronRight,
    Plus,
    Receipt,
    Wallet,
    ArrowUpRight,
    Search,
    Tag,
    IndianRupee
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { stats, expenses, isLoading, pagination } = useSelector((state) => state.Expense);
    const { user } = useSelector((state) => state.Auth);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(GetStats());
        dispatch(ListExpenses({ page, limit: 15, search: searchTerm }));
    }, [dispatch, page, searchTerm]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setPage(newPage);
        }
    };

    const handleSearch = () => {
        setPage(1);
        setSearchTerm(searchQuery);
    };

    const formattedMonthlyValue = (stats.totalAmount * 0.4).toLocaleString('en-IN', {
        maximumFractionDigits: 0,
        style: 'currency',
        currency: 'INR'
    });

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 md:p-8 relative overflow-hidden font-['Inter']">

            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100/50 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto space-y-10 relative">

                {/* Top Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-700"></span>
                            </span>
                            Live Dashboard
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                            Hi, <span className="text-blue-600">{user?.userName || 'User'}</span>
                        </h1>
                        <p className="text-slate-500 font-medium text-lg">
                            Track, analyze, and master your personal finance.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <Link
                            to="/add-expense"
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-2xl font-bold transition-all shadow-xl hover:-translate-y-0.5"
                        >
                            <Plus size={20} strokeWidth={3} />
                            Add Expense
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Stats Card */}
                    <div className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-100">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <Wallet size={24} strokeWidth={2.5} />
                            </div>
                            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold">
                                <TrendingUp size={14} /> +12%
                            </div>
                        </div>
                        <h3 className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-1">Total Spending</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black text-slate-900">₹{stats.totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="mt-6 w-full bg-slate-50 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-blue-600 h-full w-[65%] rounded-full opacity-60"></div>
                        </div>
                    </div>

                    {/* Transaction Card */}
                    <div className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-sky-100">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-sky-50 text-sky-600 rounded-2xl group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                                <Receipt size={24} strokeWidth={2.5} />
                            </div>
                        </div>
                        <h3 className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-1">Total Activity</h3>
                        <div className="text-3xl font-black text-slate-900">{stats.totalCount} <span className="text-slate-400 text-lg font-bold italic">trans.</span></div>
                        <p className="mt-4 text-slate-400 text-sm font-medium">Recorded in the last 30 days</p>
                    </div>

                    {/* Monthly Forecast/Budget Card */}
                    <div className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-indigo-100">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <Calendar size={24} strokeWidth={2.5} />
                            </div>
                        </div>
                        <h3 className="text-slate-500 font-bold text-sm uppercase tracking-widest mb-1">Current Month</h3>
                        <div className="text-3xl font-black text-slate-900">₹{(stats.totalAmount * 0.4).toFixed(0).toLocaleString()}</div>
                        <p className="mt-4 text-emerald-600 text-sm font-bold">Under target budget</p>
                    </div>
                </div>

                {/* Detailed Analysis Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">

                    {/* Insights Chart */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm min-w-0">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Spending Overview</h3>
                                <p className="text-slate-400 text-sm font-medium">Daily analysis of your latest expenses</p>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
                                <button className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white rounded-lg shadow-sm">7D</button>
                                <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">1M</button>
                                <button className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">3M</button>
                            </div>
                        </div>

                        <div className="h-[380px] w-full min-w-0">
                            {stats.chartData && stats.chartData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                            dy={15}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                                        />
                                        <Tooltip
                                            cursor={{ stroke: '#2563eb', strokeWidth: 2, strokeDasharray: '5 5' }}
                                            contentStyle={{
                                                backgroundColor: "#ffffff",
                                                borderRadius: "20px",
                                                border: "none",
                                                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                                                padding: "16px"
                                            }}
                                            itemStyle={{ color: "#0f172a", fontWeight: "bold", fontSize: "14px" }}
                                            labelStyle={{ color: "#64748b", marginBottom: "8px", fontWeight: "bold" }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#2563eb"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorValue)"
                                            activeDot={{ r: 8, fill: '#2563eb', stroke: '#fff', strokeWidth: 3 }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-300 text-center px-10">
                                    <div className="p-6 bg-slate-50 rounded-full mb-4">
                                        <Search size={48} className="opacity-30" />
                                    </div>
                                    <p className="font-bold text-slate-400">Not enough data to graph yet</p>
                                    <p className="text-sm mt-1">Start adding expenses to see your trends</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pie Chart / Transaction Distribution */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex flex-col min-w-0">
                        <div className="mb-6">
                            <h3 className="text-xl font-black text-slate-900">Expense Distribution</h3>
                            <p className="text-slate-400 text-sm font-medium">Individual record breakdown</p>
                        </div>

                        <div className="h-[300px] w-full relative">
                            {stats.transactionData && stats.transactionData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={stats.transactionData}
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {stats.transactionData.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={[
                                                        '#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316', '#64748b'
                                                    ][index % 9]}
                                                    stroke="none"
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border border-slate-100 flex flex-col gap-1">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                                                                Transaction
                                                            </p>
                                                            <p className="text-sm font-black text-slate-900 leading-tight">
                                                                {payload[0].name}
                                                            </p>
                                                            <p className="text-lg font-black text-blue-600 mt-1">
                                                                ₹{payload[0].value.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-300 text-center">
                                    <Receipt size={40} className="opacity-20 mb-2" />
                                    <p className="text-xs font-bold">No transaction data</p>
                                </div>
                            )}

                            {stats.transactionData && stats.transactionData.length > 0 && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Items</p>
                                    <p className="text-lg font-black text-slate-900 leading-tight">{stats.transactionData.length}</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 pt-6 border-t border-slate-50">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 font-bold">Largest Expense</span>
                                <span className="text-blue-600 font-black">
                                    {stats.transactionData && stats.transactionData.length > 0
                                        ? stats.transactionData[0].name
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Second Row: Recent Activity + Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">

                    {/* Recent Activity */}
                    <div className="lg:col-span-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-slate-900 font-['Inter']">Recent Transactions</h3>
                            <Link to="/my-expenses" className="text-blue-600 text-sm font-bold hover:underline underline-offset-4 decoration-2">View History</Link>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="relative w-full md:w-2/3">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleSearch();
                                            }
                                        }}
                                        type="text"
                                        placeholder="Search recent transactions..."
                                        className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSearch}
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition"
                                >
                                    Search
                                </button>
                            </div>
                            {expenses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {expenses.map((expense) => (
                                        <div
                                            key={expense._id}
                                            className="group flex justify-between items-center p-4 rounded-3xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                                                    <span className="font-black text-sm uppercase">{expense.title.charAt(0)}</span>
                                                </div>
                                                <div className="max-w-[150px] sm:max-w-none">
                                                    <p className="font-bold text-slate-900 truncate">
                                                        {expense.title}
                                                    </p>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                                            {new Date(expense.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                        </p>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                        <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{expense.category || 'Other'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                                                -₹{expense.amount.toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center">
                                    <p className="text-slate-400 text-sm font-bold italic">No transactions found</p>
                                </div>
                            )}

                            {pagination.totalPages >= 1 && (
                                <div className="flex items-center justify-between mt-6 px-4 py-4 bg-slate-50 rounded-3xl border border-slate-100">
                                    <button
                                        type="button"
                                        onClick={() => handlePageChange(page - 1)}
                                        disabled={page === 1}
                                        className="rounded-full px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-sm text-slate-500">Page {page} of {pagination.totalPages}</span>
                                    <button
                                        type="button"
                                        onClick={() => handlePageChange(page + 1)}
                                        disabled={page === pagination.totalPages}
                                        className="rounded-full px-4 py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Insights */}
                    {/* <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-slate-900 rounded-[32px] p-8 text-white overflow-hidden relative group h-full flex flex-col justify-end">
                            <div className="absolute top-0 right-0 p-8 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500 opacity-20">
                                <TrendingUp size={160} />
                            </div>
                            <div className="relative z-10">
                                <div className="p-3 bg-white/10 rounded-2xl w-fit mb-6 backdrop-blur-xl border border-white/10">
                                    < IndianRupee size={24} className="text-blue-400" />
                                </div>
                                <h4 className="text-2xl font-black mb-2 leading-tight">Financial Health</h4>
                                <p className="text-slate-400 text-sm font-medium mb-6">You've managed your {stats.categoryData?.sort((a, b) => b.value - a.value)[0]?.name || 'expenses'} spend significantly better than average.</p>
                                <button className="flex items-center gap-2 text-sm font-bold bg-white text-slate-900 px-6 py-3 rounded-2xl hover:bg-blue-50 transition-all shadow-xl">
                                    View Detailed Report <ArrowUpRight size={18} strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    </div> */}

                </div>

            </div>
        </div>
    );
};

export default Dashboard;

