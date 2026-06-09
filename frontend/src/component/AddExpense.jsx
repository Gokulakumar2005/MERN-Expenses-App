import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddExpense, ListExpenses, RemoveExpense, UpdateExpense } from "../slices/expenseSlices";
import Tesseract from "tesseract.js";
import { toast } from 'react-toastify';
import { Trash2, Edit3, Plus, Camera, Loader2, IndianRupee, Calendar, Tag, AlertCircle } from "lucide-react";

const AddExpenseComponent = () => {
    const dispatch = useDispatch();
    const { expenses, isLoading, pagination } = useSelector((state) => state.Expense);

    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        amount: "",
        description: "",
        category: "Other"
    });
    const [file, setFile] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const categories = [
        "Food", "Transport", "Rent", "Shopping", "Entertainment", "Health", "Other"
    ];

    useEffect(() => {
        dispatch(ListExpenses({ page, limit: 15 }));
    }, [dispatch, page]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsScanning(true);

            Tesseract.recognize(selectedFile, 'eng')
                .then(({ data: { text } }) => {
                    const amountMatch = text.match(/(?:Total|Sum|Amount)[:\s]*₹?\$?([\d,]+(\.\d{2})?)/i);
                    const dateMatch = text.match(/(?:Date)[:\s]*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i) || text.match(/(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/);
                    const titleMatch = text.match(/(?:Title|Merchant|Vendor)[:\s]*(.*)/i);
                    const descMatch = text.match(/(?:Description|Note)[:\s]*(.*)/i);

                    if (amountMatch) {
                        setFormData(prev => ({ ...prev, amount: amountMatch[1].replace(/,/g, '') }));
                    }

                    if (dateMatch) {
                        let dateStr = dateMatch[1];
                        try {
                            const parts = dateStr.split(/[\/-]/);
                            if (parts.length === 3) {
                                let y, m, d;
                                if (parts[0].length === 4) {
                                    [y, m, d] = parts;
                                } else {
                                    [d, m, y] = parts; // Default assumption: DD/MM/YYYY
                                    if (y.length === 2) y = "20" + y;

                                    // If Month > 12, it's likely MM/DD/YYYY format
                                    if (parseInt(m) > 12) {
                                        [m, d] = [d, m];
                                    }
                                }
                                setFormData(prev => ({
                                    ...prev,
                                    date: `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`
                                }));
                            }
                        } catch (e) { }
                    }

                    if (titleMatch && titleMatch[1]) {
                        setFormData(prev => ({ ...prev, title: titleMatch[1].trim().substring(0, 50) }));
                    }

                    if (descMatch && descMatch[1]) {
                        setFormData(prev => ({ ...prev, description: descMatch[1].trim() }));
                    }

                    if (!titleMatch && !formData.title) {
                        const lines = text.split('\n').filter(l => l.trim().length > 0);
                        if (lines.length > 0) {
                            setFormData(prev => ({ ...prev, title: lines[0].substring(0, 30) }));
                        }
                    }
                })
                .finally(() => setIsScanning(false));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("date", formData.date);
        data.append("amount", formData.amount);
        data.append("description", formData.description);
        data.append("category", formData.category);
        if (file) {
            data.append("receipt", file);
        }

        setIsSubmitting(true);
        try {
            if (isEditing) {
                await dispatch(UpdateExpense({ id: editId, formData: data })).unwrap();
                setIsEditing(false);
                setEditId(null);
            } else {
                await dispatch(AddExpense(data)).unwrap();
            }
            setFormData({ title: "", date: "", amount: "", description: "", category: "Other" });
            setFile(null);
        } catch (err) {
            toast.error(err || "Unable to save expense. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (expense) => {
        setIsEditing(true);
        setEditId(expense._id);
        setFormData({
            title: expense.title,
            date: expense.date ? expense.date.split('T')[0] : "",
            amount: expense.amount,
            description: expense.description || "",
            category: expense.category || "Other"
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleRemove = (id) => {
        let toastId;

        const confirmContent = ({ closeToast }) => (
            <div className="space-y-3 text-slate-900">
                <p className="text-sm font-medium">Are you sure you want to delete this expense?</p>
                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(RemoveExpense(id))
                                .unwrap()
                                .then(() => {
                                    toast.success("Expense deleted successfully");
                                })
                                .catch((err) => {
                                    toast.error(err || "Unable to delete expense.");
                                })
                                .finally(() => {
                                    toast.dismiss(toastId);
                                });
                        }}
                        className="rounded-full bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-600"
                    >
                        Yes
                    </button>
                    <button
                        type="button"
                        onClick={() => toast.dismiss(toastId)}
                        className="rounded-full bg-slate-200 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-300"
                    >
                        No
                    </button>
                </div>
            </div>
        );

        toastId = toast.info(confirmContent, {
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            position: "top-right",
            toastId: `delete-confirm-${id}`
        });
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditId(null);
        setFormData({ title: "", date: "", amount: "", description: "" });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Header Section */}
                <div className="lg:col-span-12 mb-4">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        Expense Manager
                    </h1>
                    <p className="text-slate-400 mt-2">Track, manage, and optimize your spending effortlessly.</p>
                </div>

                {/* Left Column: Form */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-2xl sticky top-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                {isEditing ? <Edit3 className="text-amber-400 w-5 h-5" /> : <Plus className="text-emerald-400 w-5 h-5" />}
                                {isEditing ? "Edit Expense" : "Add Expense"}
                            </h2>
                            {isEditing && (
                                <button
                                    onClick={cancelEdit}
                                    className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded-full text-slate-400 transition"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Receipt Upload */}
                            <div className="group relative bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-2xl p-4 transition-all hover:border-blue-500/50">
                                <label className="flex flex-col items-center justify-center cursor-pointer">
                                    <div className="bg-blue-500/10 p-3 rounded-full mb-2 group-hover:scale-110 transition">
                                        <Camera className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-300">
                                        {file ? file.name : "Smart Scan Receipt"}
                                    </span>
                                    <input type="file" onChange={handleFileChange} className="hidden" />
                                </label>
                                {isScanning && (
                                    <div className="absolute inset-0 bg-slate-900/90 rounded-2xl flex flex-col items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-blue-400 animate-spin mb-2" />
                                        <p className="text-xs font-bold text-blue-400 animate-pulse">AI SCANNING...</p>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block px-1">Title</label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="What did you buy?"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Date */}
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block px-1">Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                                        />
                                    </div>
                                </div>
                                {/* Amount */}
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block px-1">Amount</label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            required
                                            placeholder="0.00"
                                            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block px-1">Category</label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition appearance-none cursor-pointer"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                        <Plus className="w-4 h-4 rotate-45" />
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block px-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Add notes..."
                                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isScanning}
                                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transform transition active:scale-95 ${isSubmitting || isScanning ? 'opacity-60 cursor-not-allowed' : 'hover:-translate-y-1'} ${isEditing
                                    ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
                                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                                    }`}
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : isEditing ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                {isSubmitting ? "Processing..." : isEditing ? "Update Expense" : "Save Expense"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-8">
                    <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                        <div className="p-6 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Recent Transactions</h2>
                            <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
                                {expenses.length} Total
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-800/20">
                                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase">Expense</th>
                                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase">Date</th>
                                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase text-right">Amount</th>
                                        <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {expenses.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                                <div className="flex flex-col items-center gap-3">
                                                    <AlertCircle className="w-12 h-12 opacity-20" />
                                                    <p>No expenses recorded yet.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        expenses.map((expense) => (
                                            <tr key={expense._id} className="hover:bg-slate-800/30 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-200">{expense.title}</div>
                                                    <div className="text-xs text-slate-500 truncate max-w-[200px]">
                                                        {expense.description || "No description"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-400">
                                                    {new Date(expense.date).toLocaleDateString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="text-emerald-400 font-black">
                                                        ₹{expense.amount.toLocaleString('en-IN')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleEdit(expense)}
                                                            className="p-2 hover:bg-amber-500/10 hover:text-amber-500 text-slate-500 rounded-lg transition"
                                                            title="Edit"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleRemove(expense._id)}
                                                            className="p-2 hover:bg-rose-500/10 hover:text-rose-500 text-slate-500 rounded-lg transition"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {pagination.totalPages >= 1 && (
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/90 border-t border-slate-800 text-slate-300">
                            <button
                                type="button"
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="rounded-full px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="text-sm">
                                Page {page} of {pagination.totalPages}
                            </span>
                            <button
                                type="button"
                                onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
                                disabled={page === pagination.totalPages}
                                className="rounded-full px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddExpenseComponent;
