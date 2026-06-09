import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListExpenses } from '../slices/expenseSlices';
import { Upload, FileText, Download, Trash2, Eye, Search, Filter, FileJson, Archive, Printer } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Receipts() {
  const dispatch = useDispatch();
  const { expenses, isLoading, pagination } = useSelector((state) => state.Expense);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(ListExpenses({ page, limit: 20 }));
  }, [dispatch, page]);

  useEffect(() => {
    // Filter expenses that have receipts
    const filtered = expenses.filter(exp =>
      exp.receiptUrl && (
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredExpenses(filtered);
  }, [expenses, searchQuery]);

  const handleDownloadReceipt = (receiptUrl, fileName) => {
    if (!receiptUrl) {
      toast.error('Receipt URL not found');
      return;
    }
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = receiptUrl;
    link.download = fileName || 'receipt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Receipt downloaded!');
  };

  const handlePrintReceipt = (receiptUrl) => {
    if (!receiptUrl) {
      toast.error('Receipt URL not found');
      return;
    }
    const printWindow = window.open(receiptUrl, '_blank');
    printWindow?.print();
  };

  const handleExportAsJSON = () => {
    if (filteredExpenses.length === 0) {
      toast.error('No receipts to export');
      return;
    }
    const dataStr = JSON.stringify(filteredExpenses, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `receipts-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Receipts exported as JSON!');
  };

  const handleExportAsCSV = () => {
    if (filteredExpenses.length === 0) {
      toast.error('No receipts to export');
      return;
    }
    
    const headers = ['Title', 'Amount', 'Date', 'Category', 'Description', 'Receipt URL'];
    const csvContent = [
      headers.join(','),
      ...filteredExpenses.map(exp =>
        `"${exp.title}","${exp.amount}","${new Date(exp.date).toLocaleDateString()}","${exp.category}","${exp.description || ''}","${exp.receiptUrl || ''}"`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `receipts-${new Date().getTime()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Receipts exported as CSV!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
              <FileText size={14} /> Receipt Management
            </div>
            <h1 className="text-5xl font-black text-slate-900">My Receipts</h1>
            <p className="text-slate-500 text-lg">View and manage your uploaded expense receipts ({filteredExpenses.length} total)</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search receipts by title, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <button
                onClick={handleExportAsJSON}
                className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-2xl border border-blue-200 hover:bg-blue-100 transition-all font-semibold text-sm"
              >
                <FileJson size={16} /> JSON
              </button>
              <button
                onClick={handleExportAsCSV}
                className="flex items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-2xl border border-green-200 hover:bg-green-100 transition-all font-semibold text-sm"
              >
                <Archive size={16} /> CSV
              </button>
            </div>
          </div>
        </div>

        {/* Receipts List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="bg-white p-16 rounded-[32px] border border-slate-100 shadow-sm text-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
              <FileText size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium text-lg">No receipts found</p>
            <p className="text-slate-400 text-sm">Upload expense receipts with photos or documents to see them here</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExpenses.map((expense) => (
              <div
                key={expense._id}
                className="bg-white p-6 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-lg transition-all group"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                    <FileText size={20} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handlePrintReceipt(expense.receiptUrl)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-blue-600"
                      title="Print Receipt"
                    >
                      <Printer size={16} />
                    </button>
                    <button
                      onClick={() => handleDownloadReceipt(expense.receiptUrl, `${expense.title}-receipt`)}
                      className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400 hover:text-green-600"
                      title="Download Receipt"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>

                {/* Expense Details */}
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Expense Title</p>
                    <p className="text-slate-900 font-bold text-lg mt-1 line-clamp-2">{expense.title}</p>
                  </div>

                  {expense.description && (
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Description</p>
                      <p className="text-slate-600 text-sm mt-1 line-clamp-1">{expense.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Date</p>
                      <p className="text-slate-900 font-semibold mt-1">
                        {new Date(expense.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Category</p>
                      <p className="text-slate-900 font-semibold mt-1">{expense.category}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <p className="text-slate-500 text-xs uppercase tracking-widest font-bold mb-2">Amount</p>
                    <p className="text-3xl font-black text-slate-900">
                      ₹{expense.amount.toLocaleString()}
                    </p>
                  </div>

                  {expense.receiptUrl && (
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                        ✓ Receipt Attached
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDownloadReceipt(expense.receiptUrl, `${expense.title}-receipt`)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <Download size={14} /> Download
                        </button>
                        <button
                          onClick={() => handlePrintReceipt(expense.receiptUrl)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <Printer size={14} /> Print
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {filteredExpenses.length > 0 && (
          <div className="mt-10 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Receipt Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Receipts</p>
                <p className="text-4xl font-black text-slate-900 mt-2">{filteredExpenses.length}</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Amount</p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  ₹{filteredExpenses.reduce((sum, r) => sum + r.amount, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Average Amount</p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  ₹{Math.round(filteredExpenses.reduce((sum, r) => sum + r.amount, 0) / filteredExpenses.length).toLocaleString()}
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100">
                <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Top Category</p>
                <p className="text-2xl font-black text-slate-900 mt-2">
                  {filteredExpenses.reduce((acc, r) => {
                    acc[r.category] = (acc[r.category] || 0) + 1;
                    return acc;
                  }, {})[Object.keys(filteredExpenses.reduce((acc, r) => {
                    acc[r.category] = (acc[r.category] || 0) + 1;
                    return acc;
                  }, {}))[0]] ? Object.keys(filteredExpenses.reduce((acc, r) => {
                    acc[r.category] = (acc[r.category] || 0) + 1;
                    return acc;
                  }, {}))[0] : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {expenses.length > 0 && (
          <div className="mt-10 flex justify-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl font-bold">
              Page {page}
            </div>
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
