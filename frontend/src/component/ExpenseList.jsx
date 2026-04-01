// import React, { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ListExpenses } from "../slices/expenseSlices";

// const ExpenseListComponent = () => {
//     const dispatch = useDispatch();
//     const { expenses, isLoading } = useSelector((state) => state.Expense);

//     useEffect(() => {
//         dispatch(ListExpenses());
//     }, [dispatch]);

//     const totalExpenses = useMemo(() => {
//         return expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
//     }, [expenses]);

//     if (isLoading) return <p className="text-center mt-10">Loading expenses...</p>;

//     return (
//         <div className="max-w-4xl mx-auto mt-10 p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-3xl font-bold text-gray-800">My Expenses</h2>
//                 <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold">
//                     Total: ₹{totalExpenses.toFixed(2)}
//                 </div>
//             </div>

//             {expenses.length === 0 ? (
//                 <p className="text-center text-gray-500 italic">No expenses added yet.</p>
//             ) : (
//                 <div className="overflow-x-auto bg-white rounded-lg shadow">
//                     <table className="min-w-full leading-normal">
//                         <thead>
//                             <tr>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
//                                 <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Receipt</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {expenses.map((expense) => (
//                                 <tr key={expense._id}>
//                                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                                         <p className="text-gray-900 whitespace-no-wrap font-medium">{expense.title}</p>
//                                         <p className="text-gray-500 text-xs italic">{expense.description}</p>
//                                     </td>
//                                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                                         <p className="text-gray-900 whitespace-no-wrap">{new Date(expense.date).toLocaleDateString()}</p>
//                                     </td>
//                                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                                         <p className="text-gray-900 whitespace-no-wrap font-bold text-red-600">₹{expense.amount}</p>
//                                     </td>
//                                     <td className="px-5 py-5 border-b border-gray-200 text-sm">
//                                         {expense.receiptUrl ? (
//                                             <a href={expense.receiptUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-800 underline">View</a>
//                                         ) : (
//                                             <span className="text-gray-400">N/A</span>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ExpenseListComponent;

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListExpenses } from "../slices/expenseSlices";
import {
    Receipt,
    ArrowLeft,
    Eye,
    Calendar,
    DollarSign,
    Filter,
    Download,
    Search,
    Wallet
} from "lucide-react";
import { Link } from "react-router-dom";

const ExpenseListComponent = () => {
    const dispatch = useDispatch();
    const { expenses, isLoading } = useSelector((state) => state.Expense);

    useEffect(() => {
        dispatch(ListExpenses());
    }, [dispatch]);

    const totalExpenses = useMemo(() => {
        return expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    }, [expenses]);

    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-xs">
                        Fetching Records...
                    </p>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10 relative overflow-hidden font-['Inter']">

            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] -z-10 translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-6xl mx-auto space-y-8 relative">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="space-y-2">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest transition-colors mb-2"
                        >
                            <ArrowLeft size={14} strokeWidth={3} />
                            Back to Dashboard
                        </Link>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                            Transaction <span className="text-blue-600">History</span>
                        </h2>
                        <p className="text-slate-500 font-medium">A complete overview of your financial activity.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                                <DollarSign size={20} strokeWidth={2.5} />
                            </div>
                            <div className="pr-4">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider leading-none">Total Spent</p>
                                <p className="text-xl font-black text-slate-900 leading-tight">₹{totalExpenses.toLocaleString()}</p>
                            </div>
                        </div>
                        <button className="bg-slate-900 text-white p-3.5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-0.5 group">
                            <Download size={20} strokeWidth={2.5} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">

                    {/* Toolbar */}
                    <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search expenses..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 rounded-1.5xl border border-slate-100 hover:bg-slate-100 transition-all text-sm font-bold">
                                <Filter size={16} strokeWidth={2.5} />
                                Filters
                            </button>
                        </div>
                    </div>

                    {expenses.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                                <Receipt size={40} />
                            </div>
                            <div className="text-center">
                                <p className="text-slate-900 font-black text-xl">No transactions yet</p>
                                <p className="text-slate-400 font-medium">Your financial history starts here.</p>
                            </div>
                            <Link
                                to="/add-expense"
                                className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                            >
                                Add Your First Expense
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50">
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Detail</th>
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest hidden md:table-cell">Category / Date</th>
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                        <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {expenses.map((expense) => (
                                        <tr
                                            key={expense._id}
                                            className="group hover:bg-slate-50/80 transition-all duration-200"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-white">
                                                        <Receipt size={20} strokeWidth={2.5} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                            {expense.title}
                                                        </p>
                                                        <p className="text-xs text-slate-400 font-medium line-clamp-1 max-w-[200px]">
                                                            {expense.description || 'No description provided'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-8 py-6 hidden md:table-cell">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                                                        <Calendar size={14} className="text-slate-300" />
                                                        {new Date(expense.date).toLocaleDateString(undefined, {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                    <span className="inline-flex w-fit px-2 py-0.5 rounded-lg bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-wider group-hover:bg-white transition-colors">
                                                        General
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-8 py-6">
                                                <p className="text-lg font-black text-slate-900">
                                                    ₹{expense.amount.toLocaleString()}
                                                </p>
                                            </td>

                                            <td className="px-8 py-6 text-right">
                                                {expense.receiptUrl ? (
                                                    <a
                                                        href={expense.receiptUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-600 hover:text-white transition-all group/btn shadow-sm"
                                                    >
                                                        <Eye size={14} strokeWidth={3} className="group-hover/btn:scale-110 transition-transform" />
                                                        VIEW
                                                    </a>
                                                ) : (
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest border border-slate-100 px-3 py-1.5 rounded-xl">
                                                        No Receipt
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Insight */}
                <div className="bg-blue-600 rounded-[32px] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700"></div>
                    <div className="relative z-10 flex items-center gap-6">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Wallet className="text-white" size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black tracking-tight">Financial Health Check</h4>
                            <p className="text-blue-100 font-medium">You are doing better than 85% of users this month!</p>
                        </div>
                    </div>
                    <button className="relative z-10 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all shadow-xl hover:-translate-y-0.5">
                        GET FULL REPORT
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ExpenseListComponent;

